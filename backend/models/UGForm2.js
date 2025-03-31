const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  srNo: String,
  branch: String,
  yearOfStudy: String,
  studentName: String,
  rollNumber: String,
});

const UGForm2Schema = new mongoose.Schema({
  projectTitle: { type: String, required: true },
  projectUtility: { type: String, required: true },
  projectDescription: { type: String, required: true },
  finance: { type: String, required: true },
  guideName: { type: String, required: true },
  employeeCode: { type: String, required: true },
  amountClaimed: { type: String, required: true },
  studentDetails: [studentSchema], // Array of student details
  pdfFileId: { type: mongoose.Schema.Types.ObjectId, ref: "uploads.files" }, // GridFS File ID
}, { timestamps: true });

module.exports = mongoose.model("UGForm2", UGForm2Schema);
