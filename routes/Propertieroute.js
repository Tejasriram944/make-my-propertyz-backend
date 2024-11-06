// const express = require('express');
// const multer = require('multer');
// const router = express.Router();
// const propertyController = require('../Controller/Propertiecontroller');

// // Multer configuration for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({ storage: storage });

// // CRUD Routes
// router.post('/', upload.single('image'), propertyController.createProperty);
// router.get('/', propertyController.getAllProperties);
// router.get('/:id', propertyController.getPropertyById);
// router.put('/:id', upload.single('image'), propertyController.updateProperty);
// router.delete('/:id', propertyController.deleteProperty);

// module.exports = router;


const express = require('express');
const router = express.Router();

const {
    createProperty,
    getAllProperties,
    // isRejectedProperty,
    // isVerifyProperty
} = require('../Controller/Propertiecontroller');

const {
    createBuyProperty,
} = require('../Controller/BuyProperty');

const {
    createInspectionProperty,
} = require('../Controller/InspectionProperty');

const {
    createPropertyDetails,
    getPropertyById,
    getDraftPropertyDetails,
    getPropertyDetails,
    isRejectedProperty,
    isVerifyProperty
} = require('../Controller/PropertyDetails');


router.post('/properties/addpost', createProperty);
router.post('/properties/inspectionproperty', createInspectionProperty);
router.post('/properties/buyproperty', createBuyProperty);
router.post('/properties/post/property', createPropertyDetails);
router.post('/properties/draft-prop', getDraftPropertyDetails);
router.post('/properties/postbyid', getPropertyById);
router.get('/properties/role-list', getPropertyDetails);
router.get('/properties/list', getAllProperties);
router.get('/properties/list-buyproperty', getAllProperties);
router.get('/properties/list-inspectionproperty', getAllProperties);
router.post('/properties/isrejected', isRejectedProperty);
router.post('/properties/isverify', isVerifyProperty);


module.exports = router;