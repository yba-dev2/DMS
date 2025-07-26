// emailService.js - Fixed email configuration
const nodemailer = require("nodemailer");

const userEmail = process.env.USEREMAIL;
const appPassword = process.env.APPPASSWORD;

// Validate environment variables
if (!userEmail || !appPassword) {
  console.error("❌ Missing email credentials in environment variables");
  throw new Error("Email credentials not configured");
}

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: userEmail,
    pass: appPassword,
  },
  tls: {
    rejectUnauthorized: false, // Changed to false for testing
    ciphers: 'SSLv3'
  },
  requireTLS: true,
  connectionTimeout: 60000,
  greetingTimeout: 30000,
  socketTimeout: 60000,
});

// Test the connection
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter verification failed:", error);
  } else {
    console.log("✅ Email transporter is ready");
  }
});

const sendEmail = async (to, subject, html) => {
  try {
    console.log(`📧 Attempting to send email to: ${to}`);
    
    const info = await transporter.sendMail({
      from: `"BIL DMS System" <${userEmail}>`, // Use actual authenticated email
      to,
      subject,
      html
    });
    
    console.log("✅ Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw error;
  }
};

module.exports = sendEmail;