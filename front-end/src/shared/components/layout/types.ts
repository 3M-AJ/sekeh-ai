import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export interface NavItem {
	path: string;
	label: string;
	icon: LucideIcon;
	/** Absolute path override (e.g. /admin/dashboard) */
	to?: string;
}

export interface AppShellProps {
	items: NavItem[];
	footer?: ReactNode;
	children?: ReactNode;
}
