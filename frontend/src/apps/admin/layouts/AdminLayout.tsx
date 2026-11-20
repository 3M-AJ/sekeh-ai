import { useEffect } from "react";
import { useNavigate } from "react-router";

// Components
import { AppShell } from "@/shared/components/layout";

// Hooks
import useProfile from "@/apps/user/features/profile/store/profileStore";

// Utils
import { adminMenuItems } from "@/apps/admin/router/navigation";
import { checkTokens, removeTokens } from "@/shared/lib/authTokens";
import { toast } from "@/shared/lib/toast";
import i18n from "@/shared/i18n";

export default function AdminLayout() {
	const { profile } = useProfile();
	const navigate = useNavigate();

	useEffect(() => {
		if (!checkTokens()) {
			removeTokens();
			toast.error(i18n.t("toasts:auth.error.unauthorized"));
			navigate("/auth/login");
			return;
		}

		if (profile && profile.role !== "admin") {
			toast.warning(i18n.t("toasts:auth.error.forbidden"));
			navigate("/chats");
		}
	}, [navigate, profile]);

	return <AppShell items={adminMenuItems} />;
}
