import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

// Services
import { usersAPI } from "@/apps/admin/features/users/service/usersService";

// Components
import Dialog from "@/shared/components/ui/Dialog";
import DialogIconTrigger from "@/shared/components/ui/DialogIconTrigger";
import DialogFooterActions from "@/shared/components/ui/DialogFooterActions";

// Hooks
import { useDialogContext } from "@/app/contexts/useDialogContext";
import { useCustomMutation } from "@/shared/hooks/useCustomMutation";

interface DeleteUserDialogProps {
	id: number;
	username: string;
	onDeleted: () => void;
}

export default function DeleteUserDialog({
	id,
	username,
	onDeleted,
}: DeleteUserDialogProps) {
	const { t } = useTranslation("common");
	const { closeDialog } = useDialogContext();
	const { mutate, isPending } = useCustomMutation(usersAPI.deleteUser, {
		onSuccess: () => {
			closeDialog();
			onDeleted();
		},
	});

	return (
		<Dialog
			trigger={
				<DialogIconTrigger
					variant="destructive"
					label={t("actions.delete")}
					icon={<X />}
				/>
			}
			title={t("admin.deleteUserTitle")}
			footer={
				<DialogFooterActions
					onConfirm={() => mutate(id)}
					isPending={isPending}
					cancelLabel={t("actions.cancel")}
				/>
			}>
			<p className="text-primary-text">
				{t("admin.deleteUserBody", { username })}
			</p>
		</Dialog>
	);
}
