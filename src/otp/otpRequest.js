const redis = require('../services/redis');

class OtpRequest {
  /**
   *Creates an instance of OTPRequest.
   * @param {string} phoneNumber - usually the mobile number
   * @param {string} userId - user
   * @param {string} requestId - request id
   * @param {string} scope - scope of session
   * @param {number} expiry - ttl for session
   * @memberof OTPRequest
   */
  constructor(phoneNumber, userId, requestId, scope, expiry) {
    this.phoneNumber = phoneNumber;
    this.scope = scope;
    this.userId = userId;
    this.expiry = expiry;
    this.requestId = requestId;
  }

  async save() {
    const multi = redis.multi();

    // create request : lookup by phone
    const requestKey = OtpRequest.getKey(this.phoneNumber, this.scope);
    multi.hmset(requestKey, {
      phoneNumber: this.phoneNumber,
      scope: this.scope,
      userId: this.userId,
      requestId: this.requestId,
      expiry: this.expiry,
    });
    multi.expire(requestKey, this.expiry);

    await multi.execAsync();
  }

  static getKey(id, scope) {
    return `otp:request:${scope}:${id}`;
  }

  static async DestroyRequest(id) {
    await redis.delAsync(OtpRequest.getKey(id));
  }

  static async GetRequest(phoneNumber, scope) {
    const key = OtpRequest.getKey(phoneNumber, scope);
    const data = await redis.hgetallAsync(key);

    if (!data) {
      return null;
    }

    const {
      userId,
      expiry,
      requestId,
    } = data;

    return new OtpRequest(phoneNumber, userId, requestId, scope, expiry);
  }
}

exports.OtpRequest = OtpRequest;
