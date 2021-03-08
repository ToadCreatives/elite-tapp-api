const redis = require('../services/redis');
const { OtpSession } = require('./otpSession');

class OtpRequest {
  /**
   *Creates an instance of OTPRequest.
   * @param {string} phone - usually the mobile number
   * @param {string} scope - scope of session
   * @param {string} userId - user
   * @param {string} requestId - request id
   * @param {number} expiry - ttl for session
   * @memberof OTPRequest
   */
  constructor(phone, scope, userId, requestId, expiry) {
    this.phone = phone;
    this.scope = scope;
    this.userId = userId;
    this.expiry = expiry;
    this.requestId = requestId;
  }

  async saveAndCreateSession() {
    const multi = redis.multi();

    // create request : lookup by phone
    const requestKey = OtpRequest.GetKey(this.phone, this.scope);
    multi.hmset(requestKey, {
      phone: this.phone,
      scope: this.scope,
      userId: this.userId,
      requestId: this.requestId,
      expiry: this.expiry,
    });
    multi.expire(requestKey, this.expiry);

    // create sessoion for validate
    const sessionKey = OtpSession.GetKey(this.requestId);
    multi.hmset(sessionKey, {
      id: this.requestId,
      scope: this.scope,
      userId: this.userId,
      otpCode: this.otpCode,
      expiry: this.expiry,
      phoneNumber: this.phone,
    });
    multi.expire(sessionKey, this.expiry);

    await multi.execAsync();
  }

  static async DestroyWithSession(phone, scope, requestId) {
    const multi = redis.multi();
    multi.del(OtpRequest.GetKey(phone, scope));
    multi.del(OtpSession.GetKey(requestId));
    await multi.execAsync();
  }

  static GetKey(phoneNumber, scope) {
    return `otp:request:${scope}:${phoneNumber}`;
  }

  static async Destroy(phoneNumber, scope) {
    await redis.delAsync(OtpRequest.GetKey(phoneNumber, scope));
  }

  static async GetRequest(phone, scope) {
    const key = OtpRequest.GetKey(phone, scope);
    const data = await redis.hgetallAsync(key);

    if (!data) {
      return null;
    }

    const {
      userId,
      expiry,
      requestId,
    } = data;

    return new OtpRequest(phone, userId, requestId, scope, expiry);
  }
}

exports.OtpRequest = OtpRequest;
