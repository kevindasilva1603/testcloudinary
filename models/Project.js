// app/models/Project.js
import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
    {
        titre: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        texte: {
            type: String,
            required: true,
        },
        description_seo: {
            type: String,
        },
        title_seo: {
            type: String,
        },
        imageUrl: {
            type: String,
            required: true, // Assurez-vous que ce champ est présent
        },
    },
    { timestamps: true }
);

export default mongoose.models.Project ||
    mongoose.model("Project", ProjectSchema);
