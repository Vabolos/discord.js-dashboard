const fastify = require('fastify')({ logger: true })
const dbConnection = require('../dbConnection.js');

// get total sent messages
fastify.get('/result', async (request, reply) => {
  dbConnection.query('SELECT COUNT(message) FROM messageInfo', (error, results) => {
    if (error) {
      console.error('Error executing select query:', error);
      reply.send({ error: 'Error executing select query' });
      return;
    }
    const count = results[0]['COUNT(message)'];
    const responseData = { count };
    reply.send(responseData);
  });
})

// get total bans
fastify.get('/result', async (request, reply) => {
  dbConnection.query('SELECT COUNT(userId) FROM bans', (error, results) => {
    if (error) {
      console.error('Error executing select query:', error);
      reply.send({ error: 'Error executing select query' });
      return;
    }
    const count = results[0]['COUNT(userId)'];
    const responseData = { count };
    reply.send(responseData);
  });
})

// get total timeouts
fastify.get('/result', async (request, reply) => {
  dbConnection.query('SELECT COUNT(userId) FROM timeouts', (error, results) => {
    if (error) {
      console.error('Error executing select query:', error);
      reply.send({ error: 'Error executing select query' });
      return;
    }
    const count = results[0]['COUNT(userId)'];
    const responseData = { count };
    reply.send(responseData);
  });
})

// get total kicks
fastify.get('/result', async (request, reply) => {
  dbConnection.query('SELECT COUNT(userId) FROM kicks', (error, results) => {
    if (error) {
      console.error('Error executing select query:', error);
      reply.send({ error: 'Error executing select query' });
      return;
    }
    const count = results[0]['COUNT(userId)'];
    const responseData = { count };
    reply.send(responseData);
  });
})

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