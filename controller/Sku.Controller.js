import SKU from "../models/Sku.Model.js";

const SkuController = {
    createSKU: async (req, res) => {
        try {
            const { sku_name, unit_of_measurement, tax_rate } = req.body;

            // Validate input
            if (!sku_name || !unit_of_measurement || tax_rate === undefined) {
                return res.status(400).json({ error: "Bad Request: Missing required fields" });
            }

            const newSKU = new SKU({ sku_name, unit_of_measurement, tax_rate });
            await newSKU.save();
            res.status(201).json({ message: "SKU created successfully", sku: newSKU });
        } catch (error) {
            res.status(500).json({ error: "Error creating SKU", details: error.message });
        }
    }
}

export default SkuController;