const workShiftSchema = new Schema({
    shiftName: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
});

const Shift = mongoose.model('WorkShift', workShiftSchema);
module.exports = Shift;
