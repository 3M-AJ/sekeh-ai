import {
	cloneElement,
	isValidElement,
	useCallback,
	useEffect,
	useId,
	useMemo,
	type ReactElement,
	type ReactNode,
} from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";

// Components
import Button from "@/shared/components/ui/Button";

// Hooks
import { useDialogContext } from "@/app/contexts/useDialogContext";

// Utils
import { cn } from "@/shared/lib/cn";

export interface DialogProps {
	trigger?: ReactNode;
	title: string;
	children: ReactNode;
	footer?: ReactNode;
	triggerClass?: string;
	closeButton?: ReactNode;
	open?: boolean;
	onClose?: () => void;
	onOpen?: () => void;
	onOpenChange?: (open: boolean) => void;
	variant?: "bottom" | "fullscreen";
}

function composeHandlers(
	...handlers: Array<((event: React.MouseEvent) => void) | undefined>
) {
	return (event: React.MouseEvent) => {
		handlers.forEach((handler) => handler?.(event));
	};
}

export default function Dialog({
	trigger,
	title,
	children,
	footer,
	triggerClass,
	closeButton,
	open,
	onClose,
	onOpen,
	onOpenChange,
	variant = "bottom",
}: DialogProps) {
	const dialogId = useId();
	const titleId = useId();
	const { t } = useTranslation("common");
	const {
		isOpen,
		activeId,
		setContent,
		openDialog,
		closeDialog,
		setOnClose,
	} = useDialogContext();

	const isOwner = isOpen && activeId === dialogId;

	const registerCloseHandlers = useCallback(() => {
		setOnClose(() => {
			onOpenChange?.(false);
			onClose?.();
		});
	}, [setOnClose, onOpenChange, onClose]);

	const handleClose = useCallback(() => {
		closeDialog();
	}, [closeDialog]);

	const dialogContent = useMemo(
		() => (
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
				className={cn(
					"fixed z-[60] flex max-h-[min(100dvh,920px)] w-full flex-col border-2 border-border bg-background shadow-lg",
					"md:top-1/2 md:left-1/2 md:w-fit md:min-w-[min(100%,24rem)] md:max-w-[min(90vw,40rem)] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-xl",
					variant === "fullscreen"
						? "max-md:inset-0 max-md:rounded-none"
						: "max-md:inset-x-0 max-md:bottom-0 max-md:max-h-[min(92dvh,920px)] max-md:rounded-t-xl max-md:pb-[env(safe-area-inset-bottom)]",
				)}>
				<header className="flex shrink-0 items-center justify-between gap-3 border-b border-border p-5">
					<h2 id={titleId} className="text-lg font-semibold text-primary-text">
						{title}
					</h2>
					<Button
						type="button"
						onClick={handleClose}
						variant="ghost"
						size="icon"
						aria-label={t("dialog.closeAria")}>
						<X className="size-5" />
					</Button>
				</header>

				<div className="min-h-0 flex-1 overflow-y-auto p-5 scrollbar-gray">
					{children}
				</div>

				{(footer || closeButton) && (
					<footer className="flex shrink-0 flex-wrap items-center justify-end gap-3 border-t border-border p-5">
						{closeButton}
						{footer}
					</footer>
				)}
			</div>
		),
		[children, closeButton, footer, handleClose, t, title, titleId, variant],
	);

	const handleOpen = useCallback(() => {
		registerCloseHandlers();
		setContent(dialogContent);
		openDialog(dialogId);
		onOpenChange?.(true);
		onOpen?.();
	}, [
		dialogContent,
		dialogId,
		setContent,
		openDialog,
		onOpenChange,
		onOpen,
		registerCloseHandlers,
	]);

	useEffect(() => {
		if (!isOwner) return;
		registerCloseHandlers();
		setContent(dialogContent);
	}, [dialogContent, isOwner, setContent, registerCloseHandlers]);

	useEffect(() => {
		if (open === undefined) return;

		if (open && !isOwner) {
			handleOpen();
		}

		if (!open && isOwner) {
			handleClose();
		}
	}, [open, isOwner, handleOpen, handleClose]);

	if (!trigger) {
		return null;
	}

	if (isValidElement(trigger)) {
		const element = trigger as ReactElement<{
			onClick?: (event: React.MouseEvent) => void;
			className?: string;
			"aria-haspopup"?: string;
			"aria-expanded"?: boolean;
		}>;
		const tag = typeof element.type === "string" ? element.type : null;
		const shouldWrap = Boolean(tag && tag !== "button");

		if (!shouldWrap) {
			return cloneElement(element, {
				onClick: composeHandlers(element.props.onClick, handleOpen),
				"aria-haspopup": "dialog",
				"aria-expanded": isOwner,
				className: cn(element.props.className, triggerClass),
			});
		}
	}

	return (
		<button
			type="button"
			onClick={handleOpen}
			aria-haspopup="dialog"
			aria-expanded={isOwner}
			className={cn(
				"inline-flex cursor-pointer appearance-none border-0 bg-transparent p-0 text-start",
				triggerClass,
			)}>
			{trigger}
		</button>
	);
}
