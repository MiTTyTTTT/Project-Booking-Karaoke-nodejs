const express = require('express');
const axios = require('axios');
const methodOverride = require('method-override');
var bodyParser = require('body-parser');
const { render } = require('ejs');
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const base_url = "http://localhost:3000";

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/users', async (req, res) => {
    try {
        const response = await axios.get(base_url + '/users');
        res.render("Users", { users : response.data }); // Make sure 'users.ejs' exists
    } catch (error) {
        console.error(error);
        // Render an 'error.ejs' view if it exists, passing an error message
        res.status(500).render('error', { message: 'Server error while retrieving users' });
    }
});

app.get('/users/edit/:id', async (req,res) => {
    try{
        const response = await axios.get(base_url+'/users/'+req.params.id)
        res.render('edit_user',{'user' : response.data})
    }catch(err){
        res.status(500).render('error', { message: 'Server error while retrieving users' });
    }
})
app.post('/users/:id',async (req,res) => {
    try{
        const data = {Username:req.body.username, Password:req.body.password, Email:req.body.email, Phone:req.body.phone};
        await axios.put(base_url+'/user/'+req.params.id,data)
        res.redirect('/users')
    }catch(err){
        res.status(500).render('error', { message: 'Server error while retrieving users' });
    }
})
// Add a new user
app.post('/users', async (req, res) => {
    try {
        await Users.create(req.body);
        res.redirect('/users');
    } catch (error) {
        console.error(error);
        res.status(400).render('error', { message: 'Unable to create user' });
    }
});

// Delete a user
app.get('/users/delete/:id', async (req, res) => {
    try{
        await axios.delete(base_url+'/users/'+req.params.id);
        res.redirect("/users");
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});

app.get('/rooms', async (req,res) => {
        try{
            const response = await axios.get(base_url + '/rooms');
            res.render("Rooms", { rooms : response.data }); // 
        }catch(error){
            res.status(500).render('error', { message: 'Server error while retrieving rooms' });
        }
});

app.get('/bookings',async (req,res) => {
    try{
        const response = await axios.get(base_url + '/bookings')
        res.render('Bookings',{bookings : response.data})
    }catch(error){
        res.status(500).render('error', { message: 'Server error while retrieving bookings' });
    }
})

app.get('/paymentdetails',async (req,res) => {
    try{
        const response = await axios.get(base_url + '/paymentdetails')
        res.render("Payment",{"paymentDetails":response.data})
    }catch(err){
        res.status(500).render('error', { message: 'Server error while retrieving paymentdetails' });
    }
})
/////////////////////////////////////////////////////////////

app.listen(5500, () => {
    console.log('Server started on port 5500');
    });