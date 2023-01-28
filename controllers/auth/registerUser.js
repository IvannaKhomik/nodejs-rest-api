const { User } = require("../../models");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { BASE_URL } = process.env;

const bcrypt = require("bcryptjs");
const { HttpError, ctrlWrapper } = require("../../helpers");
const { sendEmail } = require("../../services/email");

const registerUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<p>Please verify your email</p> <a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = {
  registerUser: ctrlWrapper(registerUser),
};
