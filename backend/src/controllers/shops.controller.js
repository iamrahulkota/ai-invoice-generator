import { Shops } from '../models/shops.model.js';

export const handleGetAllShops = async (req, res) => {
    try {
        const allShops = await Shops.find();
        return res.status(200).json({
            meta: {
                status: 200,
                message: "Shops retrieved successfully"
            },
            data: allShops
        });
    } catch (error) {
        return res.status(500).json({
            meta: {
                status: 500,
                message: "Internal server error"
            },
            error: error.message
        });
    }
};

export const handleGetShopById = async (req, res) => {
    try {
        const { shopId } = req.params;
        const shop = await Shops.findById(shopId);
        if (!shop) {
            return res.status(404).json({
                meta: {
                    status: 404,
                    message: "Shop not found"
                }
            });
        }
        return res.status(200).json({
            meta: {
                status: 200,
                message: "Shop retrieved successfully"
            },        
            data: shop
        });
    } catch (error) {
        return res.status(500).json({
            meta: {
                status: 500,
                message: "Internal server error"
            },
            error: error.message
        });
    }
};

export const handleCreateShop = async (req, res) => {
    try {
        const shopData = req.body;

        if (!shopData.shop_name || !shopData.shop_owner_name || !shopData.shop_email || !shopData.shop_logo || !shopData.contact_number || !shopData.gstin || !shopData.notes || !shopData.address) {
            return res.status(400).json({
                meta: {
                    status: 400,
                    message: "Shop name, Owner name, Email, Logo, Contact number, GSTIN, Notes, and Address are required"
                }
            });
        }

        const newShop = new Shops(shopData);
        await newShop.save();

        return res.status(201).json({
            meta: {
                status: 201,
                message: "Shop created successfully"
            },
            data: newShop
        });
    } catch (error) {
        return res.status(500).json({
            meta: {
                status: 500,
                message: "Internal server error"
            },
            error: error.message
        });
    }
};

export const handleUpdateShop = async (req, res) => {
    try {
        const { shopId } = req.params;
        const updateData = req.body;

        const updatedShop = await Shops.findByIdAndUpdate(
            shopId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedShop) {
            return res.status(404).json({
                meta: {
                    status: 404,
                    message: "Shop not found"
                }
            });
        }

        return res.status(200).json({
            meta: {
                status: 200,
                message: "Shop updated successfully"
            },
            data: updatedShop
        });
    } catch (error) {
        return res.status(500).json({
            meta: {
                status: 500,
                message: "Internal server error"
            },
            error: error.message
        });
    }
};

export const handleDeleteShop = async (req, res) => {
    try {
        const { shopId } = req.params;

        const deletedShop = await Shops.findByIdAndDelete(shopId);

        if (!deletedShop) {
            return res.status(404).json({
                meta: {
                    status: 404,
                    message: "Shop not found"
                }
            });
        }

        return res.status(200).json({
            meta: {
                status: 200,
                message: "Shop deleted successfully"
            },
            data: { id: shopId }
        });
    } catch (error) {
        return res.status(500).json({
            meta: {
                status: 500,
                message: "Internal server error"
            },
            error: error.message
        });
    }
};