import { NavLink, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import type { NavItem } from "./types";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

interface SidebarProps {
	items: NavItem[];
	footer?: ReactNode;
}

function isActivePath(pathname: string, path: string, href: string) {
	if (pathname === href || pathname === `/${path}`) return true;
	if (path === "chats") {
		return pathname === "/chats" || pathname.startsWith("/chats/");
	}
	return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Sidebar({ items, footer }: SidebarProps) {
	const location = useLocation();
	const { t } = useTranslation("common");

	return (
		<nav className="flex h-full w-full flex-col items-start gap-5 bg-background p-2">
			{items.map(({ icon: Icon, path, labelKey, to }) => {
				const href = to ?? `/${path}`;
				const isThisPage = isActivePath(location.pathname, path, href);

				return (
					<NavLink
						to={href}
						aria-current={isThisPage ? "page" : undefined}
						className={cn(
							"flex w-full cursor-pointer items-center gap-7 rounded-lg px-3 transition-colors duration-150 max-md:py-2 md:py-1",
							"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
							isThisPage ? "bg-accent" : "hover:bg-accent-soft",
						)}
						key={`${path}-icon`}
						id={`${path}-icon`}>
						<Icon
							className={cn(
								"max-md:size-6 md:size-5",
								isThisPage ? "text-on-accent" : "text-primary-action",
							)}
						/>
						<span
							className={cn(
								"font-semibold",
								isThisPage ? "text-on-accent" : "text-primary-text",
							)}>
							{t(labelKey)}
						</span>
					</NavLink>
				);
			})}
			{footer}
		</nav>
	);
}
