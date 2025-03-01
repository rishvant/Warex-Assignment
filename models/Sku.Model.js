import mongoose from 'mongoose';

const skuSchema = new mongoose.Schema({
    sku_name: {
        type: String,
        required: true,
        unique: true
    },
    unit_of_measurement: {
        type: String,
        required: true
    },
    tax_rate: {
        type: Number,
        required: true
    }
});

const SKU = mongoose.model('SKU', skuSchema);
export default SKU; 