const Contact = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

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
  getContacts: ctrlWrapper(getContacts),
  getById: ctrlWrapper(getById),
  postContact: ctrlWrapper(postContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
