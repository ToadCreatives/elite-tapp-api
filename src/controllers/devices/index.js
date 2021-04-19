const { registerNewDevice } = require('./createNewDevice');
const { deleteDevice } = require('./deleteDevice');
const { updateDevice } = require('./updateDevice');
const { getDevices } = require('./getDevices');
const { getUser } = require('./getUser');

module.exports = {
  registerNewDevice,
  deleteDevice,
  updateDevice,
  getDevices,
  getUser,
};
