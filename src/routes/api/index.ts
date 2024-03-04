import { Elysia } from "elysia";

import { v1Routes } from "./v1";

export const apiRoutes = new Elysia({ name: "API", prefix: "/api" }).use(
    v1Routes,
);
