import dbConnect from "@/lib/mongodb";

export const GET = async () => {
    try {
        await dbConnect();
        return new Response(JSON.stringify({ message: 'Connected to MongoDB'}), { status: 200 });
    } catch (error) {
        console.log("error: ", error);
        return new Response(JSON.stringify({error: 'Database Connection failed'}), { status: 500 });
    }
};
