import Elysia from "elysia";

import { initHtml } from "@/config";
import { context } from "@/context";
import { HomePage } from "@/lib/pages";
import { withSSG } from "@/lib/ssg";

export const pagesRoutes = new Elysia({ name: "Pages" })
    .decorate("ssg", withSSG)
    .use(initHtml())
    .use(context)
    .get("/", async function homePage(ctx) {
        return await ctx.ssg(HomePage, { tag: "home-page" });
    });
