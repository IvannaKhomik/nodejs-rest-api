const Contact = require("../../models/contact");
const { HttpError, ctrlWrapper } = require("../../helpers");

const getContacts = async (_, res, next) => {
  const contacts = await Contact.find();
  if (!contacts) {
    throw HttpError(404, "No contacts found");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
};

module.exports = { getContacts: ctrlWrapper(getContacts) };
