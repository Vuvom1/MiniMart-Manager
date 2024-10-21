const scheduleSchema = new Schema({
    staffId: { type: Schema.Types.ObjectId, ref: 'Staff', required: true },
    shiftId: { type: Schema.Types.ObjectId, ref: 'Shift', required: true },
    dayOfWeek: { type: String, required: true }
});

const Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = Schedule;
