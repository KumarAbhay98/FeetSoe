const Shoe = require('../model/model');

// Create and save a new shoe product
exports.create = (req, res) => {
    // Validate the request body
    if (!req.body) {
        return res.status(400).send({ message: 'The data cannot be empty' });
    }
    // Create a new instance of the Shoe model
    const shoes = new Shoe({
        name: req.body.name,
        category: req.body.category,
        image: req.body.image,
        price: req.body.price, // Corrected from req.body.category to req.body.price
        excerpt: req.body.excerpt,
        description: req.body.description,
    });

    // Save the data in the database
    shoes
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
    //this is the code to retrieve a single shoe item using query parameter
    if (req.query.id) {
        const id = req.query.id
        //in case of url parameter will be using req.params.id
        Shoe.findById(id).then(data => {
            if (!data) {
                res.status(400).send({ message: `the shoe item with id ${id} is not available` })
            } else {
                res.send(data)
            }
        })
            .catch(err => {
                res.status(500).send({ message: err.message || 'Error while finding the desired shoe item' })

            })
    }
    //else code to find all the shoe items
    else {
        Shoe.find()
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Ocuured while retriving user information" })
            })
    }

};

// Update the shoes by shoe id
exports.update = (req, res) => {
    // Implement code to update shoes here
    if (!req.body) {
        return res.status(500).send({ message: 'Data to update cannot be empty' })
    }
    //In express there are two types of route parameters : query and url here we created a variable in url
    const id = req.params.id;
    Shoe.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

// Delete a shoe with a specified shoe id
exports.delete = (req, res) => {
    // Implement code to delete a shoe here
    const id = req.params.id
    Shoe.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(400).send({ message: `cannot delete the shoe item with id ${id} may be id wrong` })
            } else {
                res.send("the shoe item is deleted successfully")
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || 'Error while deleting the shoe item' })
        })
};
