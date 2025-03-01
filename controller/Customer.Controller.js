import Customer from '../models/Customer.Model.js';


const CustomerController = {
    createCustomer: async (req, res) => {
        try {
            const { name, address } = req.body;

            // Validate input
            if (!name || !address) {
                return res.status(400).json({ error: "Bad Request: Missing required fields" });
            }

            const newCustomer = new Customer({ name, address });
            await newCustomer.save();
            res.status(201).json({ message: "Customer created successfully", customer: newCustomer });
        } catch (error) {
            res.status(500).json({ error: "Error creating customer", details: error.message });
        }
    }
}

export default CustomerController;