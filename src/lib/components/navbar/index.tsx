import { staticDir } from "@/config";

import { NavLink } from "./nav-link";

export function Navbar() {
    return (
        <header class="absolute top-0 w-full px-4 py-6">
            <nav class="flex justify-between items-center gap-2">
                <a href="/">
                    <img
                        class="cursor-pointer max-w-24"
                        src={staticDir("/logo.png")}
                        alt="NIKA"
                    />
                </a>

                <ul class="flex justify-evenly items-center gap-2">
                    <NavLink href="#services">SERVICES</NavLink>

                    <NavLink href="/about">ABOUT</NavLink>

                    <NavLink href="/contact">CONTACT</NavLink>
                </ul>
            </nav>
        </header>
    );
}
