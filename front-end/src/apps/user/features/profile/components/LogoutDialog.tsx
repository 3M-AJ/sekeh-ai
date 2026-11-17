import { useNavigate } from "react-router";
import { DoorOpen, LoaderCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

// Services
import { authAPI } from "@/apps/user/features/auth/service/authService";

// Components
import Dialog from "@/shared/components/ui/Dialog";

// Hooks
import { useCustomMutation } from "@/shared/hooks/useCustomMutation";

// Utils
import { removeTokens } from "@/shared/lib/authTokens";

export default function LogoutDialog() {
	const { t } = useTranslation("common");
	const { mutate, isPending } = useCustomMutation(authAPI.logout, {
		onSuccess: () => {
			removeTokens();
			navigate("/auth/login");
		},
	});
	const navigate = useNavigate();

	function handleLogout() {
		mutate();
	}

	return (
		<Dialog
			triggerClass="w-full"
			trigger={
				<div
					className="group cursor-pointer py-1 px-3 rounded-lg flex gap-7 items-center w-full
					hover:bg-primary-action border-2 border-primary-action transition-all duration-150
					max-md:bg-primary-action">
					<DoorOpen
						strokeWidth={1.5}
						className="size-5 group-hover:text-background text-primary-action max-md:text-background"
					/>
					<p className="font-semibold group-hover:text-background text-primary-action max-md:text-background text-[14px]">
						<span className="max-md:hidden">{t("profile.logoutDesktop")}</span>
						<span className="md:hidden">{t("profile.logoutMobile")}</span>
					</p>
				</div>
			}
			title={t("profile.logoutTitle")}
			footer={
				<button
					onClick={handleLogout}
					className={`group py-1 px-3 border-2 border-primary-red text-primary-red rounded-md font-semibold cursor-pointer
						hover:bg-primary-red hover:text-white transition-all duration-150 w-25 flex items-center justify-center
						${isPending ? "pointer-events-none" : ""}`}>
					{isPending ? (
						<LoaderCircle className="text-primary-red animate-spin" />
					) : (
						t("profile.logoutConfirm")
					)}
				</button>
			}
			closeButton={
				<button
					className="py-1 px-3 border-2 border-primary-action text-primary-action rounded-md font-semibold cursor-pointer
              hover:bg-primary-action hover:text-white transition-all duration-150">
					{t("actions.back")}
				</button>
			}>
			<div className="max-w-130">
				<p>{t("profile.logoutBody")}</p>
			</div>
		</Dialog>
	);
}
