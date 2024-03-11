import { Button } from "@/lib/components/button";
import { Layout } from "@/lib/components/layout";

import { SERVICES, type Service } from "./data";

export function HomePage() {
    return (
        <Layout>
            <HeroSection />

            <CardSection id="services" title="Services" content={SERVICES} />
        </Layout>
    );
}

function HeroSection() {
    return (
        <main class="grid items-center min-h-screen">
            <section>
                <h1 class="max-w-[25ch] font-bold text-5xl">
                    Probably the best digital decision you're about to make.
                </h1>

                <p class="max-w-prose text-2xl my-8">
                    We help small business owners establish a productive
                    presence online and offline.
                </p>

                <Button>BOOK A DISCOVERY MEETING</Button>
            </section>
        </main>
    );
}

function CardSection(props: {
    id?: string;
    title: string;
    content: Array<Service>;
}) {
    return (
        <section id={props.id} class="py-24">
            <h4 safe class="text-5xl mb-24">
                {props.title.toUpperCase()}
            </h4>

            <div class="flex gap-12 flex-wrap">
                {props.content.map((service) => {
                    return (
                        <Card
                            title={service.title}
                            description={service.description}
                        />
                    );
                })}
            </div>
        </section>
    );
}

function Card(props: Service) {
    return (
        <div class="flex-1 rounded-3xl bg-[#D6BEBE] p-8 cursor-pointer md:min-w-80 min-w-64">
            <h5 safe class="text-3xl font-bold mb-4 text-center">
                {props.title}
            </h5>

            <p safe class="mx-auto text-lg text-center max-w-prose">
                {props.description}
            </p>
        </div>
    );
}
