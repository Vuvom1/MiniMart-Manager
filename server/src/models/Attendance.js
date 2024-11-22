const mongoose = require("mongoose");

const attendanceSchema = new Schema({
  staffId: { type: Schema.Types.ObjectId, ref: "Staff", required: true },
  scheduleId: { type: Schema.Types.ObjectId, ref: "Schedule", required: true },
  date: { type: Date, required: true },
  isAbsent: { type: Boolean, required: true },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;
