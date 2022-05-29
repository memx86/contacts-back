const { Contact } = require("../db/models/contactsModel");
const { ContactError } = require("../helpers/errors");

async function getContacts() {
  const contacts = await Contact.find({});
  return contacts;
}

async function getContactById(contactId) {
  const contact = await Contact.findById(contactId);
  if (!contact)
    throw new ContactError({ type: ContactError.TYPE.CONTACT_NOT_FOUND });
  return contact;
}

async function removeContact(contactId) {
  try {
    const contact = await Contact.findByIdAndDelete(contactId);
    return contact;
  } catch (error) {
    throw new ContactError({ type: ContactError.TYPE.CONTACT_NOT_FOUND });
  }
}

async function addContact(body) {
  const contact = await Contact.create(body);
  return contact;
}

async function updateContact(contactId, body) {
  if (!Object.keys(body).length)
    throw new ContactError({ type: ContactError.TYPE.MISSING });
  try {
    const contact = await Contact.findByIdAndUpdate(contactId, body, {
      returnDocument: "after",
    });
    return contact;
  } catch (error) {
    throw new ContactError({ type: ContactError.TYPE.CONTACT_NOT_FOUND });
  }
}

async function updateStatusContact(contactId, { favorite }) {
  if (typeof favorite !== "boolean")
    throw new ContactError({ type: ContactError.TYPE.MISSING_FAV });
  const contact = await getContactById(contactId);
  contact.favorite = favorite;
  await contact.save();
  return contact;
}

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
