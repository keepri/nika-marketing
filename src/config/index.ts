import { cors } from "@elysiajs/cors";
import { type HtmlOptions, html } from "@elysiajs/html";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const APP_NAME = "NIKA" as const;
const STATIC_DIR = "static" as const;
// when changing this, also change package.json `start` script
const OUT_DIR = ".out" as const;
export const DB_DIR = ".db-data" as const;

export function staticDir(path: string = ""): string {
    const out = STATIC_DIR + path;
    return out;
}

export function buildDir(path: string = ""): string {
    const out = OUT_DIR + path;
    return out;
}

export const env = createEnv({
    isServer: true,
    // leave this as `process.env`
    runtimeEnv: process.env,
    emptyStringAsUndefined: true,
    server: {
        // server
        NODE_ENV: z.enum(["development", "production"]),
        HOST: z.string().min(1).optional().default("127.0.0.1"),
        PORT: z.coerce.number().optional().default(42069),
        // TODO remove .optional() when using GitHub OAuth
        GITHUB_CLIENT_ID: z.string().min(1).optional(),
        GITHUB_CLIENT_SECRET: z.string().min(1).optional(),

        // database
        DATABASE_URL: z.string().min(1),
        DATABASE_AUTH_TOKEN: z.string().min(1).optional(),
        DATABASE_SYNC_URL: z.string().min(1).optional(),

        // logging
        LOG_LEVEL: z
            .enum(["fatal", "error", "warn", "info", "debug", "trace"])
            .optional()
            .default("trace"),
    },
});

export type Env = typeof env;

export const IS_PRODUCTION = env.NODE_ENV === "production";

export function initCors() {
    return cors({
        allowedHeaders: "*",
        origin: [origin(), "https://github.com"],
        credentials: true,
    });
}

export function origin() {
    const protocol = IS_PRODUCTION ? "https://" : "http://";
    const port = IS_PRODUCTION ? "" : `:${env.PORT}`;
    return protocol + env.HOST + port;
}

export function initHtml(options?: HtmlOptions) {
    return html(Object.assign({ autoDoctype: "full" }, options));
}
