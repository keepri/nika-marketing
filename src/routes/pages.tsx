import Elysia from "elysia";

import { initHtml } from "@/config";
import { context } from "@/context";
import { AboutPage, ContactPage, HomePage, ServicesPage } from "@/lib/pages";
import { withSSG } from "@/lib/ssg";

export const pagesRoutes = new Elysia({ name: "Pages" })
    .decorate("ssg", withSSG)
    .use(initHtml())
    .use(context)
    .get("/", async function homePage(ctx) {
        return await ctx.ssg(HomePage, { tag: "home-page" });
    })
    .get("/services", async function servicesPage(ctx) {
        return await ctx.ssg(ServicesPage, { tag: "services-page" });
    })
    .get("/about", async function aboutPage(ctx) {
        return await ctx.ssg(AboutPage, { tag: "about-page" });
    })
    .get("/contact", async function contactPage(ctx) {
        return await ctx.ssg(ContactPage, { tag: "contact-page" });
    });
