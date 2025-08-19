const User = require('../models/Users');
const Hapi = require('@hapi/hapi');
const jwtToken = require('jsonwebtoken');
const bCrypt = require('bcrypt');

module.exports = [{
    method: ['GET', 'POST'],
    path: '/login/oauth2/google',
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
}, {
    method : ['GET', 'POST'],
    path : '/auth/login',
    handler : async function (request, reply){
        const {email, password} = request.payload; //maybe add some validation here
        if (!email || !password){
            return reply.response({message : "Email and Password are required", success : false}).code(400);
        }
        try{
            let user = await User.findOne({email : email});
            if (!user){
                console.error("User not found");
                return reply.response({message: "User not found", success: false}).code(404);
            }
            else{ //check if the password matches
                const isMatch = await bCrypt.compare(password, user.password);
                if (!isMatch){
                    console.error("Invalid password");
                    return reply.response({message : "Invalid password", success: false}).code(401);
                }
                else{
                    console.log("User authenticated successfully");
                    const payload = {
                            id: user._id,
                            name: user.user,
                            email: user.email,
                            oauthProvider: user.oauthProvider,
                            oauthID: user.oauthID
                        };
                    const token = jwtToken.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
                    console.log("User authenticated successfully");
                    return reply.response({message : "User authenticated successfully", success: true, token}).code(200);

                }
            }

        }

        catch (error) {
            console.error("Error during login:", error);
            return reply.response({ message: "An error occurred during login", success: false }).code(500);
        }
    }



}]
