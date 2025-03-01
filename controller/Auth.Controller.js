import User from "../models/User.Model.js";

const AuthController = {
    signup: async (req, res) => {
        try {
            const { username, password, role } = req.body;

            if (!username || !password) {
                return res.status(400).json({ error: "Username and password are required" });
            }

            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(409).json({ error: "User already exists" });
            }

            const newUser = new User({
                username,
                password,
                role: role || "user"
            });

            await newUser.save();
            res.status(201).json({ message: "User created successfully" });
        } catch (error) {
            res.status(500).json({ error: "Error creating user", details: error.message });
        }
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });

            if (!user || !(await user.comparePassword(password))) {
                return res.status(401).json({ error: "Invalid credentials" });
            }

            const token = user.generateAuthToken();

            res.json({ token, role: user.role });
        } catch (error) {
            res.status(500).json({ error: "Error logging in", details: error.message });
        }
    }
}

export default AuthController;