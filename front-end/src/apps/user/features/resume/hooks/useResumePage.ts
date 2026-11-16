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
				toast.success("رزومه جدید با موفقیت ثبت شد.");
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
				toast.success("رزومه با موفقیت ویرایش شد.");
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
			nextErrors.title = getRequiredError(formData.title, "عنوان");
		if (!payload.content)
			nextErrors.content = getRequiredError(formData.content, "محتوا");
		if (payload.title.length > 80)
			nextErrors.title = "عنوان نباید بیشتر از 80 کاراکتر باشد.";
		if (payload.content.length > 4000)
			nextErrors.content = "محتوا نباید بیشتر از 4000 کاراکتر باشد.";
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
