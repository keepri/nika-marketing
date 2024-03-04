import { type ParentProps } from "solid-js";

import { BaseHtml } from "./base-html";
import { Navbar } from "./navbar";

type LayoutProps = ParentProps<{
    class?: string;
}>;

export function Layout(props: LayoutProps) {
    props.class ??= "";

    const safeChildren = props.children;
    const className = props.class + " relative container px-4";

    return (
        <BaseHtml>
            <body class={className}>
                <Navbar />

                {safeChildren}
            </body>
        </BaseHtml>
    );
}
