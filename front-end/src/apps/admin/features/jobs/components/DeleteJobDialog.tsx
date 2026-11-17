import { useRef } from "react";
import { LoaderCircle, X } from "lucide-react";
import { useTranslation } from "react-i18next";

// Services
import { jobsAPI } from "@/apps/admin/features/jobs/service/jobsService";

// Components
import Dialog from "@/shared/components/ui/Dialog";

// Hooks
import { useCustomMutation } from "@/shared/hooks/useCustomMutation";

interface DeleteJobDialogProps {
	id: number;
	title: string;
	onDeleted: () => void;
}

export default function DeleteJobDialog({
	id,
	title,
	onDeleted,
}: DeleteJobDialogProps) {
	const { t } = useTranslation("common");
	const { mutate, isPending } = useCustomMutation(jobsAPI.deleteJob, {
		onSuccess: () => {
			if (cancelButton.current) {
				(cancelButton.current as HTMLButtonElement).click();
			}
			onDeleted();
		},
	});
	const cancelButton = useRef(null);

	function handleDelete() {
		mutate(id);
	}

	return (
		<Dialog
			trigger={
				<div
					className="border-2 border-primary-red rounded-full hover:bg-primary-red transition-all duration-100 p-0.5 size-7 cursor-pointer
					hover:*:text-white">
					<X className="size-full text-primary-red" />
				</div>
			}
			title={t("admin.deleteJobTitle")}
			footer={
				<button
					onClick={handleDelete}
					className={`py-1 px-3 border-2 border-primary-red text-primary-red rounded-md font-semibold cursor-pointer
						hover:bg-primary-red hover:text-white transition-all duration-150 w-20 flex items-center justify-center
						${isPending ? "pointer-events-none" : ""}`}>
					{isPending ? (
						<LoaderCircle className="text-primary-red animate-spin" />
					) : (
						t("actions.delete")
					)}
				</button>
			}
			closeButton={
				<button
					ref={cancelButton}
					className="py-1 px-3 border-2 border-primary-action text-primary-action rounded-md font-semibold cursor-pointer
					hover:bg-primary-action hover:text-white transition-all duration-150">
					{t("actions.cancel")}
				</button>
			}>
			<p className="text-primary-action">
				{t("admin.deleteJobBody", { title })}
			</p>
		</Dialog>
	);
}
