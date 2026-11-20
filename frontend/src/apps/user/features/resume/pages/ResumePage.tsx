import { FileText, LoaderCircle, Pencil, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

// Components
import ResumeForm from "@/apps/user/features/resume/components/ResumeForm";
import DeleteDialog from "@/apps/user/features/resume/components/DeleteResumeDialog";
import PageTitle from "@/shared/components/layout/PageTitle";
import Section from "@/shared/components/layout/Section";
import GrowableButton from "@/shared/components/ui/GrowableButton";
import Button from "@/shared/components/ui/Button";
import EmptyState from "@/shared/components/feedback/EmptyState";
import { ResumeListSkeleton } from "@/shared/components/feedback/Skeleton";

// Hooks
import { useResumePage } from "@/apps/user/features/resume/hooks/useResumePage";

export default function ResumePage() {
	const { t } = useTranslation("common");
	const {
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
		isPending,
	} = useResumePage();

	return (
		<>
			<Section
				title={
					<PageTitle
						icon={FileText}
						title={t("resume.pageTitle")}
						desc={t("resume.pageDescription")}
					/>
				}
				header={
					<GrowableButton
						onClick={openDialog}
						label={t("resume.add")}
						icon={
							<Plus
								strokeWidth={1.5}
								className="size-5 text-primary-action transition-colors duration-200 group-hover:text-on-accent group-focus-visible:text-on-accent"
							/>
						}
					/>
				}>
				{isLoading ? (
					<ResumeListSkeleton />
				) : resumes.length === 0 ? (
					<EmptyState message={t("resume.empty")} icon={FileText} />
				) : (
					<div className="flex flex-col gap-3">
						{resumes.map((resume) => (
							<div
								key={resume.id}
								className="flex flex-col gap-3 rounded-lg border border-border bg-background p-4">
								<div>
									<p className="font-semibold text-primary-text">
										{resume.title}
									</p>
									<p className="mt-1 line-clamp-3 text-sm text-text-muted">
										{resume.content}
									</p>
								</div>

								<div className="flex flex-wrap gap-2">
									<Button
										type="button"
										variant="outline"
										size="sm"
										onClick={() => setEditingId(resume.id)}
										disabled={isSinglePending}>
										{!isSinglePending ? (
											<>
												<Pencil className="size-4" />
												<span>{t("resume.edit")}</span>
											</>
										) : (
											<LoaderCircle className="size-5 animate-spin" />
										)}
									</Button>
									<DeleteDialog id={resume.id} />
								</div>
							</div>
						))}
					</div>
				)}
			</Section>

			<ResumeForm
				open={isOpen}
				onClose={closeDialog}
				editingId={editingId}
				formData={formData}
				onChange={handleChange}
				onSubmit={handleSubmit}
				validate={validate}
				isPending={isPending}
				errors={errors}
			/>
		</>
	);
}
