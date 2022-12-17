const Joi = require('joi');

const schema = Joi.object({
    nome: Joi.string().min(3).max(30).required().messages({
        "string.min": "O nome deve ter pelo menos 3 caracteres",
        "string.max": "O nome deve ter no máximo 30 caracteres",
        "string.empty": "Nome não informado"
    }),
    password: Joi.string().min(3).max(30).required().messages({
        "string.min": "Password deve ter pelo menos 3 caracteres",
        "string.max": "Password deve ter no máximo 30 caracteres",
        "string.empty": "Password não informado"
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "Email não informado"
    })
});

const validate = (user) => {
    const result = schema.validate(user, {
        abortEarly: false
    });
    if (result.error) {
        return result.error;
    }
}

module.exports = { validate };