const Hapi = require('@hapi/hapi');
const Bell = require('@hapi/bell');

const loginRoutes = require('./routes/loginRoutes');
const signUpRoutes = require('./routes/signUpRoutes');

const connectDB = require('./config/db');
const {registerOAuth} = require('./auth/auth');



const init = async () => {
    connectDB(); // Connect to the database first


    const server = Hapi.server ({
        host : 'localhost',
        port : 3000,
        routes : {
            cors: {
                origin : ['http://localhost:5173'], // Allow all origins
                credentials : true, // Allow credentials
            }
        }
    });

    await server.start();
    await registerOAuth(server);
    server.route(loginRoutes)
    server.route(signUpRoutes);

    console.log(`Server running at: ${server.info.uri}`);

    
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
