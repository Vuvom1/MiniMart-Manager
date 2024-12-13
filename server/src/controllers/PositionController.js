const errors = require('../constant/errors');
const Position = require('../models/Position');

class PositionController {

    all_get = async (req, res) => {
        try {
            const positions = await Position.find();

            res.status(200).json(positions);
        } catch (error) {
            throw error
        }
    }

    add_post = async (req, res) => {
        try {
            const {name, color} = req.body;

            await Position.create({name, color})

            res.status(200).json("New position had been added");
        } catch (error) {
            throw error
        }
    }

}

module.exports = new PositionController;   