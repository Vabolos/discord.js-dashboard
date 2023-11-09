const fastify = require('fastify')({ logger: true })
const cors = require('@fastify/cors')
const dbConnection = require('./dbConnection.js');

fastify.get('/result', async (request, reply) => {
  try {
    // Get total sent messages
    const messagesCount = await queryDatabase('SELECT COUNT(messageId) FROM messageinfo');

    // Get total bans
    const bansCount = await queryDatabase('SELECT COUNT(userId) FROM bans');

    // Get total kicks
    const kicksCount = await queryDatabase('SELECT COUNT(userId) FROM kicks');

    // Get total timeouts
    const timeoutsCount = await queryDatabase('SELECT COUNT(userId) FROM timeouts');

    // Send a single response with all the data
    reply.send({
      messages: messagesCount,
      bans: bansCount,
      kicks: kicksCount,
      timeouts: timeoutsCount
    });
  } catch (error) {
    reply.status(500).send({ error: 'Something went wrong' });
  }
});

fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});

// Helper function to query the database with a promise
function queryDatabase(query) {
  return new Promise((resolve, reject) => {
    dbConnection.query(query, function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]['COUNT(messageId)'] || results[0]['COUNT(userId)']);
      }
    });
  });
}


const start = async () => {
  try {
    await fastify.listen({ port: 5000 })
    console.log(`\x1b[36mserver listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()