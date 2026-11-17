import { BanIcon, HeartCrack } from "lucide-react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

// Services
import { profileAPI } from "@/apps/user/features/profile/service/profileService";

// Components
import Dialog from "@/shared/components/ui/Dialog";
import Button from "@/shared/components/ui/Button";

// Hooks
import { useCustomMutation } from "@/shared/hooks/useCustomMutation";

// Utils
import { removeTokens } from "@/shared/lib/authTokens";

export default function DeleteAccountDialog() {
	const { t } = useTranslation("common");
	const navigate = useNavigate();
	const { deleteProfile } = profileAPI;
	const { mutate } = useCustomMutation(deleteProfile, {
		onSuccess: () => {
			removeTokens();
			navigate("/");
		},
	});

	function handleDeleteAccount() {
		mutate();
	}

	return (
		<Dialog
			trigger={
				<Button variant="destructive">
					<BanIcon
						strokeWidth={1.5}
						className="size-5 transition-colors duration-200"
					/>
					<span>{t("profile.deleteTrigger")}</span>
				</Button>
			}
			title={t("profile.deleteTitle")}
			footer={
				<button
					onClick={handleDeleteAccount}
					className="group py-1 px-3 border-2 border-primary-red text-primary-red rounded-md font-semibold cursor-pointer
						hover:bg-primary-red hover:text-white transition-all duration-150 flex gap-2 items-center">
					<span>{t("profile.deleteConfirm")}</span>
					<HeartCrack
						strokeWidth={1.5}
						className="size-5 text-primary-red group-hover:text-white transition-all duration-150"
					/>
				</button>
			}
			closeButton={
				<button
					className="py-1 px-3 border-2 border-primary-action text-primary-action rounded-md font-semibold cursor-pointer
              hover:bg-primary-action hover:text-white transition-all duration-150">
					{t("actions.back")}
				</button>
			}>
			<p className="text-primary-action">
				{t("profile.deleteBodyBefore")}{" "}
				<span className="font-semibold">{t("profile.deleteIrreversible")}</span>{" "}
				{t("profile.deleteBodyMiddle")}{" "}
				<span className="font-semibold">{t("profile.deleteWillBeDeleted")}</span>
				.
			</p>
		</Dialog>
	);
}
