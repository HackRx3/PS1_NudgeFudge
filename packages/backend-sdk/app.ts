import { config as dotenvConfig } from "dotenv";

import {
  PushToQueue,
  QueueService,
  ReceiveFromQueue,
} from "./services/queue.service";

dotenvConfig();

QueueService();
// PushToQueue("hli");
ReceiveFromQueue();
