const Hapi = require('@hapi/hapi');

const main = require('./routes/main');



const init = async () => {


    const server = Hapi.server ({
        host : 'localhost',
        port : 3000
    });

    await server.start();
    server.route(main);

    
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();