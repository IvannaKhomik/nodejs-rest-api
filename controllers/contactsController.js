const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");

const getContacts = async (_, res) => {
  const contacts = await listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Contact was not found" });
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      contact,
    },
  });
};

const postContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = await addContact(name, email, phone);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      contact: newContact,
    },
  });
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await removeContact(contactId);
  if (!deletedContact) {
    res.json({
      status: "error",
      code: 404,
      message: "Not found",
    });
    return;
  }
  res.json({
    status: "success",
    code: 200,
    message: "Contact deleted",
  });
};

const putContact = async (req, res) => {
  const { contactId } = req.params;
  const body = Object.keys(req.body);
  if (body.length === 0) {
    res.json({
      status: "error",
      code: 400,
      message: "Missing fields",
    });
    return;
  }
  const { name, email, phone } = req.body;
  const changedContact = await updateContact(contactId, name, email, phone);
  if (!changedContact) {
    res.json({
      status: "error",
      code: 404,
      message: "Not found",
    });
    return;
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
  getContacts,
  getById,
  postContact,
  deleteContact,
  putContact,
};
