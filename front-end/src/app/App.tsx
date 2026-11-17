import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AppProviders from "@/app/providers/AppProviders";
import AppRouter from "@/app/router/AppRouter";
import ToastContainer from "@/shared/components/feedback/ToastContainer";
import { getLocaleDirection } from "@/shared/i18n";
import DialogProvider from "./providers/DialogProvider";

export default function App() {
	const { i18n } = useTranslation();
	const [dir, setDir] = useState(() => getLocaleDirection(i18n.language));

	useEffect(() => {
		const syncDirection = (lng: string) => {
			setDir(getLocaleDirection(lng));
		};

		syncDirection(i18n.language);
		i18n.on("languageChanged", syncDirection);

		return () => {
			i18n.off("languageChanged", syncDirection);
		};
	}, [i18n]);

	return (
		<AppProviders>
			<div dir={dir}>
				<DialogProvider>
					<AppRouter />
				</DialogProvider>
				<ToastContainer />
			</div>
		</AppProviders>
	);
}
