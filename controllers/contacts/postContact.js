const Contact = require("../../models/contact");
const { ctrlWrapper } = require("../../helpers");

const postContact = async (req, res, next) => {
  const newContact = await Contact.create(req.body);
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
