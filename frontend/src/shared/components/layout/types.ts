import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export interface NavItem {
	path: string;
	/** i18n key under the common namespace, e.g. nav.profile */
	labelKey: string;
	icon: LucideIcon;
	/** Absolute path override (e.g. /admin/dashboard) */
	to?: string;
}

export interface AppShellProps {
	items: NavItem[];
	footer?: ReactNode;
	children?: ReactNode;
}
