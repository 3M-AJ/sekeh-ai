import type { ReactNode } from "react";

// Types
import type { NavItem } from "./types";

// Components
import Sidebar from "./Sidebar";

interface DesktopNavigationProps {
	items: NavItem[];
	footer?: ReactNode;
}

export default function DesktopNavigation({
	items,
	footer,
}: DesktopNavigationProps) {
	return (
		<div className="flex h-full w-45 shrink-0 flex-col justify-between bg-background pt-(--navbar-height) pb-8 max-md:hidden">
			<Sidebar items={items} footer={footer} />
		</div>
	);
}
