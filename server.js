/*const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Use a different port for your web server

// Connect to MongoDB (replace 'your-db-url' with your MongoDB URL)
mongoose.connect('mongodb://127.0.0.1/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Define a schema and model for your data (e.g., for storing names)
const nameSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  gender:String,
  email:String,
  phone:String,
  datetime:String

});

const Name = mongoose.model('Name', nameSchema);

// Parse JSON requests
app.use(bodyParser.json());

// Serve your HTML page (replace 'index.html' with your actual HTML file)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/customers.html');
});
// Handle form submissions
// Handle form submissions
app.post('/add', async function(req, res) {
  // Extract data from the request body
  const { firstName, lastName, gender, email, phone, datetime } = req.body;
  console.log(req.body);
  try {
    // Create a new Name document and save it to the database
    const newName = new Name({ first_name: firstName, last_name: lastName, gender: gender,email: email,phone: phone,datetime:datetime });
    await newName.save();
    console.log(newName)
    res.send('Data saved successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving data');
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
*/

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();
const port = 3002;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema and model for your data
const nameSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  gender: String,
  email: String,
  phone: String,
  datetime: Date,
});

const Name = mongoose.model('Name', nameSchema);

// Parse JSON requests
app.use(bodyParser.json());

// Serve your HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/customers.html');
});



app.get('/display', (req, res) => {
  res.sendFile(__dirname + '/display.html');
});

app.post('/add', async function (req, res) {
  // Extract data from the request body
  const { firstName, lastName, gender, email, phone, datetime } = req.body; // Destructure the properties from the request body
  console.log(req.body);
  try {
    // Create a new Name document and save it to the database
    const newName = new Name({
      first_name: firstName, // Use the correct property names
      last_name: lastName,
      gender: gender,
      email: email,
      phone: phone,
      datetime: datetime,
    });
    await newName.save();
    console.log(newName);
    
    res.send('Data saved successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving data');
  }
});


// Define a route to retrieve data from MongoDB and send it as JSON
app.get('/getData', async (req, res) => {
  try {
    // Retrieve data from MongoDB (you can add filters or sorting as needed)
    const data = await Name.find({});
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data');
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// ... (other code remains the same)
