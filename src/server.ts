
import mongoose from "mongoose";
import config from "./app/shared/config";
import app from "./app";

async function main() {
    await mongoose.connect(config.MONGO_URI as string)
    app.listen(config.port)
}

main().then(() => console.log(`Running Server on Port ${config.port}...`)
).catch(error => console.log(error))
