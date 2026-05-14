const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth");

const User = require("../models/user");

const bcrypt = require("bcryptjs");


// GET PROFILE

router.get("/profile", authMiddleware, async (req, res) => {

  try {

    const user = await User.findById(req.user.id)
      .select("-password");

    res.json({
      message: "User profile",
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });

  }

});


// UPDATE PROFILE

router.put("/update", authMiddleware, async (req, res) => {

  try {

    const { name } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    user.name = name || user.name;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });

  }

});


// CHANGE PASSWORD

router.put(
  "/change-password",
  authMiddleware,
  async (req, res) => {

    try {

      const { oldPassword, newPassword } = req.body;

      const user = await User.findById(req.user.id);

      const isMatch = await bcrypt.compare(
        oldPassword,
        user.password
      );

      if (!isMatch) {

        return res.status(400).json({
          message: "Wrong old password",
        });

      }

      user.password = await bcrypt.hash(
        newPassword,
        10
      );

      await user.save();

      res.json({
        message: "Password updated",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server error",
      });

    }

  }
);


// DELETE USER

router.delete("/delete", authMiddleware, async (req, res) => {

  try {

    await User.findByIdAndDelete(req.user.id);

    res.json({
      message: "Account deleted",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });

  }

});


module.exports = router;