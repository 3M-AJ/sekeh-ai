import { type FormEvent } from "react";
import { LoaderCircle, SendHorizonal } from "lucide-react";
import { useTranslation } from "react-i18next";

// Types
import type { ResumeFormObject } from "@/apps/user/features/resume/types";

// Components
import Dialog from "@/shared/components/ui/Dialog";

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
			closeButton={
				<button
					type="button"
					className="py-1 px-3 border-2 border-border text-text-muted rounded-md">
					{t("actions.back")}
				</button>
			}
			footer={
				<button
					form="resume-form"
					type="submit"
					className={`py-1 px-3 rounded-md font-semibold bg-primary-action text-white flex items-center gap-2 ${
						isPending || !validate ? "opacity-40 pointer-events-none" : ""
					}`}>
					{isPending ? (
						<LoaderCircle className="size-4 animate-spin" />
					) : (
						<SendHorizonal className="size-4" />
					)}
					<span>
						{editingId ? t("resume.submitEdit") : t("resume.submitCreate")}
					</span>
				</button>
			}>
			<form
				id="resume-form"
				onSubmit={onSubmit}
				className="flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<label className="font-semibold text-primary-text">
						{t("resume.titleLabel")}
					</label>
					<input
						value={formData.title}
						onChange={(e) => onChange("title", e.target.value)}
						maxLength={80}
						placeholder={t("resume.titlePlaceholder")}
						aria-invalid={Boolean(errors?.title)}
						className={`px-2 border-2 rounded-md h-10 placeholder:text-text-muted text-[16px] outline-0 focus:border-accent transition-all duration-150 ${errors?.title ? "border-red-500" : "border-border"}`}
					/>
					{errors?.title ? (
						<p className="text-sm text-red-500">{errors.title}</p>
					) : null}
				</div>

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
						className={`px-2 py-2 border-2 rounded-md placeholder:text-text-muted text-[16px] outline-0 focus:border-accent transition-all duration-150 resize-y ${errors?.content ? "border-red-500" : "border-border"}`}
					/>
					{errors?.content ? (
						<p className="text-sm text-red-500">{errors.content}</p>
					) : null}
				</div>
			</form>
		</Dialog>
	);
}
