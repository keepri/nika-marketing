import { staticPlugin } from "@elysiajs/static";
import { Elysia, type ElysiaConfig } from "elysia";

import { APP_NAME, IS_PRODUCTION, env, initCors, staticDir } from "@/config";
import { cronJobs } from "@/cron";

import { apiRoutes, pagesRoutes } from "./routes";

const APP_CONFIG = Object.freeze({
    name: APP_NAME,
    serve: {
        hostname: env.HOST,
        port: env.PORT,
        development: !IS_PRODUCTION,
        maxRequestBodySize: 1024 * 1024 * 4, // 4mb
    },
} satisfies ElysiaConfig);

export const app = new Elysia(APP_CONFIG)
    .use(initCors())
    .use(staticPlugin({ prefix: staticDir(), assets: "static" }))
    .use(cronJobs)
    .use(apiRoutes)
    .use(pagesRoutes)
    .onError(function onError(ctx) {
        const status: number = "status" in ctx.error ? ctx.error.status : 500;
        const message = ctx.error.message || "Something went wrong.";
        return new Response(message, {
            status,
            statusText:
                "code" in ctx.error ? ctx.error.code : "Internal Server Error",
        });
    })
    .onStart(function onStart(app) {
        const server = app.server;
        if (server === null) {
            return;
        }

        const appName = app.config.name;
        const protocol = server.url.protocol;
        const hostname = server.hostname;
        const port = server.port;
        const nodeEnv = env.NODE_ENV;
        console.log(
            `🚀 ${appName} is running on ${protocol}//${hostname}:${port} in ${nodeEnv} mode.`,
        );
    });
