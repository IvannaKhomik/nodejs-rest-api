const Contact = require("../../models/contact");
const { HttpError, ctrlWrapper } = require("../../helpers");

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const changedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!changedContact) {
    throw HttpError(404);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      contact: changedContact,
    },
  });
};

module.exports = {
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
