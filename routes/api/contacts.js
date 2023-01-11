const express = require("express");

const router = express.Router();
const {
  getContacts,
  getById,
  postContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares/validationMiddleware");
const { addSchema, putSchema, updateStatusSchema } = require("../../schemas");

router.get("/", getContacts);

router.get("/:contactId", getById);

router.post(
  "/",
  validateBody(addSchema, "Missing required name field"),
  postContact
);
router.patch(
  "/:contactId/favorite",
  validateBody(updateStatusSchema, "Missing field favorite"),
  updateStatusContact
);
router.delete("/:contactId", deleteContact);

router.put(
  "/:contactId",
  validateBody(putSchema, "Missing fields"),
  updateContact
);

module.exports = router;
