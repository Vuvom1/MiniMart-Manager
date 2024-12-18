const errors = require('../constant/errors');
const Schedule = require('../models/Schedule');
const Shift = require('../models/Shift');
const Position = require('../models/Position');
const asyncErrorHandler = require('../util/asyncErrorHandler');

class ShiftController {

    all_get = asyncErrorHandler(async (req, res) => {
        try {
            const shifts = await Shift.find()
                .populate('position')
                .exec();

            res.status(200).json(shifts);
        } catch (error) {
            throw error
        }
    });

    allGroupByScheduleAndWeek_get = asyncErrorHandler(async (req, res) => {
            const shifts = await Shift.aggregate([
                {
                    $lookup: {
                        from: 'schedules',
                        localField: 'schedule',
                        foreignField: '_id',
                        as: 'schedule',
                    },
                },
                {
                    $lookup: {
                        from: 'positions',
                        localField: 'position',
                        foreignField: '_id',
                        as: 'position',
                    },
                },
                {
                    $unwind: { path: '$schedule', preserveNullAndEmptyArrays: true },
                },
                {
                    $unwind: { path: '$position', preserveNullAndEmptyArrays: true },
                },
                {
                    $group: {
                        _id: {
                            schedule: '$schedule._id',
                            week: { $week: '$date' },
                        },
                        shifts: { $push: '$$ROOT' },
                    },
                },
            ]);

            res.status(200).json(shifts);
    });

    add_post = asyncErrorHandler(async (req, res) => {
        const {
           shift
        } = req.body;

        if (!shift) {
            const error = new Error(errors.requiredFieldMissing.code);
            next(error);
        }

        if (!shift.date || !shift.startTime || !shift.endTime || !shift.position) {
            const error = new Error(errors.requiredFieldMissing.code);
            next(error);
        }

        const existingSchedule = await Schedule.findById(shift.schedule);
        if (!existingSchedule) {
            const error = new Error(errors.doesNotExistSchedule.code);
            next(error);
        }

        const existingPosition = await Position.findById(shift.position);
        if (!existingPosition) {
            const error = new Error(errors.positionNotFound.code);
            next(error);
        }

        const createdShift = await Shift.create(shift);
        
        res.status(201).json('Shift created successfully');
    });

    edit_put = asyncErrorHandler(async (req, res, next) => {
        const shiftId = req.params.id;
        const { shift } = req.body;

        const schedule = await Schedule.findById(shift.schedule);
        if (!schedule) {
            const error = new Error(errors.doesNotExistSchedule.code);
            next(error);
        }

        if (!shift) {
            const error = new Error(errors.requiredFieldMissing.code);
            next(error);
        }

        if (!shift.date || !shift.startTime || !shift.endTime || !shift.position) {
            const error = new Error(errors.requiredFieldMissing.code);
            next(error);
        }

        const existingPosition = await Position.findById(shift.position);
        if (!existingPosition) {
            const error = new Error(errors.positionNotFound.code);
            next(error);
        }

        const updatedShift = await Shift.findByIdAndUpdate(shiftId, shift, { new: true });
        res.status(200).json('Shift updated successfully');
    })

    delete = asyncErrorHandler(async (req, res) => {
        const { id } = req.params;

        const shift = await Shift.findByIdAndDelete(id);

        if (!shift) {
            const error = new Error(errors.shiftNotFound.code);
            next(error);
        }

        return res.status(200).json('Shift deleted successfully');
    });
}






module.exports = new ShiftController;   