const Hapi = require('@hapi/hapi');
const Bell = require('@hapi/bell');

const main = require('./routes/main');

const connectDB = require('./config/db');
const {registerOAuth} = require('./auth/auth');



const init = async () => {
    connectDB(); // Connect to the database first


    const server = Hapi.server ({
        host : 'localhost',
        port : 3000
    });

    await server.start();
    server.route(main);
    registerOAuth(server);

    console.log(`Server running at: ${server.info.uri}`);

    
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
