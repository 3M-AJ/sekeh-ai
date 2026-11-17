import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";

// Components
import { AppShell } from "@/shared/components/layout";
import LogoutDialog from "@/apps/user/features/profile/components/LogoutDialog";

// Hooks
import useProfile from "@/apps/user/features/profile/store/profileStore";

// Utils
import { userMenuItems } from "@/apps/user/router/navigation";
import { checkTokens, removeTokens } from "@/shared/lib/authTokens";
import { toast } from "@/shared/lib/toast";
import i18n from "@/shared/i18n";

export default function UserLayout() {
	const navigate = useNavigate();
	const location = useLocation();
	const { profile } = useProfile();

	const items = useMemo(
		() =>
			userMenuItems.filter(
				(item) => item.path !== "admin" || profile?.role === "admin",
			),
		[profile?.role],
	);

	useEffect(() => {
		if (!checkTokens() && location.pathname !== "auth/login") {
			window.dispatchEvent(new Event("unauthorized"));
		}
	}, [location.pathname, navigate]);

	useEffect(() => {
		const handler = () => {
			removeTokens();
			toast.error(i18n.t("toasts:auth.error.unauthorized"));
			navigate("/auth/login");
		};

		window.addEventListener("unauthorized", handler);

		return () => window.removeEventListener("unauthorized", handler);
	}, [navigate]);

	return <AppShell items={items} footer={<LogoutDialog />} />;
}
