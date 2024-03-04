import { type JSX, type ParentProps, children } from "solid-js";

type Props = ParentProps<{
    client?: boolean;
}>;

export function Button(
    props: Props & JSX.ButtonHTMLAttributes<HTMLButtonElement>,
) {
    const safeChildren = children(() => props.children);

    props.class =
        (props.class ?? "") +
        " border-2 rounded-full border-[#D6BEBE] py-3 px-7 active:scale-95";

    return <button {...props}>{safeChildren()}</button>;
}
