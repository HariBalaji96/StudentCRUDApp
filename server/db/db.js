const mongoose = require("mongoose");

// main cluster
const MONGO_URL = "mongodb+srv://25mx356_db_user:y63o22CHUag4NVry@cluster0.yze0vyg.mongodb.net/zepodb?retryWrites=true&w=majority";

mongoose.connect(MONGO_URL)
.then(()=> console.log("MongoDB main cluster connected"))
.catch(err=> console.log("Mongo connection error:", err));


// ===== STUDENT COLLECTION =====
const studentSchema = new mongoose.Schema({
  rollNo: { type:String, unique:true, immutable:true },
  name: String,
  dob: String,
  department: String,
  batchYear: String
},{timestamps:true});


// auto roll generator
studentSchema.pre("save", async function () {
  if (!this.isNew) return;

  const last = await mongoose.model("Student")
    .findOne({})
    .sort({ rollNo: -1 });

  let nextNo = 1;

  if (last && last.rollNo) {
    const num = parseInt(last.rollNo.replace("psg", ""));
    nextNo = num + 1;
  }

  this.rollNo = "psg" + String(nextNo).padStart(3, "0");
});


const Student = mongoose.model("Student", studentSchema);


// ===== EXPORT ALL MODELS =====
module.exports = {
  Student
};
