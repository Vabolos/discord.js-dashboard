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

    // get most recent message sent
    const recentMessageContent = await queryDatabase('SELECT messageContent FROM messageinfo ORDER BY id DESC LIMIT 1');
    const recentMessageUser = await queryDatabase('SELECT userName FROM messageinfo ORDER BY id DESC LIMIT 1');

    // most recently banned user
    const recentBannedUser = await queryDatabase('SELECT userName FROM bans ORDER BY id DESC LIMIT 1');
    const recentBannedReason = await queryDatabase('SELECT reason FROM bans ORDER BY id DESC LIMIT 1');

    // most recently kicked user
    const recentKickedUser = await queryDatabase('SELECT userName FROM kicks ORDER BY id DESC LIMIT 1');
    const recentKickedReason = await queryDatabase('SELECT reason FROM kicks ORDER BY id DESC LIMIT 1');

    // most recently timed out user
    const recentTimedOutUser = await queryDatabase('SELECT userName FROM timeouts ORDER BY id DESC LIMIT 1');
    const recentTimedOutReason = await queryDatabase('SELECT reason FROM timeouts ORDER BY id DESC LIMIT 1');

    // most recently joined user
    const recentJoinedUser = await queryDatabase('SELECT userName FROM joins ORDER BY id DESC LIMIT 1');

    // get all upcomming items
    const upcommingItems = await queryDatabase('SELECT info FROM upcoming');
    const upcomingCount = await queryDatabase('SELECT COUNT(info) FROM upcoming');

    // Send a single response with all the data
    reply.send({
      messages: messagesCount,
      bans: bansCount,
      kicks: kicksCount,
      timeouts: timeoutsCount,
      recentMessage: recentMessageContent,
      recentMessageUser: recentMessageUser,
      recentBannedUser: recentBannedUser,
      recentBannedReason: recentBannedReason,
      recentKickedUser: recentKickedUser,
      recentKickedReason: recentKickedReason,
      recentTimedOutUser: recentTimedOutUser,
      recentTimedOutReason: recentTimedOutReason,
      recentJoinedUser: recentJoinedUser,
      upcomingItems: upcommingItems,
      upcomingCount: upcomingCount
    });
  } catch (error) {
    reply.status(500).send({ error: 'Something went wrong' });
  }
});

// Register cors
fastify.register(cors, {
  falseOrigin: true,
});

// Helper function to query the database with promise (keep data view the same)
const queryDatabase = (query) => {
  return new Promise((resolve, reject) => {
    dbConnection.query(query, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results[0][Object.keys(results[0])[0]]);
    });
  });
};

// start server
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