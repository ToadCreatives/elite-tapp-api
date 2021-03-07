const redis = require('../services/redis');

class OTPSession {
  /**
   *Creates an instance of OTPSession.
   * @param {string} id - usually the mobile number
   * @param {string} userId - user
   * @param {string} code - otp code
   * @param {string} scope - scope of session
   * @param {number} expiry - ttl for session
   * @memberof OTPSession
   */
  constructor(id, userId, code, scope, expiry) {
    this.id = id;
    this.scope = scope;
    this.userId = userId;
    this.expiry = expiry;
    this.code = code;
    this.key = OTPSession.getKey(id);
  }

  async save() {
    const multi = redis.multi();
    multi.hmset(this.key, {
      id: this.id,
      scope: this.scope,
      userId: this.userId,
      code: this.code,
      expiry: this.expiry,
    });
    multi.expire(this.key, this.expiry);
    await multi.execAsync();
  }

  static getKey(id) {
    return `otp:${id}`;
  }

  static async DestroySession(id) {
    await redis.delAsync(OTPSession.getKey(id));
  }

  static async GetSession(id) {
    const key = OTPSession.getKey(id);
    const data = await redis.hgetallAsync(key);

    if (!data) {
      return null;
    }

    const {
      scope,
      userId,
      code,
      expiry,
    } = data;

    return new OTPSession(id, userId, code, scope, expiry);
  }
}

exports.OTPSession = OTPSession;
