const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_SER,
    pass: process.env.PASS_SER,
  },
});

function generateOTP(length) {
  const characters = "0123456789";
  let otp = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    otp += characters.charAt(randomIndex);
  }

  return otp;
}

exports.sendMailCustom = async (selectedEmail) => {
  const randomNumbers = generateOTP(4);

  try {
    const info = await transporter.sendMail({
      from: '"Make My Propertyz" <makemypropertyz@gmail.com>',
      to: selectedEmail,
      subject: "Your OTP for reset password with Make My Propertyz",
      text: "Dear Customer,",
      html: `<body>
                <p>Hi there,</p>
                <p>Your OTP to reset password is ${randomNumbers} </p>
                <p>Please do not share it with anyone for security reasons.</p>
                <p>Warm Regards,</p>
                <p>Team Make My Propertyz.</p>
                </body>`,
    });
    // console.log("Info", info);
    return randomNumbers;
  } catch (e) {
    console.log("Message sent: %s", info.messageId);
    return false;
  }
};