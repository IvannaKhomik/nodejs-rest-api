const { ctrlWrapper, HttpError, sendEmail } = require("../../helpers");
const { User } = require("../../models");
const { BASE_URL } = process.env;

const resendVerify = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw HttpError(400, "Missing required field email");
  }
  const user = await User.findOne({ email });
  if (!user.verify) {
    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<p>Please verify your email</p> <a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`,
    };
    await sendEmail(verifyEmail);
    return res.status(200).json({
      message: "Verification email sent",
    });
  }
  res.status(400).json({
    message: "Verification has already been passed",
  });
};

module.exports = {
  resendVerify: ctrlWrapper(resendVerify),
};
