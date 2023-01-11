const Contact = require("../../models/contact");
const { HttpError, ctrlWrapper } = require("../../helpers");

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const body = Object.keys(req.body);
  if (body.length === 0) {
    throw HttpError(400, "Missing fields");
  }
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
  updateContact: ctrlWrapper(updateContact),
};
