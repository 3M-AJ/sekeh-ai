import {
	Archive,
	File,
	MessageCircle,
	Phone,
	Settings,
	User,
} from "lucide-react";
import type { NavItem } from "@/shared/components/layout";

export const userMenuItems: NavItem[] = [
	{
		labelKey: "nav.profile",
		path: "profile",
		icon: User,
	},
	{
		labelKey: "nav.adminPanel",
		path: "admin",
		icon: Settings,
		to: "/admin/dashboard",
	},
	{
		labelKey: "nav.marks",
		path: "marks",
		icon: Archive,
	},
	{
		labelKey: "nav.chats",
		path: "chats",
		icon: MessageCircle,
	},
	{
		labelKey: "nav.resumes",
		path: "resume",
		icon: File,
	},
	{
		labelKey: "nav.contact",
		path: "contact-us",
		icon: Phone,
	},
];
