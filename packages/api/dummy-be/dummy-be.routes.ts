import {
  PushToQueue,
  QueueService,
  ReceiveFromQueue,
} from "../services/queue.service";

QueueService();
// PushToQueue("hli");
ReceiveFromQueue();
