import { useEffect, useState, type FormEvent } from "react";

// Services
import {
	resumeAPI,
	type ResumeFormObject,
	type ResumeItem,
} from "@/apps/user/features/resume/service/resumeService";

// Hooks
import { useDialogContext } from "@/app/contexts/useDialogContext";
import { useCustomMutation } from "@/shared/hooks/useCustomMutation";
import { useCustomQuery } from "@/shared/hooks/useCustomQuery";

// Utils
import { getRequiredError, sanitizeText } from "@/shared/lib/formValidation";
import { toast } from "@/shared/lib/toast";
import i18n from "@/shared/i18n";

export function useResumePage() {
	const [formData, setFormData] = useState<ResumeFormObject>({
		title: "",
		content: "",
	});
	const [editingId, setEditingId] = useState<number | string | null>(null);
	const [errors, setErrors] = useState<{ title?: string; content?: string }>({});
	const { isOpen, closeDialog, openDialog } = useDialogContext();
	const { data, isLoading } = useCustomQuery({
		key: ["resumes"],
		func: resumeAPI.getResumes,
	});
	const resumes = (data?.data ?? []) as ResumeItem[];
	const { data: singleResume, isLoading: isSinglePending } = useCustomQuery({
		key: ["single.resume", editingId],
		func: () => resumeAPI.getResumeById(editingId ?? 0),
		options: { enabled: !!editingId },
	});

	useEffect(() => {
		if (!singleResume) return;
		(() => {
			setFormData({
				title: singleResume.data.title,
				content: singleResume.data.content,
			});
			openDialog();
		})();
	}, [singleResume, openDialog]);

	const createMutation = useCustomMutation(
		resumeAPI.createResume,
		{
			onSuccess: () => {
				toast.success(i18n.t("toasts:resume.success.created"));
				closeDialog();
				setErrors({});
				setFormData({ title: "", content: "" });
			},
		},
		["resumes"],
	);
	const updateMutation = useCustomMutation(
		(vars: { id: number | string; form: ResumeFormObject }) =>
			resumeAPI.updateResume(vars.id, vars.form),
		{
			onSuccess: () => {
				toast.success(i18n.t("toasts:resume.success.updated"));
				setEditingId(null);
				setErrors({});
				setFormData({ title: "", content: "" });
			},
		},
		["resumes"],
	);
	const validate = !!(
		sanitizeText(formData.title) && sanitizeText(formData.content)
	);

	const handleChange = <K extends keyof ResumeFormObject>(
		key: K,
		value: ResumeFormObject[K],
	) => {
		setFormData((current) => ({ ...current, [key]: value }));
		setErrors((current) => ({ ...current, [key]: undefined }));
	};

	useEffect(() => {
		const reset = () => {
			setEditingId(null);
			setErrors({});
			setFormData({ title: "", content: "" });
		};
		if (isOpen) openDialog();
		else closeDialog();
		reset();
	}, [isOpen, closeDialog, openDialog]);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const payload = {
			title: sanitizeText(formData.title),
			content: sanitizeText(formData.content),
		};
		const nextErrors: { title?: string; content?: string } = {};
		if (!payload.title)
			nextErrors.title = getRequiredError(
				formData.title,
				i18n.t("resume.titleFieldName"),
			);
		if (!payload.content)
			nextErrors.content = getRequiredError(
				formData.content,
				i18n.t("resume.contentFieldName"),
			);
		if (payload.title.length > 80)
			nextErrors.title = i18n.t("resume.titleMax");
		if (payload.content.length > 4000)
			nextErrors.content = i18n.t("resume.contentMax");
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) return;
		if (editingId !== null) {
			updateMutation.mutate({ id: editingId, form: payload });
			return;
		}
		createMutation.mutate(payload);
	};

	return {
		formData,
		editingId,
		errors,
		isOpen,
		closeDialog,
		openDialog,
		resumes,
		isLoading,
		isSinglePending,
		setEditingId,
		validate,
		handleChange,
		handleSubmit,
		isPending: createMutation.isPending || updateMutation.isPending,
	};
}
