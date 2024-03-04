import { type CronConfig, cron } from "@elysiajs/cron";
import { type Elysia } from "elysia";

type Options = {
    disabled?: boolean;
    // TODO
    // runImmediately?: boolean;
};

export function registerCron(
    name: string,
    cron: (app: Elysia) => Elysia,
    options?: Options,
) {
    if (options?.disabled === true) {
        return function callback(app: Elysia) {
            console.log(`Cron job ${name} is disabled.`);
            return app;
        };
    }

    return function callback(app: Elysia) {
        console.log(`Cron job ${name} registered.`);
        return cron(app);
    };
}

export function makeCronJob(
    config: Omit<CronConfig, "run">,
    callback: CronConfig["run"],
) {
    let fails = 0;

    return cron(
        Object.assign(config, {
            run(cron) {
                const start = performance.now();
                callback(cron)?.then(success)?.catch(fail);

                function success() {
                    const diffMs = +(performance.now() - start).toPrecision(2);
                    if (diffMs > 250) {
                        console.warn(
                            `Cron job ${config.name} completed in ${diffMs}ms.`,
                        );
                    }
                }

                function fail(error: Error) {
                    if (++fails > 7) {
                        console.error(
                            `Cron job failed too many times, stopping ${config.name} cron.`,
                        );
                        cron.stop();
                        return;
                    }

                    console.error(
                        `Cron job ${config.name} failed. ${error.message}`,
                    );
                }
            },
        } satisfies Pick<CronConfig, "run">),
    );
}
