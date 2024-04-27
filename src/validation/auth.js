const z = require('zod');

const signupSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
});

const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});


module.exports = { signupSchema, signinSchema }