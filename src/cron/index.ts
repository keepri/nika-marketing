import { Elysia } from "elysia";

import { IS_PRODUCTION } from "@/config";

import { DB_SYNC_CRON, dbSyncCron } from "./db-sync";
import { registerCron } from "./lib";

export const cronJobs = new Elysia({ name: "CronJobs" });

cronJobs.use(
    registerCron(DB_SYNC_CRON, dbSyncCron, { disabled: !IS_PRODUCTION }),
);
