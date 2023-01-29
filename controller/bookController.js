const { getDb } = require("../database/mongodb");
const { ObjectId } = require("mongodb");
class BookController {
    static getBooks(req, res) {
        //current page
        const page = req.query.p || 0;
        const booksPerPage = 3;
        let books = [];
        const db = getDb();
        db.collection("books")
            .find() // returns a cursor which fetches the data in batches
            .sort({ author: 1 })
            .skip(page * booksPerPage)
            .limit(booksPerPage)
            .forEach(book => {
                books.push(book)
            })
            .then(() => {
                res.status(200).json(books);
            })
            .catch(() => {
                res.status(500).json({ err: "couldn't fetch document" })
            })
    }

    static getBook(req, res){
        const db = getDb();
        if (ObjectId.isValid(req.params.id)) {
            db.collection("books")
                .findOne({ _id: ObjectId(req.params.id) })
                .then(doc => {
                    res.status(200).json(doc)
                })
                .catch(err => {
                    res.status(500).json({ err: "not found" })
                })
        }
        else {
            res.status(500).json({ error: "not a valid book Id" })
        }
    }

    static addBook(req, res){
        const db = getDb();
        let book = req.body;
        db.collection("books")
            .insertOne(book)
            .then(result => {
                res.status(201).json(result)
            })
            .catch(err => res.status(500).json({ err: "couldnt create document" }))
    }

    static deleteBook(req, res){
        const db = getDb();
        if (ObjectId.isValid(req.params.id)) {
            db.collection("books")
                .deleteOne({ _id: ObjectId(req.params.id) })
                .then(result => {
                    res.status(200).json(result)
                })
                .catch(err => res.status(500).json({ err: "couldnt delete" }))
        }
        else {
            res.status(500).json({ err: "not a valid Id" });
        }
    }

    static updateBook(req, res){
        const db = getDb();
        const updates = req.body;
        if (ObjectId.isValid(req.params.id)) {
            db.collection("books")
                .updateOne({ _id: ObjectId(req.params.id) }, { $set: updates })
                .then(result => {
                    res.status(200).json(result)
                })
                .catch(err => {
                    res.status(500).json({ err: "couldnt delete" })
                })
        }
        else {
            res.status(500).json({ err: "book id not valid" })
        }
    }
}

module.exports = BookController;
