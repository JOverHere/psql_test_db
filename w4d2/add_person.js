const settings = require("./settings"); // settings.json
var knex = require('knex')({
    client: 'pg',
    connection: {
        user: settings.user,
        password: settings.password,
        database: settings.database,
        host: settings.hostname,
        port: settings.port,
        ssl: settings.ssl
    }
});


const firstName = process.argv[2]
const lastName = process.argv[3]
const birthDate = process.argv[4]
//console.log('myArgs: ', name);


    knex('famous_people')
    .insert ({
        first_name: `${firstName}`,
        last_name: `${lastName}`,
        birthdate:  `${birthDate}`
    })
    .then( name => {
        console.log(`Inserted '${firstName}' '${lastName}' into database`)
        knex.destroy();
    })