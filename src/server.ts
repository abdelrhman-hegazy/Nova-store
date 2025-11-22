
import mongoose from "mongoose";
import config from "./app/shared/config";
import app from "./app";

export async function main() {
    await mongoose.connect(config.MONGO_URI as string);
    const server = app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    });
    return server;
}

main().catch(console.error);



