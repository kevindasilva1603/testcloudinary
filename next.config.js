const path = require("path");

module.exports = {
    webpack: (config) => {
        config.resolve.alias["@"] = path.resolve(__dirname, ".");
        return config;
    },
    images: {
        domains: ["res.cloudinary.com", "random.imagecdn.app"], // Ajoutez res.cloudinary.com ici
    },
};
