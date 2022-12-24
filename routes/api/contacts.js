const express = require("express");

const router = express.Router();
const {
  getContacts,
  getById,
  postContact,
  deleteContact,
  putContact,
} = require("../../controllers/contactsController");
const {
  postValidation,
  putValidation,
} = require("../../middlewares/validationMiddleware");

router.get("/", getContacts);

router.get("/:contactId", getById);

router.post("/", postValidation, postContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", putValidation, putContact);

module.exports = router;
