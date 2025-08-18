const mongoose = require('mongoose');
// Purpose: This file defines a Mongoose schema and model for a User collection in MongoDB.
const userSchema = new mongoose.Schema({
    user : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String, 
        required : false,
    },
    email: {
        type : String, 
        required : true,
        unique : true,
    },
    oauthProvider : {
        type : String,

    },
    oauthID : {
        type : String,
    },
    createdAt: {
        type: Date,
        efault: Date.now,
    }
});


// Purpose: This creates a Mongoose model called User based on the schema userSchema.

// Model = collection interface:

// Think of the model as a tool to interact with your MongoDB collection.

// With this User model, you can create, read, update, delete (CRUD) documents in the database.

// 'User' → Mongoose automatically pluralizes it to users as the collection name in MongoDB.

// So even though your model is called 'User', MongoDB will store the data in a collection called users.
const User = mongoose.model('User', userSchema);

module.exports = User;