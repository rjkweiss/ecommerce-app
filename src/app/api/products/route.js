import { faker } from "@faker-js/faker";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";


// get method
export const GET = async () => {
    try {
        await dbConnect();

        // retrieve products from db
        const products = await Product.find();

        // if no products, generate fake ones and seed db
        if (products.length === 0) {
            for (let i = 0; i < 10; i++) {
                await new Product({
                    name: faker.commerce.productName(),
                    description: faker.commerce.productDescription(),
                    price: faker.commerce.price(),
                    image: faker.image.urlLoremFlickr({ category: 'products'}),
                    category: faker.commerce.department()
                }).save();
            }
        }

        return new Response(JSON.stringify(await Product.find()), { status: 200 });
    } catch(err) {
        console.log(err);
        return new Response(JSON.stringify({ message: 'Error fetching products'}), { status: 500 });
    }
};

// post method
export const POST = async (req) => {
    try {
        await dbConnect();
        const { name, description, price, image, category } = await req.json();
        const newProduct = new Product({ name, description, price, image, category});
        await newProduct.save();
        return new Response(JSON.stringify(newProduct, { status: 201 }));
    } catch(err) {
        return new Response(JSON.stringify({ message: 'Error adding product'}), { status: 500 });
    }
};
