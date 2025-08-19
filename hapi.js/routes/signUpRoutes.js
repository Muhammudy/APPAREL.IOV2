const User = require('../models/Users');
const Hapi = require('@hapi/hapi');
const jwtToken = require('jsonwebtoken');
const bCrypt = require('bcrypt');
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
            let user = await User.findOne({ oauthID: profile.id });
            console.log(profile.email);

            // Create new user if not found
            if (!user) {
                user = await new User({
                    user: profile.displayName,
                    email: profile.email,
                    oauthProvider: profile.provider,
                    oauthID: profile.id,
                    password: null
                }).save();

                console.log("New user created");
            }

            // JWT payload
            const payload = {
                id: user._id,
                name: user.user,
                email: user.email,
                oauthProvider: user.oauthProvider,
                oauthID: user.oauthID
            };

            const token = jwtToken.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
            console.log("User authenticated successfully");

            return reply.redirect(`http://localhost:5173/oauth/callback?token=${token}`);

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
        const {email, password} = request.payload;
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
}
];
