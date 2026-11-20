import { BanIcon, HeartCrack } from "lucide-react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

// Services
import { profileAPI } from "@/apps/user/features/profile/service/profileService";

// Components
import Dialog from "@/shared/components/ui/Dialog";
import Button from "@/shared/components/ui/Button";
import DialogFooterActions from "@/shared/components/ui/DialogFooterActions";

// Hooks
import { useCustomMutation } from "@/shared/hooks/useCustomMutation";

// Utils
import { removeTokens } from "@/shared/lib/authTokens";

export default function DeleteAccountDialog() {
	const { t } = useTranslation("common");
	const navigate = useNavigate();
	const { mutate, isPending } = useCustomMutation(profileAPI.deleteProfile, {
		onSuccess: () => {
			removeTokens();
			navigate("/");
		},
	});

	return (
		<Dialog
			trigger={
				<Button variant="destructive">
					<BanIcon strokeWidth={1.5} className="size-5" />
					<span>{t("profile.deleteTrigger")}</span>
				</Button>
			}
			title={t("profile.deleteTitle")}
			footer={
				<DialogFooterActions
					onConfirm={() => mutate()}
					isPending={isPending}
					confirmLabel={t("profile.deleteConfirm")}
					confirmIcon={<HeartCrack strokeWidth={1.5} className="size-5" />}
				/>
			}>
			<p className="text-primary-text">
				{t("profile.deleteBodyBefore")}{" "}
				<span className="font-semibold">{t("profile.deleteIrreversible")}</span>{" "}
				{t("profile.deleteBodyMiddle")}{" "}
				<span className="font-semibold">{t("profile.deleteWillBeDeleted")}</span>
				.
			</p>
		</Dialog>
	);
}
