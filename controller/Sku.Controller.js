import SKU from "../models/Sku.Model.js";

const SkuController = {
    createSKU: async (req, res) => {
        try {
            const { sku_name, unit_of_measurement, tax_rate } = req.body;

            if (!sku_name || !unit_of_measurement || tax_rate === undefined) {
                return res.status(400).json({ error: "Bad Request: Missing required fields" });
            }

            const newSKU = new SKU({
                sku_name,
                unit_of_measurement,
                tax_rate,
                user_id: req.user.userId
            });

            await newSKU.save();
            res.status(201).json({ message: "SKU created successfully", sku: newSKU });
        } catch (error) {
            res.status(500).json({ error: "Error creating SKU", details: error.message });
        }
    },
    getSKUByUserId: async (req, res) => {
        try {
            const { user_id } = req.params;
            const skus = await SKU.find({ user_id });

            if (skus.length === 0) {
                return res.status(404).json({ message: "No skus found for this user" });
            }

            res.status(200).json({ skus });
        } catch (error) {
            res.status(500).json({ error: "Error retrieving skus", details: error.message });
        }
    }
}

export default SkuController;