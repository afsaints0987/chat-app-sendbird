const User = require("../models/UserModel");

const createUser = async (req, res) => {
  const { nickname, profile_url, user_identifier } = req.body;

  const userData = await User.create({
    user_identifier,
    user_nickname: nickname,
    user_profile_url: profile_url,
  });

  if (userData) {
    return res.status(201).json({ userData, message: "Successfully created" });
  } else {
    console.log(error);
    return res.status(400).json({ message: "Unable to create user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userIdentifier = req.params.user_identifier;
    console.log(userIdentifier);
    const { nickname, profile_url } = req.body;

    const updateUserId = await User.findOne({
      where: { user_identifier: userIdentifier },
    });
    console.log(updateUserId);

    if (!updateUserId) {
      return res.status(400).json({ message: "User not found" });
    }
    updateUserId.user_nickname = nickname || updateUserId.user_nickname;
    updateUserId.user_profile_url = profile_url || updateUserId.user_profile_url;

    await updateUserId.save()

    return res.status(200).json({message: "User updated", updateUserId})
  } catch (err) {
    console.log("Error updating user", err);
    return res.status(500).send({ message: "Server error" });
  }
};

module.exports = { createUser, updateUser };
