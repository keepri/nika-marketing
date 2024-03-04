import { Elysia } from "elysia";

export const v1Routes = new Elysia({ name: "API v1", prefix: "/v1" }).get(
    "/healthz",
    function handleHealthz() {
        return new Response("Coolcoolcool!");
    },
);
