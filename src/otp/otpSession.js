const redis = require('../services/redis');

class OtpSession {
  /**
   *Creates an instance of OtpSession.
   * @param {string} id
   * @param {string} scope
   * @param {string} userId
   * @param {string} otpCode
   * @param {number} expiry
   * @memberof OtpSession
   */
  constructor(id, scope, userId, otpCode, expiry) {
    this.id = id;
    this.scope = scope;
    this.userId = userId;
    this.expiry = expiry;
    this.otpCode = otpCode;
  }

  async save() {
    const multi = redis.multi();
    // create session
    const sessionKey = OtpSession.getKey(this.id, this.scope);
    multi.hmset(sessionKey, {
      id: this.id,
      scope: this.scope,
      userId: this.userId,
      otpCode: this.otpCode,
      expiry: this.expiry,
    });
    multi.expire(sessionKey, this.expiry);
    await multi.execAsync();
  }

  static getKey(id, scope) {
    return `otp:session:${scope}:${id}`;
  }

  static async DestroyRequest(id) {
    await redis.delAsync(OtpSession.getKey(id));
  }

  static async GetSession(id, scope) {
    const key = OtpSession.getKey(id, scope);
    const data = await redis.hgetallAsync(key);

    if (!data) {
      return null;
    }

    const {
      userId,
      otpCode,
      expiry,
    } = data;

    return new OtpSession(id, scope, userId, otpCode, expiry);
  }
}

exports.OtpSession = OtpSession;
