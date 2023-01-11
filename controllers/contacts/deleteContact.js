const Contact = require("../../models/contact");
const { HttpError, ctrlWrapper } = require("../../helpers");

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await Contact.findByIdAndRemove(contactId);
  if (!deletedContact) {
    throw HttpError(404);
  }
  res.json({
    status: "success",
    code: 200,
    message: "Contact deleted",
  });
};

module.exports = {
  deleteContact: ctrlWrapper(deleteContact),
};
