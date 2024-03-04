import { type ParentProps } from "solid-js";

import { BaseHtml } from "./base-html";
import { Navbar } from "./navbar";

type LayoutProps = ParentProps;

export function Layout(props: LayoutProps) {
    const safeChildren = props.children;

    return (
        <BaseHtml>
            <body class="relative container px-4">
                <Navbar />

                {safeChildren}
            </body>
        </BaseHtml>
    );
}
