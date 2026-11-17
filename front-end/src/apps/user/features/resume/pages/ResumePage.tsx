import { FileText, LoaderCircle, Pencil, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

// Components
import ResumeForm from "@/apps/user/features/resume/components/ResumeForm";
import DeleteDialog from "@/apps/user/features/resume/components/DeleteResumeDialog";
import PageTitle from "@/shared/components/layout/PageTitle";

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
		<div className="md:p-7 max-md:py-5 max-md:px-6 flex flex-col gap-8 w-full">
			<header className="flex max-md:flex-col max-md:items-start md:items-center justify-between gap-4">
				<PageTitle
					icon={FileText}
					title={t("resume.pageTitle")}
					desc={t("resume.pageDescription")}
				/>

				<div className="flex flex-wrap gap-2">
					<button
						onClick={openDialog}
						type="button"
						className="flex items-center gap-2 px-4 h-10 rounded-full bg-primary-action text-white font-semibold cursor-pointer">
						<Plus className="size-4" />
						<span>{t("resume.add")}</span>
					</button>
				</div>
			</header>

			<section className="flex flex-col gap-4">
				{isLoading ? (
					<div className="flex items-center justify-center py-10">
						<LoaderCircle className="size-6 animate-spin text-accent" />
					</div>
				) : resumes.length === 0 ? (
					<div className="rounded-lg border border-dashed border-border p-8 text-center text-text-muted">
						{t("resume.empty")}
					</div>
				) : (
					<div className="flex flex-col gap-3">
						{resumes.map((resume) => (
							<div
								key={resume.id}
								className="border border-border rounded-lg p-4 flex flex-col gap-3 bg-background">
								<div className="flex items-start justify-between gap-3">
									<div>
										<p className="font-semibold text-primary-text">
											{resume.title}
										</p>
										<p className="text-sm text-text-muted mt-1 line-clamp-3">
											{resume.content}
										</p>
									</div>
								</div>

								<div className="flex flex-wrap gap-2">
									<button
										type="button"
										onClick={() => setEditingId(resume.id)}
										className="flex items-center gap-1 px-3 h-9 rounded-full border border-border cursor-pointer">
										{!isSinglePending ? (
											<>
												<Pencil className="size-4" />
												<p>{t("resume.edit")}</p>
											</>
										) : (
											<LoaderCircle className="size-5 animate-spin" />
										)}
									</button>
									<DeleteDialog id={resume.id} />
								</div>
							</div>
						))}
					</div>
				)}
			</section>

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
		</div>
	);
}
