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


const name = process.argv[2];

const formatOutput = people =>
    people
    .map(({ id, first_name, last_name, birthdate }) => ` - ${id}: ${first_name} ${last_name}, born ${birthdate.toLocaleString().slice(0,-9)}`)
    .join("\n")

knex('famous_people')
    .where("first_name", "ILIKE", `${name}`)
    .orWhere("last_name", "ILIKE", `${name}`)
    .asCallback((err, people) => {
        if (err) throw err;
        console.log(`Found '${people.length}' person(s) by the name '${name}'`);
        console.log(formatOutput(people))
        knex.destroy()
    })

// knex('famous_people')
//   .where("first_name", "ILIKE", `${name}%`)
//   .orWhere("last_name", "ILIKE", `${name}%`)
//   .then( people => {
//     console.log(formatOutput(people))
//     knex.destroy()
//   })
//   .catch( err => { throw error})


// const runner = async () => {
//   try {
//     const people = await knex('famous_people')
//                           .where("first_name", "ILIKE", `${name}%`)
//                           .orWhere("last_name", "ILIKE", `${name}%`)
//     console.log(formatOutput(people))
//     knex.destroy()
//   } catch(err) {
//     throw err
//   }
// }
// runner()