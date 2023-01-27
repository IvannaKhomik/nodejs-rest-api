const { ctrlWrapper } = require("../../helpers");
const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../models");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, filename } = req.file;

  const image = await Jimp.read(tempUpload);
  image.resize(250, 250);
  image.write(tempUpload);

  const newFileName = `${_id}_${filename}`;

  const resultUpload = path.join(avatarsDir, newFileName);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", newFileName);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.status(200).json({ avatarURL });
};

module.exports = {
  updateAvatar: ctrlWrapper(updateAvatar),
};
