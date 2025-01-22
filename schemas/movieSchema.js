const moviesSchema = {
    type: "array",
    items: {
        type: "object",
        properties: {
            id: { type: "number" },
            name: { type: "string" },
            year: { type: "number" }
        },
        required: ["id", "name", "year"]
    }
};

const movieSchema = {
    "type": "object",
    "properties": {
        "id": { "type": "number" },
        "name": { "type": "string" },
        "year": { "type": "number" }
    },
    "required": ["id", "name", "year"]
};

module.exports = {
    moviesSchema,
    movieSchema
};