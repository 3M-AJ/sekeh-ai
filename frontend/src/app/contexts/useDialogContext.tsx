import {
	createContext,
	useContext,
	type Dispatch,
	type SetStateAction,
} from "react";

interface DialogContextValue {
	isOpen: boolean;
	activeId: string | null;
	openDialog: (id: string) => void;
	closeDialog: () => void;
	setContent: Dispatch<SetStateAction<React.ReactNode | null>>;
	DialogContent: React.ReactNode;
	setOnClose: (callback: (() => void) | null) => void;
	panelRef: React.RefObject<HTMLDivElement | null>;
}

export const DialogContext = createContext<DialogContextValue | undefined>(
	undefined,
);

export const useDialogContext = (): DialogContextValue => {
	const ctx = useContext(DialogContext);
	if (!ctx) {
		throw new Error("useDialogContext must be used inside a <DialogProvider>");
	}
	return ctx;
};
