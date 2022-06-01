const path = require("path");
const fs = require("fs").promises;
const { nanoid } = require("nanoid");

const { ContactError } = require("../helpers/errors");
const contactsPath = path.resolve("db/contacts.json");

async function getContacts() {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
}

async function writeContacts(newContacts) {
  const contacts = JSON.stringify(newContacts, null, 2);
  await fs.writeFile(contactsPath, contacts, "utf-8");
}

async function getContactById(contactId) {
  const contacts = await getContacts();
  const contact = contacts.find((contact) => contact.id === contactId);

  if (!contact) {
    throw new ContactError({ type: ContactError.TYPE.CONTACT_NOT_FOUND });
  }
  return contact;
}

async function removeContact(contactId) {
  const contacts = await getContacts();
  const deletedContactIdx = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (deletedContactIdx === -1) {
    throw new ContactError({ type: ContactError.TYPE.CONTACT_NOT_FOUND });
  }

  const [deletedContact] = contacts.splice(deletedContactIdx, 1);
  await writeContacts(contacts);

  return deletedContact;
}

async function addContact(body) {
  const contacts = await getContacts();

  const id = nanoid();
  const newContact = { id, ...body };

  const newContacts = [...contacts, newContact];
  await writeContacts(newContacts);

  return newContact;
}

async function updateContact(contactId, body) {
  if (!Object.keys(body).length)
    throw new ContactError({ type: ContactError.TYPE.MISSING });

  const contacts = await getContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    throw new ContactError({ type: ContactError.TYPE.CONTACT_NOT_FOUND });
  }

  const updatedContact = { ...contacts[index], ...body };
  contacts[index] = updatedContact;
  await writeContacts(contacts);

  return updatedContact;
}

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
