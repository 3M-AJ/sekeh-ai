import { Briefcase, LayoutDashboard, MessageCircle, Users } from "lucide-react";
import type { NavItem } from "@/shared/components/layout";

export const adminMenuItems: NavItem[] = [
	{
		labelKey: "nav.dashboard",
		path: "dashboard",
		icon: LayoutDashboard,
		to: "/admin/dashboard",
	},
	{
		labelKey: "nav.users",
		path: "users",
		icon: Users,
		to: "/admin/users",
	},
	{
		labelKey: "nav.jobs",
		path: "jobs",
		icon: Briefcase,
		to: "/admin/jobs",
	},
	{
		labelKey: "nav.backToApp",
		path: "chats",
		icon: MessageCircle,
		to: "/chats",
	},
];
