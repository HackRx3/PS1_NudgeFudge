import RedisSMQ from "rsmq";

const rsmq = new RedisSMQ({
  host: "127.0.0.1",
  port: 6379,
  ns: "rsmq",
  realtime: true,
});

export const QueueService = () => {
  if (!process.env.QUEUE_NAME) throw Error("Queue name not provided");

  rsmq.listQueues(function (err, queues) {
    if (err) {
      console.error(err);
      return;
    }

    if (!queues.includes(process.env.QUEUE_NAME!)) {
      rsmq.createQueue(
        { qname: process.env.QUEUE_NAME! },
        function (err, resp) {
          if (err) {
            console.error(err);
            return;
          }

          if (resp === 1) {
            console.info("Queue created.");
          }
        }
      );
    }
  });
};
