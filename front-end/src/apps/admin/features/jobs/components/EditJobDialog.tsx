import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { LoaderCircle, PenBoxIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

// Types
import type { AdminJob } from "@/apps/admin/features/jobs/types";

// Services
import { jobsAPI } from "@/apps/admin/features/jobs/service/jobsService";

// Components
import Dialog from "@/shared/components/ui/Dialog";

// Hooks
import { useCustomMutation } from "@/shared/hooks/useCustomMutation";

interface EditJobDialogProps {
	job: AdminJob;
}

function Field({
	label,
	value,
	onChange,
}: {
	label: string;
	value: string;
	onChange: (v: string) => void;
}) {
	return (
		<div className="flex flex-col gap-1">
			<label className="text-[14px] text-primary-action font-semibold">
				{label}
			</label>
			<input
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="border-2 border-border rounded-md h-9 px-2 outline-0 focus:border-accent transition-all duration-150 text-[14px]"
			/>
		</div>
	);
}

export default function EditJobDialog({ job }: EditJobDialogProps) {
	const { t } = useTranslation("common");
	const queryClient = useQueryClient();
	const cancelButton = useRef(null);

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
			if (cancelButton.current) {
				(cancelButton.current as HTMLButtonElement).click();
			}
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
				<div
					onClick={loadFullJob}
					className="border-2 border-primary-action rounded-full hover:bg-primary-action transition-all duration-100 p-1 size-7 cursor-pointer
					hover:*:text-white">
					<PenBoxIcon className="size-full text-primary-action" />
				</div>
			}
			title={t("admin.editJobTitle")}
			footer={
				<button
					onClick={handleSubmit}
					className={`py-1 px-3 border-2 border-accent text-accent rounded-md font-semibold cursor-pointer
					hover:bg-accent hover:text-white transition-all duration-150 w-20 flex items-center justify-center
					${isPending ? "pointer-events-none" : ""}`}>
					{isPending ? (
						<LoaderCircle className="text-accent animate-spin" />
					) : (
						t("actions.save")
					)}
				</button>
			}
			closeButton={
				<button
					ref={cancelButton}
					className="py-1 px-3 border-2 border-primary-action text-primary-action rounded-md font-semibold cursor-pointer
					hover:bg-primary-action hover:text-white transition-all duration-150">
					{t("actions.back")}
				</button>
			}>
			<div className="flex flex-col gap-3">
				<div className="grid grid-cols-2 gap-3">
					<Field
						label={t("admin.fieldTitle")}
						value={form.job_title}
						onChange={(v) => setForm({ ...form, job_title: v })}
					/>
					<Field
						label={t("admin.fieldCompany")}
						value={form.company_name}
						onChange={(v) => setForm({ ...form, company_name: v })}
					/>
					<Field
						label={t("admin.fieldLocation")}
						value={form.location}
						onChange={(v) => setForm({ ...form, location: v })}
					/>
					<Field
						label={t("admin.fieldPaycheck")}
						value={form.paycheck}
						onChange={(v) => setForm({ ...form, paycheck: v })}
					/>
					<Field
						label={t("admin.fieldSource")}
						value={form.source_site}
						onChange={(v) => setForm({ ...form, source_site: v })}
					/>
				</div>

				<Field
					label={t("admin.fieldRequirements")}
					value={form.requirements}
					onChange={(v) => setForm({ ...form, requirements: v })}
				/>

				<div className="flex flex-col gap-2">
					<label className="text-[14px] text-primary-action font-semibold">
						{t("admin.fieldRawText")}
					</label>
					<textarea
						value={form.raw_text}
						onChange={(e) => setForm({ ...form, raw_text: e.target.value })}
						rows={6}
						className="border-2 border-border rounded-md p-2 outline-0 focus:border-accent transition-all duration-150 text-[14px] resize-none"
					/>
				</div>
			</div>
		</Dialog>
	);
}
