const User = require('../models/user');
const Hapi = require('@hapi/hapi');
const jwtToken = require('jsonwebtoken');

module.exports = {
    method: ['GET', 'POST'],
    path: '/login',
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

            const profile = request.auth.credentials.profile;

            // Check if user exists
            let user = await User.findOne({ oauthID: profile.id });

            // Create new user if not found
            if (!user) {
                user = await new User({
                    user: profile.displayName,
                    email: profile.emails[0].value,
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

            return reply.response({ message: 'Login successful', token, user: payload }).code(200);
        }
    }
};
