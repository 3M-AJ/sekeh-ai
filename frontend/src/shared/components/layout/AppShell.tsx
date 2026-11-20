import { Outlet } from "react-router";

// Types
import type { AppShellProps } from "./types";

// Components
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";
import Title from "@/shared/components/ui/MainTitle";
import LanguageSwitcher from "@/shared/i18n/LanguageSwitcher";
import { ThemeToggle } from "@/shared/theme";

export default function AppShell({ items, footer }: AppShellProps) {
	return (
		<div className="flex h-dvh w-full max-w-full overflow-x-hidden bg-surface" id="main-container">
			<DesktopNavigation items={items} footer={footer} />
			<div className="flex h-dvh w-full min-w-0 flex-col">
				<header className="flex h-(--navbar-height) shrink-0 items-center bg-background max-md:gap-7 max-md:px-3 md:pe-5">
					<MobileNavigation items={items} footer={footer} />
					<Title mainColor="accent" subColor="primary-text" />
					<div className="ms-auto flex items-center gap-2">
						<LanguageSwitcher />
						<ThemeToggle />
					</div>
				</header>
				<main className="h-(--full-outlet-height) overflow-x-hidden overflow-y-auto">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
