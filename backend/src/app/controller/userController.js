const User = require("../model/User");

const userController = {

    //GET ALL USER
    getAllUser : async(req, res) => {
        try {
            const user = await User.find();
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    deleteUser : async(req, res) => {
        try {
            const user = await User.findById(req.params.id);
            // console.log('demo');
            return res.status(200).json({user, message: "Delete sucessfully!"});
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}
module.exports = userController;