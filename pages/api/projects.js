// /pages/api/projects.js
import dbConnect from "@/lib/mongoose";
import Project from "@/models/Project";

export default async function handler(req, res) {
    const { method, body } = req;

    await dbConnect();

    switch (method) {
        case "POST":
            try {
                console.log("Requête POST reçue avec les données :", body);
                const project = await Project.create(body); // créer un projet
                res.status(201).json({ success: true, data: project });
            } catch (error) {
                console.error("Erreur lors de la création du projet:", error);
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        case "GET":
            try {
                console.log("Requête GET reçue");
                const projects = await Project.find({}); // Récupère tous les projets
                res.status(200).json({ success: true, data: projects });
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des projets:",
                    error
                );
                res.status(400).json({
                    success: false,
                    error: "Impossible de récupérer les projets",
                });
            }
            break;

        default:
            res.status(405).json({
                success: false,
                error: "Méthode non autorisée",
            });
            break;
    }
}
