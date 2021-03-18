const httpStatus = require('http-status');
const urljoin = require('url-join');
const { uuid } = require('uuid');
const path = require('path');
const { createUploadReqeust } = require('../../aws');
const UserProfile = require('../../models/userProfile.model');
const config = require('../../config');

const PRESIGNED_EXPIRY = 60 * 60; // 1Hour
const ACL_PRIVATE = 'private';

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
      ACL_PRIVATE,
    );

    const userProfile = await UserProfile.findByPk(user.id);
    userProfile.avatar = key;
    await userProfile.save();

    return res
      .status(httpStatus.OK)
      .json({
        ...result,
        publicUrl: urljoin(config.resourceRoot, key),
      });
  } catch (err) {
    next(err);
  }
};
