const config = require('../config');

class SMS {
  /**
   * Creates an instance of SMS.
   * @param {string} to - to number
   * @param {string} body - body of message
   * @param {string} [from=config.twilio.from] - from number
   * @memberof SMS
   */
  constructor(to, body, from = config.twilio.from) {
    this.to = to;
    this.body = body;
    this.from = from;
  }

  /**
   * Creates order deliver message
   *
   * @param {string} to - to number
   * @param {string} otpCode - reference of order
   * @returns SMS
   * @memberof SMS
   */
  static CreateOTPMessage(to, otpCode) {
    const message = `Your EliteTapp code is: ${otpCode}`;
    return new SMS(to, message);
  }
}

module.exports = SMS;
