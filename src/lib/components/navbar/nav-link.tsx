import { type ParentProps } from "solid-js";

type NavLinkProps = ParentProps<{
    href: string;
}>;

export function NavLink(props: NavLinkProps) {
    return (
        <li class="px-4 text-2xl">
            <a safe href={props.href}>
                {props.children}
            </a>
        </li>
    );
}
