import Customer from '../models/Customer.Model.js';

const CustomerController = {
    createCustomer: async (req, res) => {
        try {
            const { name, address } = req.body;

            if (!name || !address) {
                return res.status(400).json({ error: "Bad Request: Missing required fields" });
            }

            const newCustomer = new Customer({
                name,
                address,
                user_id: req.user.userId
            });
            await newCustomer.save();
            res.status(201).json({ message: "Customer created successfully", customer: newCustomer });
        } catch (error) {
            res.status(500).json({ error: "Error creating customer", details: error.message });
        }
    },
    getCustomersByUserId: async (req, res) => {
        try {
            const { user_id } = req.params;
            const customers = await Customer.find({ user_id });

            if (customers.length === 0) {
                return res.status(404).json({ message: "No customers found for this user" });
            }

            res.status(200).json({ customers });
        } catch (error) {
            res.status(500).json({ error: "Error retrieving customers", details: error.message });
        }
    }
}

export default CustomerController;