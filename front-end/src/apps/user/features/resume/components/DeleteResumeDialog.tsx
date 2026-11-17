import { useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { LoaderCircle, X } from "lucide-react";
import { useTranslation } from "react-i18next";

// Services
import { resumeAPI } from "@/apps/user/features/resume/service/resumeService";

// Components
import Dialog from "@/shared/components/ui/Dialog";

// Hooks
import { useCustomMutation } from "@/shared/hooks/useCustomMutation";

export default function DeleteResumeDialog({ id }: { id: number | string }) {
	const { t } = useTranslation("common");
	const { mutate, isPending } = useCustomMutation(resumeAPI.deleteResume, {
		onSuccess: () => {
			if (cancelButton.current) {
				const btn = cancelButton.current as HTMLButtonElement;
				btn.click();
			}

			queryClient.invalidateQueries({ queryKey: ["resumes"] });
		},
	});
	const queryClient = useQueryClient();
	const cancelButton = useRef<HTMLButtonElement | null>(null);

	function handleDelete() {
		mutate(id);
	}

	return (
		<Dialog
			trigger={
				<div className="border-2 border-primary-red rounded-full hover:bg-primary-red transition-all duration-100 p-1 size-7 cursor-pointer hover:*:text-white">
					<X strokeWidth={1.5} className="size-full text-primary-red" />
				</div>
			}
			title={t("resume.deleteTitle")}
			footer={
				<button
					onClick={handleDelete}
					className={`py-1 px-3 border-2 border-primary-red text-primary-red rounded-md font-semibold cursor-pointer hover:bg-primary-red hover:text-white transition-all duration-150 w-20 flex items-center justify-center ${
						isPending ? "pointer-events-none" : ""
					}`}>
					{isPending ? (
						<LoaderCircle className="ttext-primary-red animate-spin" />
					) : (
						t("actions.delete")
					)}
				</button>
			}
			closeButton={
				<button
					ref={cancelButton}
					className="py-1 px-3 border-2 border-primary-action text-primary-action rounded-md font-semibold cursor-pointer hover:bg-primary-action hover:text-white transition-all duration-150">
					{t("actions.back")}
				</button>
			}>
			<p className="text-primary-action">
				{t("resume.deleteConfirmPrefix")}{" "}
				<span className="font-semibold">{t("resume.deleteIrreversible")}</span>{" "}
				{t("resume.deleteConfirmSuffix")}
			</p>
		</Dialog>
	);
}
