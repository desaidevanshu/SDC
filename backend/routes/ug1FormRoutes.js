const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const { GridFSBucket } = require("mongodb");
const UG1Form = require("../models/UG1Form");

const router = express.Router();

// ✅ MongoDB Connection
const conn = mongoose.connection;
let gfs;

conn.once("open", () => {
  gfs = new GridFSBucket(conn.db, { bucketName: "uploads" });
  console.log("✅ GridFS connected successfully");
});

// ✅ GridFS Storage Setup
let storage;
conn.once("open", () => {
  gfs = new GridFSBucket(conn.db, { bucketName: "uploads" });

  storage = new GridFsStorage({
    db: conn.db,  // ✅ Use the connected database
    file: (req, file) => ({
      filename: `${Date.now()}-${file.originalname}`,
      bucketName: "uploads",
    }),
  });
  console.log("✅ GridFS and Storage initialized successfully");
});
const upload = multer({ storage });

// ✅ **Submit Form Data (Without File)**
router.post("/saveFormData", async (req, res) => {
  try {
    console.log("📩 **Form Submission Received**:", JSON.stringify(req.body, null, 2));

    const newForm = new UG1Form(req.body);
    const savedForm = await newForm.save();

    console.log("✅ Form saved successfully with ID:", savedForm._id);
    res.status(201).json({ message: "Form data saved successfully", formId: savedForm._id });
  } catch (error) {
    console.error("❌ Error saving form data:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// 📌 **Upload PDF File & Link to Form**
router.post("/uploadPDF/:formId", upload.single("pdfFile"), async (req, res) => {
  try {
    const { formId } = req.params;
    console.log("🟢 Form ID:", formId);
    console.log("📂 File received:", req.file);

    if (!req.file) {
      console.log("❌ No file uploaded!");
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileId = req.file.id;
    console.log("🆔 File ID:", fileId);

    const updatedForm = await UG1Form.findByIdAndUpdate(
      formId,
      { pdfFileId: fileId },
      { new: true }
    );

    if (!updatedForm) {
      console.log("❌ Form not found!");
      return res.status(404).json({ message: "Form not found" });
    }

    console.log("✅ PDF linked successfully:", updatedForm);
    res.status(200).json({ message: "PDF uploaded successfully!", form: updatedForm });
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});


// ✅ **Fetch Form Data for a User**
router.get("/user/:svvNetId", async (req, res) => {
  try {
    const { svvNetId } = req.params;
    const forms = await UG1Form.find({ svvNetId });

    if (!forms.length) {
      return res.status(404).json({ message: "No forms found for this user." });
    }

    res.json(forms);
  } catch (error) {
    console.error("❌ Error fetching user forms:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
