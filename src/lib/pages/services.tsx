import { Layout } from "../components/layout";

export function ServicesPage() {
    return (
        <Layout>
            <main class="">
                <CardSection title="Services" content={SERVICES} />
            </main>
        </Layout>
    );
}
