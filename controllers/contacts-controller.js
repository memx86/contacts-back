const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../services/contacts-service");

// maybe better use this?
// const contactResponseMaker = ({ _doc }) => {
//   const { __v, owner, ...contact } = _doc;
//   return contact;
// };

const checkNan = (value) => {
  return !isNaN(value) ? value : 0;
};

const validatePage = (value) => {
  const page = checkNan(parseInt(value));
  return page > 0 ? page : 1;
};

const validateLimit = (value) => {
  let limit = checkNan(parseInt(value));
  limit = limit <= 0 ? 20 : limit;
  limit = limit > 50 ? 50 : limit;
  return limit;
};

const getContactsController = async (req, res, next) => {
  const { userId } = req;
  let { page, limit, favorite } = req.query;
  page = validatePage(page);
  limit = validateLimit(limit);
  const skip = (page - 1) * limit;
  // only favorite or not favorite in this implementation
  const contacts = await getContacts({ userId, skip, limit, favorite });
  const totalContacts = contacts.length;
  res.json({ contacts, page, limit, total_results: totalContacts });
};
const getContactByIdController = async (req, res, next) => {
  const { userId } = req;
  const id = req.params.contactId;
  const contact = await getContactById(userId, id);
  // maybe better use this?
  // res.json(contactResponseMaker(contact));
  res.json(contact);
};
const addContactController = async (req, res, next) => {
  const { body, userId } = req;
  const newContact = await addContact(userId, body);
  // res.status(201).json(contactResponseMaker(newContact));
  res.status(201).json(newContact);
};
const removeContactController = async (req, res, next) => {
  const { userId } = req;
  const id = req.params.contactId;
  const contactId = await removeContact(userId, id);
  res.json({ message: `contact deleted id#${contactId}` });
};
const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { body, userId } = req;
  const newContact = await updateContact(userId, contactId, body);
  // res.json(contactResponseMaker(newContact));
  res.json(newContact);
};
const updateStatusContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { body, userId } = req;
  const newContact = await updateStatusContact(userId, contactId, body);
  // res.json(contactResponseMaker(newContact));
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
