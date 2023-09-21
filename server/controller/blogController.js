const Blog = require('../model/blogs');

// Create and save a new blogproduct
exports.create = (req, res) => {
    // Validate the request body
    if (!req.body) {
        return res.status(400).send({ message: 'The data cannot be empty' });
    }
    // Create a new instance of the blog model
    const blogs = new Blog({
        title: req.body.title,
        author: req.body.author,
        date: req.body.date,
        image: req.body.image,
        excerpt: req.body.excerpt,
        description: req.body.description,
        slug: req.body.slug,
    });

    // Save the data in the database
    blogs
        .save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || 'An error occurred while creating the product shoe' });
        });
};

// Retrieve and return all shoes / retrieve a single shoe
exports.find = (req, res) => {
    // Implement code to retrieve shoes here 
    //this is the code to retrieve a single blog item using query parameter
    if (req.query.id) {
        const id = req.query.id
        //in case of url parameter will be using req.params.id
        Blog.findById(id).then(data => {
            if (!data) {
                res.status(400).send({ message: `the blog item with id ${id} is not available` })
            } else {
                res.send(data)
            }
        })
            .catch(err => {
                res.status(500).send({ message: err.message || 'Error while finding the desired blog item' })

            })
    }
    //else code to find all the blog items
    else {
        Blog.find()
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Ocuured while retriving user information" })
            })
    }

};

// Update the shoes by blog id
exports.update = (req, res) => {
    // Implement code to update shoes here
    if (!req.body) {
        return res.status(500).send({ message: 'Data to update cannot be empty' })
    }
    //In express there are two types of route parameters : query and url here we created a variable in url
    const id = req.params.id;
    Blog.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(400).send({ message: `Cannot update the user with ${id} . Maybe user may not found` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "error in update shoes information" })
        })
};

// Delete a blog with a specified blog id
exports.delete = (req, res) => {
    // Implement code to delete a blog here
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(400).send({ message: `cannot delete the blog item with id ${id} may be id wrong` })
            } else {
                res.send("the blog item is deleted successfully")
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || 'Error while deleting the blogitem' })
        })
};
