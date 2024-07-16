import Fastify from 'fastify';

const server = Fastify({
  logger: true,
});

server.get('/', async (request, reply) => {
  reply.send({ hello: 'world' });
});

server.listen({ port: 3000 }, function (error, address) {
  if (error) {
    server.log.error(error);
    process.exit(1);
  }

  server.log.info(`server listening on ${address}`);
})