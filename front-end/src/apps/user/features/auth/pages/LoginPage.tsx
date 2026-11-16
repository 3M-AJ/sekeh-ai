import { LoaderCircle } from "lucide-react";
import { Link } from "react-router";

// Components
import Button from "@/shared/components/ui/Button";
import Input from "@/shared/components/ui/Input";
import PasswordInput from "@/shared/components/ui/PasswordInput";

// Hooks
import { useLoginPage } from "@/apps/user/features/auth/hooks/useLoginPage";

export default function LoginPage() {
	const {
		form,
		touched,
		validationErrors,
		isFormValid,
		isPending,
		handleChange,
		markTouched,
		handleSubmit,
	} = useLoginPage();

	return (
		<div className="flex h-full flex-col justify-center gap-8 py-5 px-10">
			<div className="space-y-2 text-center">
				<h1 className="text-4xl font-bold text-primary-text">ورود</h1>
				<p className="text-sm text-text-muted">
					اطلاعات حساب کاربری خود را وارد کنید.
				</p>
			</div>

			<form
				id="login-form"
				noValidate
				onSubmit={(event) => {
					event.preventDefault();
					handleSubmit();
				}}
				className="flex flex-col gap-5 text-primary-text">
				<Input
					label="نام کاربری یا ایمیل"
					value={form.username}
					onChange={(event) => handleChange("username", event.target.value)}
					onBlur={() => markTouched("username")}
					autoComplete="username"
					maxLength={40}
					error={touched.username ? validationErrors.username : undefined}
					placeholder="نام کاربری یا ایمیل"
				/>

				<PasswordInput
					label="رمز عبور"
					value={form.password}
					onChange={(event) => handleChange("password", event.target.value)}
					onBlur={() => markTouched("password")}
					autoComplete="current-password"
					maxLength={64}
					error={touched.password ? validationErrors.password : undefined}
				/>
			</form>

			<Button
				disabled={!isFormValid || isPending}
				type="submit"
				form="login-form"
				className="h-12 rounded-full text-xl">
				{isPending ? (
					<>
						<LoaderCircle className="size-5 animate-spin" />
						<span>در حال ورود</span>
					</>
				) : (
					"ورود"
				)}
			</Button>

			<footer className="flex flex-col items-center">
				<p className="text-primary-action">هنوز حساب کاربری نساخته‌اید؟</p>
				<Link to="../signup" className="font-semibold text-accent">
					ثبت نام
				</Link>
			</footer>
		</div>
	);
}
