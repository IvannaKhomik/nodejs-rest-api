const { Contact } = require("../../models");
const { HttpError, ctrlWrapper } = require("../../helpers");

const getContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  let contacts;

  contacts = await Contact.find({ owner }, "", {
    skip,
    limit,
  }).populate("owner", "email");

  const { favorite } = req.query;
  if (favorite) {
    contacts = await Contact.find({ owner, favorite }, "", {
      skip,
      limit,
    }).populate("owner", "email");
  }

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
