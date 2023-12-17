exports.emailBodyOTP = (email, otp) => {
  return `
    <p>Hi ${email}!</p>
    <p>Your One-Time Password (OTP) is: <strong>${otp}</strong></p>
    <p>Please use this OTP to complete your authentication process.</p>
    <p>Thank you!</p>
  `;
};

exports.emailBodyForgotPassword = (email, token) => {
  return `
    <h1>Hallo ${email}<h1>
    <p>Please don't tell this link to anyone<p>
    <p>Thank you for order!</p>
    <a href="http://localhost:3000/auth/update-forgot-password/${token}">Receipt Link</a>
    <h3>Please don't tell that link to anyone</h3>
  `;
};

exports.emailBodySuccessPayment = (email, orderId, paymentId) => {
  return `
    <h1>Hallo ${email}<h1>
    <p>Your transaction with order id ${orderId} is SUCCESS!<p>
    <p>Thank you for order!</p>
    <a href="http://localhost:3000/transaction/${paymentId}">Receipt Link</a>
    <h3>Please don't tell that link to anyone</h3>
  `;
};
