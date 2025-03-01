import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

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
