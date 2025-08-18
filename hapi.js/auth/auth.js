

const Bell = require('@hapi/bell');
const Hapi = require('@hapi/hapi');
require('dotenv').config(); // Load environment variables

module.exports.registerOAuth = async function (server) {
    await server.register(Bell); //register bell plugin

    server.auth.strategy('google', 'bell', {
        provider : 'google',
        password : process.env.GOOGLE_PASSWORD,
        clientId : process.env.GOOGLE_CLIENT_ID, 
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        isSecure: false,
    });
}