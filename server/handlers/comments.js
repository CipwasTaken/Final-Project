const { MongoClient} = require("mongodb");
const moment = require("moment")
require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const {v4: uuidv4} = require('uuid')

const postComment = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    
    try {
    await client.connect();
    const db = client.db("LND");

    const _id = uuidv4();
    const { content } = req.body;
    const { postId } = req.params;
    const date = moment().format("YYYY-MM-DD, h:mm a");
    const dateTime = moment().toISOString();
    const name = req.body.user
        console.log(postId)
    const comment = {
        _id,
        content,
        postId,
        date,
        dateTime,
        name
      };
  
      await db.collection("comments").insertOne(comment);
  
      res.status(200).json({ status: 200, message: "Comment added" });
    } catch (err) {
      console.log("Error:", err);
      res.status(500).json({ status: 500, message: "Internal server error" });
    } finally {
      client.close();
    }
  };

const getComments = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    
    try {
        await client.connect();
        const db = client.db("LND");
        const {postId} = req.params;
        const blogPosts = await db.collection("comments").find({ postId }).toArray();
        res.status(200).json(blogPosts);
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ status: 500, message: "Internal server error" });
    } finally {
        client.close();
    }
};

const editComment = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("LND");
        const { commentId } = req.params;
        const { content } = req.body;

        const updatedComment = await db.collection("comments").findOneAndUpdate(
        { _id: commentId },
        { $set: { content } },
        { returnOriginal: false }
        );

        if (!updatedComment.value) {
        res.status(404).json({ status: 404, message: "Comment not found" });
        return;
        }

        res.status(200).json({status: 203, message:"Comment updated"});
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ status: 500, message: "Internal server error" });
    } finally {
        client.close();
    }
};

const deleteComment = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("LND");
        const { id } = req.params; // id of the comment to delete

        const result = await db.collection("comments").deleteOne({ _id: id });

        if (result.deletedCount === 0) {
        throw new Error("Comment not found");
        }

        res.status(200).json({ status: 200, message: "Comment deleted" });
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ status: 500, message: "Internal server error" });
    } finally {
        client.close();
    }
};

module.exports = {postComment, getComments, editComment, deleteComment}