import { config as dotenvConfig } from "dotenv";
import { QueueService } from "./services/queue.service";

dotenvConfig();
QueueService();
