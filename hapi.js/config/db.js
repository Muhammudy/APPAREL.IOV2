const mongoose = require('mongoose');
const User = require('../models/Users'); // Import the User model

const connectDB = async () => {
	try{
		await mongoose.connect('mongodb://localhost:27017/mydatabase', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			maxPoolSize: 2,
			serverSelectionTimeoutMS: 5000,
		});
		await User.init();
		console.log("Connected to MongoDB successfully");
	}

	catch(error){
		console.error(`Error connecting to the database:`, error.message);
		process.exit(1);


	}

};

module.exports = connectDB;
