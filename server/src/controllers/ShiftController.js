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

    add_post = asyncErrorHandler(async (req, res) => {
            const {
                title,
                date,
                startTime,
                endTime,
                breakDuration,
                scheduleId,
                positionId,
                notes,
            } = req.body;
    
            if (!date || !startTime || !endTime || !scheduleId || !positionId) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
    
            const existingSchedule = await Schedule.findById(scheduleId);
            if (!existingSchedule) {
                return res.status(404).json({ message: 'Schedule not found' });
            }
    
            const existingPosition = await Position.findById(positionId);
            if (!existingPosition) {
                return res.status(404).json({ message: 'Position not found' });
            }
    
            const shift = new Shift({
                title,
                date,
                startTime,
                endTime,
                breakDuration,
                schedule: scheduleId,
                position: positionId,
                notes,
            });
    
            await shift.save();
            res.status(201).json('Shift created successfully');
    });

    edit_put = asyncErrorHandler(async (req, res) => {
            const shiftId = req.params.id;
            const {
                title,
                date,
                startTime,
                endTime,
                breakDuration,
                positionId,
                notes,
            } = req.body;

            const shift = await Shift.findById(shiftId);
            if (!shift) {
                return res.status(404).json('Shift not found' );
            }

            if (!date || !startTime || !endTime || !positionId) {
                return res.status(400).json('Missing required fields' );
            }

            const existingPosition = await Position.findById(positionId);
            if (!existingPosition) {
                return res.status(404).json('Position not found');
            }

            shift.title = title || shift.title;
            shift.date = date || shift.date;
            shift.startTime = startTime || shift.startTime;
            shift.endTime = endTime || shift.endTime;
            shift.breakDuration = breakDuration || shift.breakDuration;
            shift.position = positionId || shift.position;
            shift.notes = notes || shift.notes;

            await shift.save();
            res.status(200).json('Shift updated successfully');
    }) 

    delete = asyncErrorHandler(async (req, res) => {
        const {id} = req.params;
    
        try {
            const shift = await Shift.findByIdAndDelete(id);
    
            if (!shift) {
                return res.status(404).json('Shift not found');
            }
    
            return res.status(200).json('Shift deleted successfully' );
        } catch (error) {
            throw error;
        }
    });
}






module.exports = new ShiftController;   