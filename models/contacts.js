const { Contact } = require("./contactsModel");
const { ContactError } = require("../helpers/errors");

async function getContacts() {
  const contacts = await Contact.find({});
  return contacts;
}

async function listContacts() {
  const contacts = await getContacts();
  console.table(contacts);
}

async function getContactById(contactId) {
  const contact = await Contact.findById(contactId);
  if (!contact)
    throw new ContactError({ type: ContactError.TYPE.CONTACT_NOT_FOUND });
  return contact;
}

async function removeContact(contactId) {
  const contact = await Contact.findByIdAndDelete(contactId);
  if (!contact)
    throw new ContactError({ type: ContactError.TYPE.CONTACT_NOT_FOUND });
  return contactId;
}

async function addContact(body) {
  const { name, email, phone } = body;
  if (!name || !email || !phone)
    throw new ContactError({
      type: ContactError.TYPE.MISSING_REQ,
    });
  const contact = await Contact.create(body);
  return contact;
}

async function updateContact(contactId, body) {
  if (!body) throw new ContactError({ type: ContactError.TYPE.MISSING });
  await Contact.findByIdAndUpdate(contactId, body);
  const contact = await getContactById(contactId);
  return contact;
}

async function updateStatusContact(contactId, { favorite }) {
  if (favorite === undefined)
    throw new ContactError({ type: ContactError.TYPE.MISSING_FAV });
  await Contact.findByIdAndUpdate(contactId, { favorite });
  const contact = await getContactById(contactId);
  return contact;
}
module.exports = {
  getContacts,
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
