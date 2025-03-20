import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

const ProductPage = async ({ params }) => {
    await dbConnect();

    const { id } = params;

    const product = await Product.findById(id).lean();

    if (!product) {
        return <h1>Product Not Found</h1>
    }

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "100%", height: "auto" }}
          />
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> ${product.price}</p>
        </div>
      );
};

export default ProductPage;
