const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const result = await fs.readFile(contactsPath);
    return JSON.parse(result);
  } catch (err) {
    console.error(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === contactId);
    return result || null;
  } catch (err) {
    console.error(err);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (err) {
    console.error(err);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (err) {
    console.error(err);
  }
};

const updateContact = async (contactId, name, email, phone) => {
  try {
    const contacts = await listContacts();
    const [changedContact] = contacts.filter(
      (contact) => contact.id === contactId
    );
    if (!changedContact) {
      return null;
    }
    if (name) {
      changedContact.name = name;
    }
    if (email) {
      changedContact.email = email;
    }
    if (phone) {
      changedContact.phone = phone;
    }
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return changedContact;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
