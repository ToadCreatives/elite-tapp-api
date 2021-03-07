const redis = require('../services/redis');

class OTPSession {
  /**
   *Creates an instance of OTPSession.
   * @param {string} id - usually the mobile number
   * @param {string} userId - user
   * @param {string} requestId - request id
   * @param {string} otpCode - otp code
   * @param {string} scope - scope of session
   * @param {number} expiry - ttl for session
   * @memberof OTPSession
   */
  constructor(id, userId, requestId, otpCode, scope, expiry) {
    this.id = id;
    this.scope = scope;
    this.userId = userId;
    this.expiry = expiry;
    this.otpCode = otpCode;
    this.requestId = requestId;
    this.key = OTPSession.getKey(id, scope);
  }

  async save() {
    const multi = redis.multi();
    multi.hmset(this.key, {
      id: this.id,
      scope: this.scope,
      userId: this.userId,
      otpCode: this.otpCode,
      expiry: this.expiry,
    });
    multi.expire(this.key, this.expiry);
    await multi.execAsync();
  }

  static getKey(id, scope) {
    return `otp:${scope}:${id}`;
  }

  static async DestroySession(id) {
    await redis.delAsync(OTPSession.getKey(id));
  }

  static async GetSession(id, scope) {
    const key = OTPSession.getKey(id, scope);
    const data = await redis.hgetallAsync(key);

    if (!data) {
      return null;
    }

    const {
      userId,
      otpCode,
      expiry,
      requestId,
    } = data;

    return new OTPSession(id, userId, requestId, otpCode, scope, expiry);
  }
}

exports.OTPSession = OTPSession;

const OTP_SCOPE_PASSWORD_RESET = 'password-reset';
exports.OTP_SCOPE_PASSWORD_RESET = OTP_SCOPE_PASSWORD_RESET;
