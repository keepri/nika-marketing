import { Button } from "../components/button";
import { Layout } from "../components/layout";

export function HomePage() {
    return (
        <Layout class="grid items-center min-h-screen">
            <main>
                <h1 class="max-w-[25ch] font-bold text-5xl">
                    Probably the best digital decision you're about to make.
                </h1>

                <p class="max-w-prose text-2xl my-8">
                    We help small business owners establish a productive
                    presence online and offline.
                </p>

                <Button>BOOK A DISCOVERY MEETING</Button>
            </main>
        </Layout>
    );
}
