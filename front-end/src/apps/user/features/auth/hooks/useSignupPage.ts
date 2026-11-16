import { useState } from "react";
import { useNavigate } from "react-router";

// Services
import { authAPI } from "@/apps/user/features/auth/service/authService";

// Hooks
import { useCustomMutation } from "@/shared/hooks/useCustomMutation";

// Utils
import {
	getPasswordError,
	getUsernameError,
	sanitizeText,
} from "@/shared/lib/formValidation";

export interface SignupForm {
	username: string;
	password: string;
	confirm: string;
}

type TouchedFields = Partial<Record<keyof SignupForm, boolean>>;

export function useSignupPage() {
	const [form, setForm] = useState<SignupForm>({
		username: "",
		password: "",
		confirm: "",
	});
	const [touched, setTouched] = useState<TouchedFields>({});
	const navigate = useNavigate();
	const { mutate, isPending } = useCustomMutation(authAPI.register, {
		onSuccess: () => navigate("/chats"),
	});
	const validationErrors = {
		username: getUsernameError(form.username),
		password: getPasswordError(form.password),
		confirm: !form.confirm
			? "تکرار رمز عبور الزامی است."
			: form.password !== form.confirm
				? "رمز عبور و تکرار آن یکسان نیست."
				: "",
	};
	const isFormValid = Object.values(validationErrors).every((error) => !error);
	const handleChange = <K extends keyof SignupForm>(
		key: K,
		value: SignupForm[K],
	) => setForm((current) => ({ ...current, [key]: value }));
	const markTouched = (key: keyof SignupForm) =>
		setTouched((current) => ({ ...current, [key]: true }));
	const handleSubmit = () => {
		setTouched({ username: true, password: true, confirm: true });
		if (!isFormValid || isPending) return;
		mutate({
			username: sanitizeText(form.username),
			password: form.password,
		});
	};

	return {
		form,
		touched,
		validationErrors,
		isFormValid,
		isPending,
		handleChange,
		markTouched,
		handleSubmit,
	};
}
