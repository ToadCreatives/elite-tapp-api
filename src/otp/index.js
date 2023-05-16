const { OtpRequest } = require('./otpRequest');
const { OtpSession } = require('./otpSession');

exports.OtpRequest = OtpRequest;
exports.OtpSession = OtpSession;

const OTP_SCOPE_PASSWORD_RESET = 'password-reset';
exports.OTP_SCOPE_PASSWORD_RESET = OTP_SCOPE_PASSWORD_RESET;
