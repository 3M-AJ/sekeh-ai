import { useNavigate } from "react-router";
import { DoorOpen } from "lucide-react";
import { useTranslation } from "react-i18next";

// Services
import { authAPI } from "@/apps/user/features/auth/service/authService";

// Components
import Dialog from "@/shared/components/ui/Dialog";
import DialogFooterActions from "@/shared/components/ui/DialogFooterActions";

// Hooks
import { useCustomMutation } from "@/shared/hooks/useCustomMutation";

// Utils
import { removeTokens } from "@/shared/lib/authTokens";
import { cn } from "@/shared/lib/cn";

export default function LogoutDialog() {
	const { t } = useTranslation("common");
	const navigate = useNavigate();
	const { mutate, isPending } = useCustomMutation(authAPI.logout, {
		onSuccess: () => {
			removeTokens();
			navigate("/auth/login");
		},
	});

	return (
		<Dialog
			triggerClass="w-full"
			trigger={
				<span
					className={cn(
						"group flex w-full cursor-pointer items-center gap-7 rounded-lg border-2 border-primary-action px-3 py-1 transition-colors duration-150",
						"hover:bg-primary-action max-md:bg-primary-action",
					)}>
					<DoorOpen
						strokeWidth={1.5}
						className="size-5 text-primary-action group-hover:text-on-accent max-md:text-on-accent"
					/>
					<span className="text-sm font-semibold text-primary-action group-hover:text-on-accent max-md:text-on-accent">
						<span className="max-md:hidden">{t("profile.logoutDesktop")}</span>
						<span className="md:hidden">{t("profile.logoutMobile")}</span>
					</span>
				</span>
			}
			title={t("profile.logoutTitle")}
			footer={
				<DialogFooterActions
					onConfirm={() => mutate()}
					isPending={isPending}
					confirmLabel={t("profile.logoutConfirm")}
				/>
			}>
			<div className="max-w-130">
				<p className="text-primary-text">{t("profile.logoutBody")}</p>
			</div>
		</Dialog>
	);
}
