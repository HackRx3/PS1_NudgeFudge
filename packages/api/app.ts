import { config as dotenvConfig } from "dotenv";
import express, { Express } from "express";
import cors from "cors";

import { errorHandler } from "./error/error.handler";
import { DatabaseService } from "./services/database.service";
import { QueueService } from "./services/queue.service";
import nudgeRouter from "./nudge/nudge.routes";
import projectRouter from "./project/project.routes";
import adminRoutes from "./admin/admin.routes";
import dummyRoutes from "./dummy-be/dummy-be.routes";

dotenvConfig();

const app: Express = express();
QueueService();

app.use(express.json());
app.use(cors());

app.use("/api/v1/nudge", nudgeRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/dummy", dummyRoutes);

app.use(errorHandler);

Promise.all([DatabaseService.getInstance().initialize()])
  .then(() => {
    app.listen(process.env.PORT!, () => {
      console.info(
        `Server:${
          process.env.NODE_ENV === "production" ? "production" : "development"
        } Listening for Requests on Port ${process.env.PORT}`
      );
    });
  })
  .catch((_) => {
    process.exit(1);
  });

process.on("SIGHUP", (_) => {
  process.exit(0);
});
process.on("SIGINT", (_) => {
  process.exit(0);
});
