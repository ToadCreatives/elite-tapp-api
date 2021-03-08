const redis = require('../services/redis');

class OtpSession {
  /**
   *Creates an instance of OtpSession.
   * @param {string} id
   * @param {string} scope
   * @param {string} phone
   * @param {string} userId
   * @param {string} otpCode
   * @param {number} expiry
   * @memberof OtpSession
   */
  constructor(id, scope, phone, userId, otpCode, expiry) {
    this.id = id;
    this.scope = scope;
    this.userId = userId;
    this.expiry = expiry;
    this.otpCode = otpCode;
    this.phone = phone;
  }

  static GetKey(id) {
    return `otp:session:${id}`;
  }

  static async Destroy(id) {
    await redis.delAsync(OtpSession.GetKey(id));
  }

  static async GetSession(id) {
    const key = OtpSession.GetKey(id);
    const data = await redis.hgetallAsync(key);

    if (!data) {
      return null;
    }

    const {
      userId,
      otpCode,
      expiry,
      scope,
      phone,
    } = data;

    return new OtpSession(id, scope, phone, userId, otpCode, expiry);
  }
}

exports.OtpSession = OtpSession;
