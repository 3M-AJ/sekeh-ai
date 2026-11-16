import { NavLink, useLocation } from "react-router";
import type { NavItem } from "./types";
import type { ReactNode } from "react";

interface SidebarProps {
	items: NavItem[];
	footer?: ReactNode;
}

export default function Sidebar({ items, footer }: SidebarProps) {
	const location = useLocation();

	return (
		<nav className="flex flex-col items-start gap-5 w-full h-full bg-background p-2">
			{items.map(({ icon: Icon, path, label, to }) => {
				const href = to ?? `/${path}`;
				const isThisPage = location.pathname.includes(path);
				return (
					<NavLink
						to={href}
						className={`cursor-pointer ${
							isThisPage ? "bg-accent" : "hover:bg-accent-soft"
						} px-3 md:py-1 max-md:py-2 rounded-lg transition-all duration-150 flex gap-7 items-center w-full`}
						key={`${path}-icon`}
						id={`${path}-icon`}>
						<Icon
							className={`md:size-5 max-md:size-6 ${
								isThisPage ? "text-background" : "text-primary-action"
							}`}
						/>
						<span
							className={`font-semibold ${
								isThisPage ? "text-background" : "text-primary-text"
							}`}>
							{label}
						</span>
					</NavLink>
				);
			})}
			{footer}
		</nav>
	);
}
