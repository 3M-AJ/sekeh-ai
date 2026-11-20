import { type FormEvent } from "react";
import { LoaderCircle, SendHorizonal } from "lucide-react";
import { useTranslation } from "react-i18next";

// Types
import type { ResumeFormObject } from "@/apps/user/features/resume/types";

// Components
import Dialog from "@/shared/components/ui/Dialog";
import Button from "@/shared/components/ui/Button";
import Input, { fieldClassName } from "@/shared/components/ui/Input";
import { cn } from "@/shared/lib/cn";

interface Props {
	open: boolean;
	onClose: () => void;
	editingId: number | string | null;
	formData: ResumeFormObject;
	onChange: <K extends keyof ResumeFormObject>(
		key: K,
		value: ResumeFormObject[K],
	) => void;
	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
	validate: boolean;
	isPending: boolean;
	errors?: {
		title?: string;
		content?: string;
	};
}

export default function ResumeForm({
	open,
	onClose,
	editingId,
	formData,
	onChange,
	onSubmit,
	validate,
	isPending,
	errors,
}: Props) {
	const { t } = useTranslation("common");

	return (
		<Dialog
			open={open}
			onClose={onClose}
			variant="fullscreen"
			title={editingId ? t("resume.editTitle") : t("resume.createTitle")}
			footer={
				<>
					<Button
						type="button"
						variant="outline"
						onClick={onClose}
						className="rounded-md">
						{t("actions.back")}
					</Button>
					<Button
						form="resume-form"
						type="submit"
						disabled={isPending || !validate}
						className="rounded-md">
						{isPending ? (
							<LoaderCircle className="size-4 animate-spin" />
						) : (
							<SendHorizonal className="size-4" />
						)}
						<span>
							{editingId ? t("resume.submitEdit") : t("resume.submitCreate")}
						</span>
					</Button>
				</>
			}>
			<form
				id="resume-form"
				onSubmit={onSubmit}
				className="flex flex-col gap-6">
				<Input
					label={t("resume.titleLabel")}
					value={formData.title}
					onChange={(e) => onChange("title", e.target.value)}
					maxLength={80}
					placeholder={t("resume.titlePlaceholder")}
					error={errors?.title}
				/>

				<div className="flex flex-col gap-2">
					<label className="font-semibold text-primary-text">
						{t("resume.contentLabel")}
					</label>
					<textarea
						value={formData.content}
						onChange={(e) => onChange("content", e.target.value)}
						rows={8}
						maxLength={4000}
						placeholder={t("resume.contentPlaceholder")}
						aria-invalid={Boolean(errors?.content)}
						className={cn(
							fieldClassName,
							"h-auto resize-y py-2",
							errors?.content ? "border-primary-red" : "border-border",
						)}
					/>
					{errors?.content ? (
						<p className="text-sm text-primary-red">{errors.content}</p>
					) : null}
				</div>
			</form>
		</Dialog>
	);
}
