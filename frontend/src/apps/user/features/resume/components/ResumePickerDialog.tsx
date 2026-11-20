import { FileText, MessageSquarePlus } from "lucide-react";
import { useTranslation } from "react-i18next";

// Services
import {
	resumeAPI,
	type ResumeItem,
} from "@/apps/user/features/resume/service/resumeService";

// Components
import Dialog from "@/shared/components/ui/Dialog";
import Button from "@/shared/components/ui/Button";
import EmptyState from "@/shared/components/feedback/EmptyState";
import LoadingBlock from "@/shared/components/feedback/LoadingBlock";

// Hooks
import { useDialogContext } from "@/app/contexts/useDialogContext";
import { useCustomQuery } from "@/shared/hooks/useCustomQuery";

interface ResumeModalProps {
	onSelectResume: (id: number | string) => void;
}

export default function ResumePickerDialog({
	onSelectResume,
}: ResumeModalProps) {
	const { t } = useTranslation("common");
	const dialog = useDialogContext();
	const { data, isLoading } = useCustomQuery({
		key: ["resumes"],
		func: resumeAPI.getResumes,
	});

	const resumes = (data?.data ?? []) as ResumeItem[];

	const handleSelect = (resume: ResumeItem) => {
		onSelectResume(resume.id);
		dialog.closeDialog();
	};

	return (
		<Dialog
			trigger={
				<Button
					variant="outline"
					size="icon"
					aria-label={t("resume.pickerTitle")}
					className="shrink-0">
					<FileText className="size-4" />
				</Button>
			}
			title={t("resume.pickerTitle")}>
			<div className="flex min-w-[280px] flex-col gap-3">
				{isLoading ? (
					<LoadingBlock />
				) : resumes.length === 0 ? (
					<EmptyState message={t("resume.empty")} dashed />
				) : (
					<div className="flex flex-col gap-3">
						{resumes.map((resume) => (
							<button
								type="button"
								key={resume.id}
								onClick={() => handleSelect(resume)}
								className="cursor-pointer rounded-lg border border-border bg-background p-4 text-end transition-colors duration-150 hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
								<div className="flex items-center gap-2 text-accent">
									<MessageSquarePlus className="size-4" />
									<span className="font-semibold text-primary-text">
										{resume.title}
									</span>
								</div>
								<p className="mt-2 line-clamp-3 text-sm text-text-muted">
									{resume.content}
								</p>
							</button>
						))}
					</div>
				)}
			</div>
		</Dialog>
	);
}
