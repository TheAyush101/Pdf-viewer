const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const PdfModel = require("./models/Pdf.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // Import bcrypt

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(
  "mongodb+srv://user-101:1357@pdf.hx5gm49.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.post("/api/register", async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName,
      email,
      password: hashedPassword, // Save the hashed password
    });

    res.json({ status: "ok" });
  } catch (err) {
    console.error(err);
    res.json({
      status: "error",
      error: "Duplicate email or other registration issue",
    });
  }
});



app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ status: "error", user: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          name: user.userName,
          email: user.email,
        },
        "secret123"
      );
      return res.json({ status: "ok", user: true, token });
    } else {
      return res.json({ status: "error", user: false });
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return res.json({ status: "error", user: false });
  }
});


app.post("/api/upload-pdf-info", async (req, res) => {
  try {
    const { emailId, totalPages } = req.body;

    // Create a new PdfModel instance and save it to the database
    const pdfInfo = await PdfModel.create({
      emailId,
      
      totalPages,
    });

    res.json({ status: "ok", pdfInfo });
  } catch (err) {
    console.error(err);
    res.json({ status: "error", error: "Failed to save PDF info" });
  }
});

app.listen(1337, () => {
  console.log("server running on 1337");
});
