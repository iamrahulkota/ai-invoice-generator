import { Shops } from '../models/shops.model.js';

export const handleGetAllShops = async (req, res) => {
    try {
        const { status, search } = req.query;

        // Build filter — always scope to logged-in distributor
        const filter = { distributor_id: req._id };
        if (status === "active") {
            filter.is_active = true;
        } else if (status === "inactive") {
            filter.is_active = false;
        }

        // Search filter — case-insensitive partial match on shop_name
        if (search && search.trim() !== "") {
            filter.shop_name = { $regex: search.trim(), $options: "i" };
        }

        const allShops = await Shops.find(filter).sort({ createdAt: -1 });

        return res.status(200).json({
            meta: {
                status: 200,
                message: "Shops retrieved successfully",
                filter: status || "all",
                search: search || null,
                total: allShops.length,
            },
            data: allShops,
        });
    } catch (error) {
        return res.status(500).json({
            meta: {
                status: 500,
                message: "Internal server error",
            },
            error: error.message,
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
    console.log("REQ BODY:", req.body);
    const { shop_name, shop_owner_name, contact_number, address } = req.body;

    if (!shop_name || !shop_owner_name || !contact_number || !address) {
      return res.status(400).json({
        meta: {
          status: 400,
          message: "Shop name, owner name, contact number and address are required",
        },
      });
    }

    const newShop = new Shops({
      ...req.body,
      distributor_id: req.distributor._id,  // ← from verifyToken middleware
    });
    await newShop.save();

    return res.status(201).json({
      meta: {
        status: 201,
        message: "Shop created successfully",
      },
      data: newShop,
    });
  } catch (error) {
    return res.status(500).json({
      meta: {
        status: 500,
        message: "Internal server error",
      },
      error: error.message,
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