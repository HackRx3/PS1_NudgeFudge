import { config as dotenvConfig } from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import { join } from "path";

import { errorHandler } from "./error/error.handler";
import { DatabaseService } from "./services/database.service";
import nudgeRouter from "./nudge/nudge.routes";

dotenvConfig();

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/nudge", nudgeRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(join(__dirname, "..", "client", "out")));
  app.use("*", (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendFile(join(__dirname, "..", "client", "out", "index.html"));
    } catch (err) {
      next(err);
    }
  });
} else if (process.env.NODE_ENV === "maintenance") {
  app.use("*", (_req: Request, res: Response) => {
    res.status(503).sendFile(join(__dirname, "..", "templates", "503.html"));
  });
} else {
  app.use("*", (req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      error: `Cannot ${req.method} ${req.originalUrl}`,
    });
  });
}

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
