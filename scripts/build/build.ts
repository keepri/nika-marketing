import { build, file, spawn, spawnSync, write } from "bun";

import { DB_DIR, IS_PRODUCTION, buildDir, staticDir } from "@/config";

import { buildJs, extractDependencies } from "./lib";

const DOT_ENV = file(".env.local");
const PACKAGE_JSON = file("package.json");
const DEPS = await extractDependencies(PACKAGE_JSON);
const MV_CMD = IS_PRODUCTION ? "mv" : "cp";
const DB_FILE = file(DB_DIR + "/db.sqlite");

// build server
await build({
    target: "bun",
    entrypoints: ["main.ts"],
    outdir: buildDir(),
    minify: true,
    // we are concatting these dependencies for Lucia auth
    external: DEPS.concat(["@node-rs/argon2", "@node-rs/bcrypt"]),
});

await buildJs();

await write(file(buildDir("/package.json")), await PACKAGE_JSON.arrayBuffer());
await write(file(buildDir("/.env")), await DOT_ENV.arrayBuffer());

const dbFileExists = await DB_FILE.exists();
if (!dbFileExists) {
    spawnSync(["mkdir", "-p", DB_DIR]);
    await write(DB_FILE, "");
    spawnSync(["bun", "db:push"]);
}

spawnSync(["bun", "tw"]);
spawn({ cmd: [MV_CMD, "-r", staticDir(), buildDir()] });
