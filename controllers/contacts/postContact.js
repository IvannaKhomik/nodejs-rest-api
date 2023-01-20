const { Contact } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const postContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      contact: newContact,
    },
  });
};

module.exports = {
  postContact: ctrlWrapper(postContact),
};
