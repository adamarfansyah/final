exports.emailBodyOTP = (email, otp) => {
  return `
    <p>Hi ${email}!</p>
    <p>Your One-Time Password (OTP) is: <strong>${otp}</strong></p>
    <p>Please use this OTP to complete your authentication process.</p>
    <p>Thank you!</p>
  `;
};

exports.emailBodyForgotPasswordUser = (email, token) => {
  return `
    <p>Hallo ${email}</p>
    <p>This is link for your update password</p>
    <p>Click this link below for direct to update your password account</p>
    <a href="http://localhost:3000/update-forgot-password/user/${token}">Update Password</a>
    <h3>Please don't tell that link to anyone</h3>
  `;
};

exports.emailBodyForgotPasswordMerchant = (email, token) => {
  return `
    <p>Hallo ${email}</p>
    <p>This is link for your update password</p>
    <p>Click this link below for direct to update your password account</p>
    <a href="http://localhost:3000/update-forgot-password/merchant/${token}">Update Password</a>
    <h3>Please don't tell that link to anyone</h3>
  `;
};

exports.emailBodySuccessPayment = (email, orderId, paymentId) => {
  return `
    <h1>Hallo ${email}</h1>
    <p>Your transaction with order id ${orderId} is SUCCESS!</p>
    <p>Thank you for order!</p>
    <a href="http://localhost:3000/transaction/${paymentId}">Receipt Link</a>
    <h3>Please don't tell that link to anyone</h3>
  `;
};
