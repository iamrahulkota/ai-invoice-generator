import {
    Distributor
} from "../models/distributor.model.js";


export const handleGetUserById = async (req, res) => {
    try {
        const { DistributorId } = req.params;
        const user = await Distributor.findById(DistributorId);
        if (!user) {
            return res.status(404).json({
                meta: {
                    status: 404,
                    message: "Distributor not found"
                }
            });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
            meta: {
                status: 500,
                message: "Internal server error"
            },
            error: error.message
        });
    }
} 

