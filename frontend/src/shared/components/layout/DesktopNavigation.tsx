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
		<div className="pt-17 pb-8 w-45 flex flex-col justify-between h-full bg-background shrink-0 max-md:hidden">
			<Sidebar items={items} footer={footer} />
		</div>
	);
}
