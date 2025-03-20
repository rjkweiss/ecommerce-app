import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            require: true
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
    },
    // automatically store createdAt and updatedAt
    {
        timestamps: true
    }
);

// prevent duplicate models
export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
