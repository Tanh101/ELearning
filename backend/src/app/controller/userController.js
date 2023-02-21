const User = require("../model/User");

const userController = {

    //GET ALL USER
    getAllUser : async(req, res) => {
        try {
            const user = await User.find();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteUser : async(req, res) => {
        try {
            const user = await User.findById(req.params.id);
            // console.log('demo');
            res.status(200).json({user, message: "Delete sucessfully!"});
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
module.exports = userController;