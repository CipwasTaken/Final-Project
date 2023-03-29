const { MongoClient} = require("mongodb");
const moment = require("moment")
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
        const date = moment().format("MMM Do YYYY, h:mm a")
        await db.collection("blogposts").insertOne({_id, content, date})
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

const updateBlogPost = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
try {
    await client.connect();
    const db = client.db("LND");
    const { id } = req.params;
    const { content } = req.body;
    const result = await db.collection("blogposts").updateOne({ _id: id}, { $set: { content } });
    if (result.modifiedCount === 0) {
    res.status(404).json({ status: 404, message: "Blog post not found" });
    } else {
    res.status(200).json({ status: 200, message: "Blog post updated" });
    }
} catch (err) {
    console.log("Error:", err);
    res.status(500).json({ status: 500, message: "Internal server error" });
} finally {
    client.close();
}
};

const deleteBlogPost = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try{
        
        await client.connect()
        const db = client.db("LND")
        const { id } = req.params;
        const result = await db.collection("blogposts").deleteOne({ _id: id });
        console.log(result);
        res.status(200).json({status: 200, message: "Blog post deleted"});
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({status: 500, message: "Internal server error"});
    } finally {
        client.close()
    }
}



const getMostRecentPost = async (req, res) => {
const client = new MongoClient(MONGO_URI, options);
try {
    await client.connect();
    const db = client.db("LND");
    const mostRecentPost = await db.collection("blogposts").find().sort({ date: -1 }).limit(1).toArray();
    res.status(200).json({ status: 200, message: mostRecentPost});
} catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Internal server error" });
} finally {
    client.close();
}
};

module.exports = { blogPost, getBlogPosts, updateBlogPost, deleteBlogPost, getMostRecentPost};