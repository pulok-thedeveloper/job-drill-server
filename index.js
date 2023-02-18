const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

require("dotenv").config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://jobDrillDBUser:bnjizUse5Zj5aSpV@cluster0.tftz42f.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

//Connecting Database
async function dbConnect() {
  try {
    await client.connect();
    console.log("Database Connected");
  } catch (error) {
    console.log(error.name, error.message);
    res.send({
      success: false,
      error: error.message,
    });
  }
}

dbConnect();

//Services
const Services = client.db("jobDrill").collection("services");
app.get("/services", async (req, res) => {
  try {
    const cursor = Services.find({});
    const services = await cursor.toArray();

    res.send({
      success: true,
      data: services,
    });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});

//Categories
const Categories = client.db("jobDrill").collection("categories");
app.get("/categories", async (req, res) => {
  try {
    const cursor = Categories.find({});
    const categories = await cursor.toArray();

    res.send({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});

//Companies
const Companies = client.db("jobDrill").collection("companies");
app.get("/companies", async (req, res) => {
  try {
    const cursor = Companies.find({});
    const companies = await cursor.toArray();

    res.send({
      success: true,
      data: companies,
    });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});

//Jobs
const Jobs = client.db("jobDrill").collection("jobs");
app.get("/jobs", async (req, res) => {
  try {
    const cursor = Jobs.find({});
    const jobs = await cursor.toArray();

    res.send({
      success: true,
      data: jobs,
    });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});

//Jobs by experience
app.get("/jobs/:experience", async (req, res) => {
  try {
    const exp = req.params.experience;
    const query = { experience: exp };
    const cursor = Jobs.find(query);
    const jobs = await cursor.toArray();

    res.send({
      success: true,
      data: jobs,
    });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});

app.get("/", (req, res) => {
  try {
    res.send("JobDrill server is running...");
  } catch (error) {
    res.send(error.message);
  }
});

app.listen(port, () => console.log("JobDrill Server running on port", port));
