const Store = require('../model/store');

// Create and save a new Store product
exports.create = (req, res) => {
    // Validate the request body
    if (!req.body) {
        return res.status(400).send({ message: 'The data cannot be empty' });
    }
    // Create a new instance of the Store model
    const Stores = new Store({
        name: req.body.name,
        location: req.body.location,
        openingTime: req.body.openingTime,
        closingTime: req.body.closingTime,
        image: req.body.image,
        description: req.body.description,
        
    });

    // Save the data in the database
    Stores
        .save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || 'An error occurred while creating the product Store' });
        });
};

// Retrieve and return all Stores / retrieve a single Store
exports.find = (req, res) => {
    // Implement code to retrieve Stores here 
    //this is the code to retrieve a single Store item using query parameter
    if (req.query.id) {
        const id = req.query.id
        //in case of url parameter will be using req.params.id
        Store.findById(id).then(data => {
            if (!data) {
                res.status(400).send({ message: `the Store item with id ${id} is not available` })
            } else {
                res.send(data)
            }
        })
            .catch(err => {
                res.status(500).send({ message: err.message || 'Error while finding the desired Store item' })

            })
    }
    //else code to find all the Store items
    else {
        Store.find()
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Ocuured while retriving user information" })
            })
    }

};

// Update the Stores by Store id
exports.update = (req, res) => {
    // Implement code to update Stores here
    if (!req.body) {
        return res.status(500).send({ message: 'Data to update cannot be empty' })
    }
    //In express there are two types of route parameters : query and url here we created a variable in url
    const id = req.params.id;
    Store.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(400).send({ message: `Cannot update the user with ${id} . Maybe user may not found` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "error in update Stores information" })
        })
};

