import { Menu } from "lucide-react";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import type { ReactNode } from "react";

// Types
import type { NavItem } from "./types";

// Components
import Sidebar from "./Sidebar";

interface MobileNavigationProps {
	items: NavItem[];
	footer?: ReactNode;
}

export default function MobileNavigation({
	items,
	footer,
}: MobileNavigationProps) {
	const triggerRef = useRef<HTMLInputElement | null>(null);
	const location = useLocation();

	useEffect(() => {
		if (triggerRef.current) triggerRef.current.checked = false;
	}, [location]);

	return (
		<div className="md:hidden">
			<input
				ref={triggerRef}
				type="checkbox"
				id="navbar-menu"
				className="peer hidden"
			/>
			<label htmlFor="navbar-menu">
				<Menu
					strokeWidth={1.5}
					className="text-white bg-accent p-1 size-7 rounded-full"
				/>
			</label>
			<section
				className="fixed w-1/2 h-dvh top-17 start-0
				translate-x-full peer-checked:translate-x-0 transition-all duration-150 z-20">
				<Sidebar items={items} footer={footer} />
			</section>
			<label
				htmlFor="navbar-menu"
				className="backdrop-blur-[2px] fixed w-full h-full top-17 start-0 z-19 hidden peer-checked:block"></label>
		</div>
	);
}
