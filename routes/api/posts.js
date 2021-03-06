const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//post model
const Post = require("../../models/Post");

//Validation
const validatePostInput = require("../../validation/post");

//@route    GET api/posts/test
//@desc     Tests post route
//@access   Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

//@route    POST api/posts
//@desc     Create Posts
//@access   Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //check validation
    if (!isValid) {
      //if any errors send 400 with err object
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      user: req.body.id
    });
    newPost.save().then(post => res.json(post));
  }
);

module.exports = router;
