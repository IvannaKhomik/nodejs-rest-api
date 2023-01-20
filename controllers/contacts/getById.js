const { Contact } = require("../../models");
const { HttpError, ctrlWrapper } = require("../../helpers");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw HttpError(404, "Contact was not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      contact,
    },
  });
};

module.exports = {
  getById: ctrlWrapper(getById),
};
