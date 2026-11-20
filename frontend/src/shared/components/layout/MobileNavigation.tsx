import { Menu, X } from "lucide-react";
import { useEffect, useId, useState, type ReactNode } from "react";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";

// Types
import type { NavItem } from "./types";

// Components
import Sidebar from "./Sidebar";
import Button from "@/shared/components/ui/Button";
import { cn } from "@/shared/lib/cn";

interface MobileNavigationProps {
	items: NavItem[];
	footer?: ReactNode;
}

export default function MobileNavigation({
	items,
	footer,
}: MobileNavigationProps) {
	const { t } = useTranslation("common");
	const [open, setOpen] = useState(false);
	const location = useLocation();
	const panelId = useId();

	useEffect(() => {
		setOpen(false);
	}, [location.pathname]);

	useEffect(() => {
		if (!open) return;

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};

		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [open]);

	return (
		<div className="md:hidden">
			<Button
				type="button"
				variant="default"
				size="icon"
				aria-expanded={open}
				aria-controls={panelId}
				aria-label={
					open
						? t("nav.closeMenu", { defaultValue: "Close menu" })
						: t("nav.openMenu", { defaultValue: "Open menu" })
				}
				onClick={() => setOpen((value) => !value)}
				className="size-7 rounded-full bg-accent text-on-accent hover:bg-accent-hover">
				{open ? <X className="size-5" /> : <Menu strokeWidth={1.5} className="size-5" />}
			</Button>

			<div
				id={panelId}
				className={cn(
					"fixed start-0 top-(--navbar-height) z-20 h-[calc(100dvh-var(--navbar-height))] w-1/2 max-w-72 transition-transform duration-150",
					open
						? "translate-x-0"
						: "ltr:-translate-x-full rtl:translate-x-full pointer-events-none",
				)}>
				<Sidebar items={items} footer={footer} />
			</div>

			{open ? (
				<button
					type="button"
					aria-label={t("nav.closeMenu", { defaultValue: "Close menu" })}
					onClick={() => setOpen(false)}
					className="fixed start-0 top-(--navbar-height) z-19 h-[calc(100dvh-var(--navbar-height))] w-full cursor-default border-0 bg-accent/10 backdrop-blur-[2px]"
				/>
			) : null}
		</div>
	);
}
