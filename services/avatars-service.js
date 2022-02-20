const Jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");
const { MulterError } = require("../helpers/errors");

const handleAvatarFile = async (file) => {
  if (!file) throw new MulterError({ type: MulterError.TYPE.NO_FILE });
  const avatarPath = path.resolve("public/avatars/");
  const { path: tmpPath, filename } = file;
  const avatar = await Jimp.read(tmpPath);
  await avatar.cover(250, 250).writeAsync(`${avatarPath}\\${filename}`);
  await fs.rm(tmpPath);
  return `avatars/${filename}`;
};

module.exports = { handleAvatarFile };
