const multer = require('multer');
const multerS3 = require('multer-s3');
// var fs = require('fs');
const cors = require('cors');
const AWS = require('aws-sdk')
require("aws-sdk/lib/maintenance_mode_message").suppress = true;

const bucketName = 'mmp-upload';
const REGION = "ap-south-1";
const newFileKey = 'file.jpg'
const filePath = './uploads/test.jpg'

// Configure AWS S3
const s3 = new AWS.S3({
    accessKeyId: "AKIAXTORPZNUUHTHTDUK",
    secretAccessKey: "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",
    region: REGION,
  });
  
  // Multer configuration for S3
  const upload = multer({
      storage: multerS3({
          s3: s3,
          bucket: bucketName,
          key: function (req, file, cb) {
              cb(null, Date.now().toString() + '-' + file.originalname);
          }
      })
  });

exports.createBuyProperty = async (req, res) => {
        try {
            upload.array('images')(req, res, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send({ 
                        err:false,
                        msg:'Error uploading files'
                    });
                } else {
                    const uploadedFiles = req.files.map(file => {
                        const params = {
                            Bucket: bucketName,
                            Key: file.key
                        };
                        return s3.getSignedUrlPromise('getObject', params).then(url => {
                            return {
                                originalname: file.originalname,
                                key: file.key,
                                url: url
                            };
                        });
                    });
            
                    Promise.all(uploadedFiles)
                        .then(urls => {
                            const files = urls.map(obj => ( obj.url));

                            return res.send({
                                err:false,
                                msg: 'Files uploaded successfully!',
                                files
                            });
                        })
                        .catch(err => {
                            console.error(err);
                            return res.status(500).send({
                                err:true,
                                msg:'Error processing uploaded files'
                            });
                        });
                }
            });   
        } catch (error) {
            return res.status(500).send({
                err:true,
                msg:'Error processing uploaded files'
            });
        }

};  