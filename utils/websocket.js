import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import User from "../models/User.Model.js";
import dotenv from "dotenv";

dotenv.config();

const io = new Server(8080, {
    cors: {
        origin: "*",
    },
});

const adminSockets = new Map();

io.on("connection", async (socket) => {
    const token = socket.handshake.headers.authorization?.split(" ")[1];

    if (!token) {
        console.log("Unauthorized connection attempt (No token)");
        socket.disconnect();
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user || user.role !== "admin") {
            console.log(`User ${user?.username || "Unknown"} is not an admin`);
            socket.disconnect();
            return;
        }

        console.log(`Admin ${user.username} connected`);
        adminSockets.set(socket.id, socket);

        socket.emit("message", { message: "Connected as Admin" });

        socket.on("disconnect", () => {
            console.log(`Admin ${user.username} disconnected`);
            adminSockets.delete(socket.id);
        });

    } catch (error) {
        console.log("Invalid or expired token");
        socket.disconnect();
    }
});

export const notifyAdmins = (order) => {
    const message = {
        message: "New order placed",
        order_id: `${order.order_id}`,
        user: order.user_id,
        customer: order.customer_id,
        sku: order.sku_id,
        total_amount: order.total_amount,
        timestamp: new Date().toISOString(),
    };

    adminSockets.forEach((socket) => {
        socket.emit("orderNotification", message);
    });

    console.log("Sent notification to all admins:", message);
};

console.log("Socket.IO server running on port 8080");