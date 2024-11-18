const errors = require('../constant/errors');
const Shift = require('../models/Shift');

class ShiftController {

    all_get = async (req, res) => {
        try {
            const shifts = await Shift.find()
                .populate('style')
                .exec();

            res.status(200).json(shifts);
        } catch (error) {
            throw error
        }
    }

    add_post = async (req, res) => {
       
    }

    edit_put = async (req, res) => {

    }

   


}

module.exports = new ShiftController;   