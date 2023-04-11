const { MongoClient} = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const {v4: uuidv4} = require('uuid')

const User = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const {user} = req.body
  console.log(user)
  const userId = uuidv4();
  const isAdmin = false;
  try{
      await client.connect()
      const db = client.db("LND")
      const users = await db.collection("users").findOne({ email: user.email });
      if (users) {
          res.status(200).json({status: 200, message: "User already exists!"})
          return;
      } else {
      await db.collection("users").insertOne({userId, isAdmin, ...user });
      res.status(200).json({status: 200, message: "User has been added!", userId});
    }
  } catch (err) {
      console.log("Error:", err);
      res.status(500).json({status: 500, message: "Internal server error"});
  } finally {
      client.close()
  }
}

const getUserInfo = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const {id} = req.params
  console.log(req.params)
  try {
    await client.connect();
    const db = client.db("LND");
    const user = await db.collection("users").findOne({ email: id });
    console.log(user)
    if (!user) {
      res.status(404).json({ status: 404, message: "User not found" });
      return;
    }
    const message = user.isAdmin ? true : false;
    res.status(200).json({ user, message });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ status: 500, message: "Internal server error" });
  } finally {
    client.close();
  }
}

module.exports = {User, getUserInfo}