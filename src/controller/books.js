const { createSchema , updateSchema } = require('../validation/book');
const mongoose = require('../db/mongo');
const slugify = require('slugify');
const { verifyJwt } = require('../helper/jwt');


const bookSchema = new mongoose.Schema({
    b_name: String,
    b_author: String,
    slug: String, 
    user: Number
});

bookSchema.pre('save', function(next) {
    this.slug = slugify(this.b_name, { lower: true });
    next();
});

const bookTable = mongoose.model('Books', bookSchema);

class Book {
    async create(req, res) {
        
            // Extract JWT token from request headers
            const token = req.headers.authorization;
            if (!token) {
                return res.status(401).send({ error: "Authorization token missing." });
            }
    
            // Verify JWT token
            const decodedToken = verifyJwt(token.split(' ')[1]); // Remove 'Bearer ' prefix
    
            if (!decodedToken || !decodedToken.data || !decodedToken.data.id) {
                return res.status(401).send({ error: "Invalid token or user ID missing." });
            }
    
            // Extract book data from request body
            const { b_name, b_author } = createSchema.parse(req.body);
    
            // Create new book instance
            const data = new bookTable({ b_name, b_author, user: decodedToken.data.id });
    
            // Save book to database
            await data.save();
    
            // Send success response
            res.status(201).send({ data });
        
    }
    

    async getAll(req, res) {
        try {
            const books = await bookTable.find();
            res.send({ books });
        } catch (error) {
            console.error("Error fetching books:", error);
            res.status(500).send({ error: "Failed to fetch books." });
        }
    }

    async getBySlug(req, res) {
        const { slug } = req.params;
        try {
            const book = await bookTable.findOne({ slug });
            if (!book) {
                return res.status(404).send({ error: "Book not found." });
            }
            res.send({ book });
        } catch (error) {
            console.error("Error fetching book by slug:", error);
            res.status(500).send({ error: "Failed to fetch book." });
        }
    }

    async getById(req, res) {
        const { id } = req.params;
        try {
            const book = await bookTable.findById(id);
            if (!book) {
                return res.status(404).send({ error: "Book not found." });
            }
            res.send({ book });
        } catch (error) {
            console.error("Error fetching book by ID:", error);
            res.status(500).send({ error: "Failed to fetch book." });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        try {
            const { b_name, b_author } = updateSchema.parse(req.body);
            const updatedBook = await bookTable.findByIdAndUpdate(id, { b_name, b_author }, { new: true });
            if (!updatedBook) {
                return res.status(404).send({ error: "Book not found." });
            }
            res.send({ updatedBook });
        } catch (error) {
            console.error("Error updating book:", error);
            res.status(500).send({ error: "Failed to update book." });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        try {
            const deletedBook = await bookTable.findByIdAndDelete(id);
            if (!deletedBook) {
                return res.status(404).send({ error: "Book not found." });
            }
            res.send({ message: "Book deleted successfully." });
        } catch (error) {
            console.error("Error deleting book:", error);
            res.status(500).send({ error: "Failed to delete book." });
        }
    }
}

module.exports = new Book();