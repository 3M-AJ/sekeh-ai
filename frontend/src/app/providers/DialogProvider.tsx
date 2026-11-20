import {
	useState,
	useCallback,
	useRef,
	useEffect,
	type ReactNode,
} from "react";
import { DialogContext } from "../contexts/useDialogContext";

const FOCUSABLE =
	'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function DialogProvider({ children }: { children: ReactNode }) {
	const panelRef = useRef<HTMLDivElement | null>(null);
	const previousFocusRef = useRef<HTMLElement | null>(null);
	const onCloseRef = useRef<(() => void) | null>(null);

	const [isOpen, setIsOpen] = useState(false);
	const [activeId, setActiveId] = useState<string | null>(null);
	const [content, setContent] = useState<ReactNode | null>(null);

	const setOnClose = useCallback((callback: (() => void) | null) => {
		onCloseRef.current = callback;
	}, []);

	const closeDialog = useCallback(() => {
		setContent(null);
		setIsOpen(false);
		setActiveId(null);
		onCloseRef.current?.();
		onCloseRef.current = null;

		const previous = previousFocusRef.current;
		if (previous && typeof previous.focus === "function") {
			previous.focus();
		}
		previousFocusRef.current = null;
	}, []);

	const openDialog = useCallback((id: string) => {
		previousFocusRef.current =
			document.activeElement instanceof HTMLElement
				? document.activeElement
				: null;
		setActiveId(id);
		setIsOpen(true);
	}, []);

	useEffect(() => {
		if (!isOpen) return;

		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		const focusFirst = () => {
			const panel = panelRef.current;
			if (!panel) return;
			const focusables = panel.querySelectorAll<HTMLElement>(FOCUSABLE);
			(focusables[0] ?? panel).focus();
		};

		const frame = requestAnimationFrame(focusFirst);

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				event.preventDefault();
				closeDialog();
				return;
			}

			if (event.key !== "Tab" || !panelRef.current) return;

			const focusables = Array.from(
				panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
			).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

			if (focusables.length === 0) {
				event.preventDefault();
				panelRef.current.focus();
				return;
			}

			const first = focusables[0];
			const last = focusables[focusables.length - 1];
			const active = document.activeElement;

			if (event.shiftKey && active === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && active === last) {
				event.preventDefault();
				first.focus();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			cancelAnimationFrame(frame);
			document.body.style.overflow = originalOverflow;
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, closeDialog]);

	return (
		<DialogContext.Provider
			value={{
				isOpen,
				activeId,
				openDialog,
				closeDialog,
				setContent,
				DialogContent: content,
				setOnClose,
				panelRef,
			}}>
			{children}

			{isOpen && content ? (
				<div className="fixed inset-0 z-50">
					<button
						type="button"
						aria-label="Close dialog"
						onClick={closeDialog}
						className="fixed inset-0 cursor-default border-0 bg-accent/10 backdrop-blur-[2px]"
					/>
					<div
						ref={panelRef}
						tabIndex={-1}
						className="relative z-10 outline-none">
						{content}
					</div>
				</div>
			) : null}
		</DialogContext.Provider>
	);
}
