// app/lib/mongoose.js
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error("Veuillez définir l'URI MongoDB dans .env");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
        cached.promise = mongoose
            .connect(MONGO_URI, opts)
            .then((mongoose) => {
                console.log("Connecté à MongoDB");
                return mongoose;
            })
            .catch((error) => {
                console.error("Erreur de connexion à MongoDB", error);
                throw error;
            });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;
