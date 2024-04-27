const z = require('zod');

const createSchema = z.object({
    b_name: z.string().min(3),
    b_author: z.string().min(3),
});

const updateSchema = z.object({
    b_name: z.string().min(3),
    b_author: z.string().min(3),
});


module.exports = { createSchema, updateSchema}