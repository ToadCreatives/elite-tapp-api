const httpStatus = require('http-status');
const { v4: uuid } = require('uuid');
const path = require('path');

const { createUploadReqeust } = require('../../aws');
const config = require('../../config');
const { getOrCreateUserProfile } = require('./common/profile');

const PRESIGNED_EXPIRY = 60 * 60; // 1Hour
// eslint-disable-next-line no-unused-vars
const ACL_PRIVATE = 'private';
const ACL_PUBLIC = 'public';

exports.uploadAvatar = async (req, res, next) => {
  try {
    const { user } = req;
    const { name, contentType, contentMd5 } = req.body;
    const key = `avatars/user/${user.username}/avatar-${uuid()}${path.extname(name)}`;
    const result = await createUploadReqeust(
      config.aws.buckets.media,
      key,
      contentType,
      contentMd5,
      PRESIGNED_EXPIRY,
      ACL_PUBLIC, // TODO: change if we use a CDN
    );

    const userProfile = await getOrCreateUserProfile(user.id);
    userProfile.avatar = key;
    await userProfile.save();

    return res
      .status(httpStatus.OK)
      .json({
        ...result,
      });
  } catch (err) {
    next(err);
  }
};
