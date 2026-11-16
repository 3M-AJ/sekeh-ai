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
		label: "پروفایل",
		path: "profile",
		icon: User,
	},
	{
		label: "پنل ادمین",
		path: "admin",
		icon: Settings,
		to: "/admin/dashboard",
	},
	{
		label: "ذخیره‌ها",
		path: "marks",
		icon: Archive,
	},
	{
		label: "چت‌ها",
		path: "chats",
		icon: MessageCircle,
	},
	{
		label: "رزومه‌ها",
		path: "resume",
		icon: File,
	},
	{
		label: "ارتباط با ما",
		path: "contact-us",
		icon: Phone,
	},
];
