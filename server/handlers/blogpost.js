const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const {v4: uuidv4} = require('uuid')

const blogPost = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try{
        await client.connect()
        const db = client.db("LND")
        const _id = uuidv4();
        const {content} = req.body;
        await db.collection("blogposts").insertOne({_id, content})
        res.status(200).json({status: 200, message: "Blog Post Created!"})
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({status: 500, message: "Internal server error"});
    } finally {
        client.close()
    }
}

const getBlogPosts = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
  
    try {
      await client.connect();
      const db = client.db("LND");
      const blogPosts = await db.collection("blogposts").find().toArray();
      res.status(200).json(blogPosts);
    } catch (err) {
      console.log("Error:", err);
      res.status(500).json({ status: 500, message: "Internal server error" });
    } finally {
      client.close();
    }
  };

module.exports = { blogPost, getBlogPosts };