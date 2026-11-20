import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ToastPayload } from "@/shared/lib/toast";
import { getLocaleDirection } from "@/shared/i18n";
import { cn } from "@/shared/lib/cn";

export default function ToastContainer() {
	const [toasts, setToasts] = useState<ToastPayload[]>([]);
	const { i18n } = useTranslation();
	const dir = getLocaleDirection(i18n.language);
	const enterX = dir === "rtl" ? 100 : -100;

	useEffect(() => {
		const handler = (event: Event) => {
			const customEvent = event as CustomEvent<ToastPayload>;
			const toast = customEvent.detail;

			setToasts((prev) => [...prev, toast]);

			setTimeout(() => {
				setToasts((prev) => prev.filter((item) => item.id !== toast.id));
			}, toast.duration ?? 4000);
		};

		window.addEventListener("app-toast", handler);

		return () => {
			window.removeEventListener("app-toast", handler);
		};
	}, []);

	const getStyles = (type: ToastPayload["type"]) => {
		switch (type) {
			case "success":
				return "border-informational bg-informational/10 text-informational";
			case "error":
				return "border-primary-red bg-primary-red/10 text-primary-red";
			case "warning":
				return "border-primary-action bg-primary-action/10 text-primary-action";
			default:
				return "border-accent bg-accent/10 text-accent";
		}
	};

	return (
		<div
			className="pointer-events-none fixed top-4 z-50 flex max-w-sm flex-col gap-3 max-md:start-2 max-md:end-2 md:end-4 md:w-full"
			aria-live="polite"
			aria-relevant="additions"
			role="region">
			<AnimatePresence>
				{toasts.map((toast) => (
					<motion.div
						key={toast.id}
						role="status"
						initial={{ opacity: 0, x: enterX }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: enterX }}
						transition={{ duration: 0.25 }}
						className={cn(
							"pointer-events-auto rounded-xl border-2 px-4 py-3 backdrop-blur-md",
							getStyles(toast.type),
						)}>
						<p className="text-start text-sm font-medium">{toast.message}</p>
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
}
