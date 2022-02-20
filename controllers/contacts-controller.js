const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../models/contacts");

const getContactsController = async (req, res, next) => {
  const contacts = await getContacts();
  res.json(contacts);
};
const getContactByIdController = async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);
  res.json(contact);
};
const addContactController = async (req, res, next) => {
  const { body } = req;
  const newContact = await addContact(body);
  res.status(201).json(newContact);
};
const removeContactController = async (req, res, next) => {
  const id = req.params.contactId;
  const contactId = await removeContact(id);
  res.json({ message: `contact deleted id#${contactId}` });
};
const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  const newContact = await updateContact(contactId, body);
  res.json(newContact);
};
const updateStatusContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  const newContact = await updateStatusContact(contactId, body);
  res.json(newContact);
};
module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
};
