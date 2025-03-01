import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
    console.log("Admin connected to WebSocket");

    ws.send(JSON.stringify({ message: "Connected to WebSocket server" }));

    ws.on('close', () => {
        console.log("Admin disconnected from WebSocket");
    });

    ws.on('error', (error) => {
        console.error("WebSocket error:", error);
    });
});

export const notifyAdmins = (order) => {
    const message = {
        message: "New order placed",
        order_id: order._id,
        customer: order.customer_id,
        sku: order.sku_id,
        total_amount: order.total_amount,
        timestamp: new Date().toISOString(),
    };

    wss.clients.forEach(client => {
        if (client.readyState === 1) {
            client.send(JSON.stringify(message));
        }
    });
};

console.log("WebSocket server running on ws://localhost:8080");