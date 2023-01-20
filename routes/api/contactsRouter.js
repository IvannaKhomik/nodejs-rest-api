const express = require("express");

const contactsRouter = express.Router();
const {
  getContacts,
  getById,
  postContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts");

const { validateBody, authenticate } = require("../../middlewares");
const {
  addSchema,
  putSchema,
  updateStatusSchema,
} = require("../../schemas/contacts");

contactsRouter.get("/", authenticate, getContacts);

contactsRouter.get("/:contactId", authenticate, getById);

contactsRouter.post(
  "/",
  authenticate,
  validateBody(addSchema, "Missing required name field"),
  postContact
);
contactsRouter.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(updateStatusSchema, "Missing field favorite"),
  updateStatusContact
);
contactsRouter.delete("/:contactId", authenticate, deleteContact);

contactsRouter.put(
  "/:contactId",
  authenticate,
  validateBody(putSchema, "Missing fields"),
  updateContact
);

module.exports = contactsRouter;
