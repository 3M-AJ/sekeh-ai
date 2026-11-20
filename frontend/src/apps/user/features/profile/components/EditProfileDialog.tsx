import { useEffect, useState } from "react";
import { PenBoxIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

// Types
import type { UserForm } from "@/apps/user/features/profile/types";

// Services
import { profileAPI } from "@/apps/user/features/profile/service/profileService";

// Components
import Dialog from "@/shared/components/ui/Dialog";
import Button from "@/shared/components/ui/Button";
import Input from "@/shared/components/ui/Input";
import DialogFooterActions from "@/shared/components/ui/DialogFooterActions";

// Hooks
import { useDialogContext } from "@/app/contexts/useDialogContext";
import { useCustomMutation } from "@/shared/hooks/useCustomMutation";
import useProfile from "@/apps/user/features/profile/store/profileStore";

// Utils
import { toast } from "@/shared/lib/toast";
import {
	getEmailError,
	getPhoneError,
	getRequiredError,
	parsePhoneNumber,
	sanitizeText,
} from "@/shared/lib/formValidation";

interface ProfileErrors {
	username?: string;
	phone_number?: string;
	email?: string;
}

export default function EditProfileDialog({
	refetch,
}: {
	refetch: () => void;
}) {
	const { t } = useTranslation("common");
	const { profile } = useProfile();
	const { closeDialog } = useDialogContext();

	const [form, setForm] = useState<UserForm>({
		email: "",
		phone_number: "",
		username: "",
	});
	const [phoneInput, setPhoneInput] = useState(
		profile?.phone_number ? String(profile.phone_number) : "",
	);
	const [errors, setErrors] = useState<ProfileErrors>({});
	const { mutate, isPending } = useCustomMutation(profileAPI.updateProfile, {
		onSuccess: () => {
			toast.success(t("toasts:profile.success.updated"));
			refetch();
			closeDialog();
		},
	});

	useEffect(() => {
		if (profile) {
			setForm({
				email: profile.email ?? "",
				phone_number: profile.phone_number ?? "",
				username: profile.username ?? "",
			});
			setPhoneInput(
				profile.phone_number ? String(profile.phone_number) : "",
			);
		}
	}, [profile]);

	const handleChange = <K extends keyof UserForm>(
		key: K,
		value: UserForm[K],
	) => {
		setForm((prev) => ({ ...prev, [key]: value }));
		setErrors((prev) => ({ ...prev, [key]: undefined }));
	};

	const handlePhoneChange = (value: string) => {
		setPhoneInput(value);
		setErrors((prev) => ({ ...prev, phone_number: undefined }));
	};

	const handleUpdate = () => {
		const nextErrors: ProfileErrors = {};
		const username = sanitizeText(form.username);
		const email = sanitizeText(form.email ?? "");
		const phoneValue = sanitizeText(phoneInput);
		const parsedPhone = phoneValue ? parsePhoneNumber(phoneValue) : null;

		if (!username)
			nextErrors.username = getRequiredError(
				form.username,
				t("profile.usernameLabel"),
			);
		const emailError = getEmailError(email);
		if (emailError) nextErrors.email = emailError;
		if (phoneValue) {
			const phoneError = getPhoneError(phoneValue);
			if (phoneError) nextErrors.phone_number = phoneError;
		}

		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) return;

		mutate({
			...form,
			username,
			email,
			phone_number: parsedPhone,
		});
	};

	return (
		<Dialog
			variant="fullscreen"
			trigger={
				<Button variant="default">
					<PenBoxIcon strokeWidth={1.5} className="size-5" />
					<span>{t("profile.editTrigger")}</span>
				</Button>
			}
			title={t("profile.editTitle")}
			footer={
				<DialogFooterActions
					onConfirm={handleUpdate}
					isPending={isPending}
					confirmLabel={t("actions.submit")}
					confirmVariant="default"
				/>
			}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleUpdate();
				}}
				className="grid w-full grid-cols-2 gap-5 max-md:grid-cols-1">
				<Input
					label={t("profile.usernameLabel")}
					value={form.username}
					onChange={(e) => handleChange("username", e.target.value)}
					error={errors.username}
				/>
				<Input
					label={t("profile.phoneFieldLabel")}
					placeholder={t("profile.phonePlaceholder")}
					value={phoneInput}
					onChange={(e) => handlePhoneChange(e.target.value)}
					error={errors.phone_number}
				/>
				<div className="col-span-2 max-md:col-span-1">
					<Input
						label={t("profile.emailFieldLabel")}
						placeholder={t("profile.emailPlaceholder")}
						value={form.email ?? ""}
						onChange={(e) => handleChange("email", e.target.value)}
						error={errors.email}
					/>
				</div>
			</form>
		</Dialog>
	);
}
