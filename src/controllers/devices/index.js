const { createNewDevice } = require('./createNewDevice');
const { deleteDevice } = require('./deleteDevice');
const { updateDevice } = require('./updateDevice');
const { getDevices } = require('./getDevices');

module.exports = {
  createNewDevice,
  deleteDevice,
  updateDevice,
  getDevices,
};
