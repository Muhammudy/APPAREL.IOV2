const Hapi = require('@hapi/hapi');
const Bell = require('@hapi/bell');

const main = require('./routes/main');
const oAuth2Routes = require('./routes/oAuth2Routes');

const connectDB = require('./config/db');
const {registerOAuth} = require('./auth/auth');



const init = async () => {
    connectDB(); // Connect to the database first


    const server = Hapi.server ({
        host : 'localhost',
        port : 3000
    });

    await server.start();
    await registerOAuth(server);
    server.route(main);
    server.route(oAuth2Routes)

    console.log(`Server running at: ${server.info.uri}`);

    
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
