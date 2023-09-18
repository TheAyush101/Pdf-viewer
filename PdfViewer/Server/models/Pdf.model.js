const mongoose = require("mongoose");

const pdfInfoSchema = new mongoose.Schema(
  {
    emailId: {
      type: String,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  { collection: "pdf-data" }
); // Set the collection name to 'pdf-data'


const PdfInfo = mongoose.model("PdfInfo", pdfInfoSchema);

module.exports = PdfInfo;
