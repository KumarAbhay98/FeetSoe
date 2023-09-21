const express = require('express')
const route = express.Router()
const controller = require('../controller/controller')
const authController = require('../controller/authController')
const storeController = require('../controller/storeController')
const blogController = require('../controller/blogController')
const axios = require('axios')//now we gonna be using axios to connect our api with the appliction
const cookieParser = require('cookie-parser');//cookie parser
const { requireAuth, checkUser } = require('../middleware/authMiddleware');//we are importing the middleware 

//we gonna apply the checkuser middleware to every route which has get request in order to render conditional data , by this we can render the data of user by injecting in views
route.use(cookieParser());
route.get('*', checkUser);

//getting data from api on inde.js
route.get('/', (req, res) => {
    axios.get('http://localhost:3000/api/shoes')
        .then(response => {
            res.render('index', { shoes: response.data });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('An error occurred');
        });
});

// Define a route for the fashion page, requireAuth is a middleware to check if user is login then allow it to acess the page
route.get('/fashion', requireAuth, async (req, res) => {
    try {
        // Make a request to fetch all shoe data from the API
        const apiResponse = await axios.get('http://localhost:3000/api/shoes');
        const shoes = apiResponse.data;
        // Render the fashion page with all shoe data
        res.render('fashionPage', { shoes });
    } catch (err) {
        console.error(err);
        // Handle the error appropriately
        res.status(500).send('An error occurred');
    }
});



// viewProduct
route.get('/viewProduct/:slug', requireAuth, (req, res) => {
    axios.get('http://localhost:3000/api/shoes')
        .then(response => {
            // Assuming response.data is an array of shoes
            const shoes = response.data;

            // Use find() instead of filter() to find a single shoe by slug
            const myShoe = shoes.find(shoe => shoe.slug === req.params.slug);
            if (!myShoe) {
                // Handle case where no matching shoe is found
                res.status(404).send('Shoe not found');
                return;
            }

            // console.log(myShoe)
            res.render('viewProduct', {
                // Pass the data of the found shoe to the template
                name: myShoe.name,
                category: myShoe.category,
                image: myShoe.image,
                price: myShoe.price,
                excerpt: myShoe.excerpt,
                description: myShoe.description,
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('An error occurred');
        });
});



//routes of authentication
route.get('/signup', authController.signup_get);
route.post('/signup', authController.signup_post);
route.get('/login', authController.login_get);
route.post('/login', authController.login_post);
route.get('/logout', authController.logout_get);


//routes for shoes
//first api route for creating anew product , using post method(route path of post request)
route.post('/api/shoes', controller.create);
//for retrieving the informartion we use get method
route.get('/api/shoes', controller.find);
//for updating the product we use put method and provide a parameter called id 
route.put('/api/shoes/:id', controller.update);
//we use http method called delete to delete any product using the product id
route.delete('/api/shoes/:id', controller.delete);


//store routes
route.post('/store', storeController.create);
route.get('/store', storeController.find); 

//blogs routes
route.post('/blog', blogController.create);
route.get('/blog', blogController.find); 




route.get('/pricing', (req, res) => {
    res.render('pricingPage')
})
route.get('/outlets', (req, res) => {
    axios.get('http://localhost:3000/store')
        .then(response => {
            res.render('outletsPage', { stores: response.data });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('An error occurred');
        });
});


route.get('/blogs', (req, res) => {
    axios.get('http://localhost:3000/blog')
        .then(response => {
            res.render('blogsPage', { blogs: response.data });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('An error occurred');
        });
});
// viewProduct
route.get('/blogsViewPage/:slug', requireAuth, (req, res) => {
    axios.get('http://localhost:3000/blog')
        .then(response => {
            // Assuming response.data is an array of shoes
            const blogs = response.data;

            // Use find() instead of filter() to find a single blog by slug
            const myBlog = blogs.find(blog => blog.slug === req.params.slug);
            if (!myBlog) {
                // Handle case where no matching shoe is found
                res.status(404).send('Blog not found');
                return;
            }

            // console.log(myShoe)
            res.render('blogsViewPage', {
                // Pass the data of the found shoe to the template
                title: myBlog.title,
                author:  myBlog.author,
                date:  myBlog.date,
                image:  myBlog.image,
                excerpt:  myBlog.excerpt,
                description:  myBlog.description,
                slug:  myBlog.slug,
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('An error occurred');
        });
});

route.get('/about', (req, res) => {
    res.render('aboutPage')
})
route.get('/cart',requireAuth,(req,res)=>{
    res.render('cartPage')
})
route.get('/checkout',requireAuth,(req,res)=>{
    res.render('checkoutPage')
})

route.get('/profiles', requireAuth, (req, res) => {
    res.render('profilePage')
})


module.exports = route