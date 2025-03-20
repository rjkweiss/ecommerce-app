import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { ObjectId } from "mongodb";

export const GET = async (req, { params }) => {
    await dbConnect();

    // await params
    const id = params?.id;

    if (!id || !ObjectId.isValid(id)) {
        return new Response(JSON.stringify({ error: 'Invalid ID'}), { status: 400 });
    }

    const product = await Product.findById(id).lean();
    if (!product) {
        return new Response(JSON.stringify({ error: 'Product Not Found' }), { status: 404 });
    }

    return new Response(JSON.stringify(product), { status: 200 });
};
