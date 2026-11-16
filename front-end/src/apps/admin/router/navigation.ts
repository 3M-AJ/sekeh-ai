import { Briefcase, LayoutDashboard, MessageCircle, Users } from "lucide-react";
import type { NavItem } from "@/shared/components/layout";

export const adminMenuItems: NavItem[] = [
	{
		label: "داشبورد",
		path: "dashboard",
		icon: LayoutDashboard,
		to: "/admin/dashboard",
	},
	{
		label: "کاربران",
		path: "users",
		icon: Users,
		to: "/admin/users",
	},
	{
		label: "مشاغل",
		path: "jobs",
		icon: Briefcase,
		to: "/admin/jobs",
	},
	{
		label: "بازگشت به اپ",
		path: "chats",
		icon: MessageCircle,
		to: "/chats",
	},
];
