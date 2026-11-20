import { useState } from "react";
import { useNavigate } from "react-router";

// Services
import { authAPI } from "@/apps/user/features/auth/service/authService";

// Hooks
import useProfile from "@/apps/user/features/profile/store/profileStore";
import { useCustomMutation } from "@/shared/hooks/useCustomMutation";

// Utils
import { addTokens } from "@/shared/lib/authTokens";
import {
	getPasswordError,
	getUsernameError,
	sanitizeText,
} from "@/shared/lib/formValidation";

export interface LoginForm {
	username: string;
	password: string;
}

type TouchedFields = Partial<Record<keyof LoginForm, boolean>>;

export function useLoginPage() {
	const [form, setForm] = useState<LoginForm>({ username: "", password: "" });
	const [touched, setTouched] = useState<TouchedFields>({});
	const { setProfile } = useProfile();
	const navigate = useNavigate();
	const { mutate, isPending } = useCustomMutation(authAPI.login, {
		onSuccess: (response) => {
			const { access_token, refresh_token, user } = response.data;
			addTokens({ access: access_token, refresh: refresh_token });
			setProfile(user);
			navigate("/chats");
		},
	});
	const validationErrors = {
		username: getUsernameError(form.username, { allowEmail: true }),
		password: getPasswordError(form.password),
	};
	const isFormValid = Object.values(validationErrors).every((error) => !error);
	const handleChange = <K extends keyof LoginForm>(
		key: K,
		value: LoginForm[K],
	) => setForm((current) => ({ ...current, [key]: value }));
	const markTouched = (key: keyof LoginForm) =>
		setTouched((current) => ({ ...current, [key]: true }));
	const handleSubmit = () => {
		setTouched({ username: true, password: true });
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
