const { getContacts } = require("./getContacts");
const { getById } = require("./getById");
const { postContact } = require("./postContact");
const { deleteContact } = require("./deleteContact");
const { updateContact } = require("./updateContact");
const { updateStatusContact } = require("./updateStatusContact");

module.exports = {
  getContacts,
  getById,
  postContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
