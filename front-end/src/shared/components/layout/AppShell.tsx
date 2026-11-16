import { Outlet } from "react-router";

// Types
import type { AppShellProps } from "./types";

// Components
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";
import Title from "@/shared/components/ui/MainTitle";
import { ThemeToggle } from "@/shared/theme";

export default function AppShell({ items, footer }: AppShellProps) {
	return (
		<div className="h-dvh w-screen bg-surface flex" id="main-container">
			<DesktopNavigation items={items} footer={footer} />
			<div className="flex flex-col h-dvh w-full">
				<header className="bg-background md:pe-5 max-md:px-3 flex h-(--navbar-height) shrink-0 items-center max-md:gap-7">
					<MobileNavigation items={items} footer={footer} />
					<Title mianColor="accent" subColor="primary-text" />
					<ThemeToggle className="ms-auto" />
				</header>
				<main className="h-(--full-outlet-height) overflow-x-hidden overflow-y-auto">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
