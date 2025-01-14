const { Contact } = require("../db/models/contactsModel");
const { ContactError } = require("../helpers/errors");

const excludingProjection = { __v: 0, owner: 0 };

const getFavoriteQuery = (favorite) => {
  let query1 = true;
  let query2 = false;
  switch (favorite) {
    case "true":
      query2 = true;
      break;
    case "false":
      query1 = false;
      break;
    default:
      return [query1, query2];
  }
  return [query1, query2];
};

async function getContacts({ userId, skip, limit, favorite }) {
  const favoriteQuery = getFavoriteQuery(favorite);
  const contacts = await Contact.find({
    owner: userId,
    favorite: { $in: favoriteQuery },
  })
    .select(excludingProjection)
    .skip(skip)
    .limit(limit);
  return contacts;
}

async function getContactById(userId, contactId) {
  let contact = await Contact.findById(contactId);
  if (!contact || !contact.owner || contact.owner.valueOf() !== userId)
    throw new ContactError({ type: ContactError.TYPE.CONTACT_NOT_FOUND });
  contact = await Contact.findById(contactId).select(excludingProjection);
  return contact;
}

async function addContact(userId, body) {
  const { _id: contactId } = await Contact.create({ ...body, owner: userId });
  const contact = await getContactById(userId, contactId);
  return contact;
}

async function removeContact(userId, contactId) {
  const contact = await getContactById(userId, contactId);
  await Contact.findByIdAndDelete(contactId);
  return contact;
}

async function updateContact(userId, contactId, body) {
  await getContactById(userId, contactId);
  const contact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  }).select(excludingProjection);
  return contact;
}

async function updateStatusContact(userId, contactId, { favorite }) {
  await getContactById(userId, contactId);
  const contact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  ).select(excludingProjection);
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
