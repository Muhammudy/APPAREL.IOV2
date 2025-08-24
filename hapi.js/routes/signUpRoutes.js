const User = require('../models/Users');
const Hapi = require('@hapi/hapi');
const jwtToken = require('jsonwebtoken');
const bCrypt = require('bcrypt');
const { options } = require('joi');
require('dotenv').config();
module.exports = [{
    method: ['GET', 'POST'],
    path: '/signup/oauth2/google',
    options: {
        auth: {
            mode: 'try',
            strategy: 'google'
        },
        handler: async function (request, reply) {
            if (!request.auth.isAuthenticated) {
                console.error("Authentication failed:", request.auth.error?.message);
                return reply.response({
                    message: 'Authentication failed',
                    error: request.auth.error?.message
                }).code(401);
            }

            try{
                const profile = request.auth.credentials.profile;

            // Check if user exists
            let user = await User.findOne({ email : profile.email });

            // Create new user if not found
            if (!user) {
                user = await new User({
                    user: profile.displayName,
                    email: profile.email,
                    oauthProvider: 'google',
                    oauthID: profile.id,
                    password: null
                }).save();

                console.log("New user created");
            }
            else if (user.oauthProvider != 'google'){ //throw an error because there already exists a user with the same email
                console.log("User already exists with that email");
                return reply.redirect(`${process.env.FRONT_END_BASE_URL}/login?error=account_exists&provider=${user.oauthProvider}`);


            }

            // JWT payload  
            const payload = {
                user: {
                    id: user._id,
                    name: user.user,
                    email: user.email,
                    oauthProvider: user.oauthProvider,
                    oauthID: user.oauthID

                },
            };

            const token = jwtToken.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
            console.log("User authenticated successfully");

            return reply.redirect(`${process.env.FRONT_END_BASE_URL}/oauth/callback?token=${token}`);

            }
            catch (error){
                console.error("Error during authentication:", error);
                return reply.response({
                    message: 'Authentication failed',
                    error: error.message
                }).code(500);
            }


        }
    }
},{


method: ['GET', 'POST'],
path: '/auth/signup',
handler : async (request, reply) => {
    try { 
        //first we need to check if the user already exists
        const {email, password} = request.payload; //maybe add some validation here
        console.log("Received signup request:", request.payload);
        let user = await User.findOne({email : email});
        if(user) {
            return reply.response({message :"User already exists", success : false}).code(409);
        }
        else{
            user = new User({
                user : request.payload.email,
                email: request.payload.email,
                password : await bCrypt.hash(request.payload.password, 10),

            })
            await user.save();
            return reply.response({message : "User created successfully", success: true}).code(201);
        }


    }
    catch(error){
        console.error("Error during user signup:", error);
        return reply.response({message : "An error occurred while processing your request", success : false}).code(500);

    }
}
},
{
    method: ['GET', 'POST'],
    path : '/signup/oauth2/discord',
    options : {
        auth: 'discord',
        handler : async function (request, reply) {
            console.log("WITHIN DISCORD PATH");
            if(!request.auth.isAuthenticated){
                console.error("Authentication failed:", request.auth.error?.message);
                return reply.response({
                    message: 'Authentication failed',
                    error: request.auth.error?.message
                }).code(401);

            }
            try{
            const credentials = request.auth.credentials;


            const profile = credentials.profile;
            console.log("Profile:", profile);
            // Check if user exists
            let user = await User.findOne({ email : profile.email });
            console.log(profile.email);
            console.log("user", user);

            // Create new user if not found
            if (!user) {
                user = await new User({
                    user: profile.username,
                    email: profile.email,
                    oauthProvider: 'discord',
                    oauthID: profile.id,
                    password: null
                }).save();

                console.log("New user created");
            }
            else if (user.oauthProvider != 'discord'){ //throw an error because there already exists a user with the same email
                console.log("User already exists with that email");
                return reply.redirect(`${process.env.FRONT_END_BASE_URL}/login?error=account_exists&provider=${user.oauthProvider}`);


            }

            // JWT payload
            const payload = {
                user: {
                    id: user._id,
                    name: user.user,
                    email: user.email,
                    oauthProvider: user.oauthProvider,
                    oauthID: user.oauthID

                },
            };

            const token = jwtToken.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
            console.log("User authenticated successfully");

            return reply.redirect(`${process.env.FRONT_END_BASE_URL}/oauth/callback?token=${token}`); //send back the token

            }
            catch (error){
                console.error("Error during authentication:", error);
                return reply.response({
                    message: 'Authentication failed',
                    error: error.message
                }).code(500);
            }

            
        },
    }
}
];
