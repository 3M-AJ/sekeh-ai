import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { PenBoxIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

// Types
import type { AdminJob } from "@/apps/admin/features/jobs/types";

// Services
import { jobsAPI } from "@/apps/admin/features/jobs/service/jobsService";

// Components
import Dialog from "@/shared/components/ui/Dialog";
import DialogIconTrigger from "@/shared/components/ui/DialogIconTrigger";
import DialogFooterActions from "@/shared/components/ui/DialogFooterActions";
import Input from "@/shared/components/ui/Input";

// Hooks
import { useDialogContext } from "@/app/contexts/useDialogContext";
import { useCustomMutation } from "@/shared/hooks/useCustomMutation";
import { cn } from "@/shared/lib/cn";
import { fieldClassName } from "@/shared/components/ui/Input";

interface EditJobDialogProps {
	job: AdminJob;
}

export default function EditJobDialog({ job }: EditJobDialogProps) {
	const { t } = useTranslation("common");
	const queryClient = useQueryClient();
	const { closeDialog } = useDialogContext();

	const [form, setForm] = useState({
		job_title: job.job_title ?? "",
		company_name: job.company_name ?? "",
		location: job.location ?? "",
		paycheck: job.paycheck ?? "",
		source_site: job.source_site ?? "",
		requirements: Array.isArray(job.requirements)
			? job.requirements.join(", ")
			: "",
		raw_text: "",
	});
	const [loadedRawText, setLoadedRawText] = useState(false);

	async function loadFullJob() {
		if (loadedRawText) return;
		const res = await jobsAPI.job(job.job_id);
		setForm((prev) => ({ ...prev, raw_text: res.data.raw_text }));
		setLoadedRawText(true);
	}

	const { mutate, isPending } = useCustomMutation(jobsAPI.updateJob, {
		onSuccess: () => {
			closeDialog();
			queryClient.invalidateQueries({ queryKey: ["adminJobs"] });
		},
	});

	function handleSubmit() {
		mutate({
			job_id: job.job_id,
			payload: {
				job_title: form.job_title,
				company_name: form.company_name,
				location: form.location,
				paycheck: form.paycheck,
				source_site: form.source_site,
				requirements: form.requirements
					.split(",")
					.map((r) => r.trim())
					.filter(Boolean),
				raw_text: form.raw_text,
			},
		});
	}

	return (
		<Dialog
			variant="fullscreen"
			trigger={
				<DialogIconTrigger
					label={t("admin.editJobTitle")}
					icon={<PenBoxIcon />}
					onClick={loadFullJob}
				/>
			}
			title={t("admin.editJobTitle")}
			footer={
				<DialogFooterActions
					onConfirm={handleSubmit}
					isPending={isPending}
					confirmLabel={t("actions.save")}
					confirmVariant="default"
				/>
			}>
			<div className="flex flex-col gap-3">
				<div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
					<Input
						label={t("admin.fieldTitle")}
						value={form.job_title}
						onChange={(e) => setForm({ ...form, job_title: e.target.value })}
					/>
					<Input
						label={t("admin.fieldCompany")}
						value={form.company_name}
						onChange={(e) => setForm({ ...form, company_name: e.target.value })}
					/>
					<Input
						label={t("admin.fieldLocation")}
						value={form.location}
						onChange={(e) => setForm({ ...form, location: e.target.value })}
					/>
					<Input
						label={t("admin.fieldPaycheck")}
						value={form.paycheck}
						onChange={(e) => setForm({ ...form, paycheck: e.target.value })}
					/>
					<Input
						label={t("admin.fieldSource")}
						value={form.source_site}
						onChange={(e) => setForm({ ...form, source_site: e.target.value })}
					/>
				</div>

				<Input
					label={t("admin.fieldRequirements")}
					value={form.requirements}
					onChange={(e) => setForm({ ...form, requirements: e.target.value })}
				/>

				<div className="flex flex-col gap-2">
					<label className="font-semibold text-primary-text">
						{t("admin.fieldRawText")}
					</label>
					<textarea
						value={form.raw_text}
						onChange={(e) => setForm({ ...form, raw_text: e.target.value })}
						rows={6}
						className={cn(fieldClassName, "h-auto resize-none border-border py-2")}
					/>
				</div>
			</div>
		</Dialog>
	);
}
