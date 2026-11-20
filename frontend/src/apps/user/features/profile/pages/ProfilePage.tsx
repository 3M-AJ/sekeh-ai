import { useEffect } from "react";
import { Sparkles, UserRound } from "lucide-react";
import { useTranslation } from "react-i18next";

// Services
import { profileAPI } from "@/apps/user/features/profile/service/profileService";

// Components
import ChangePasswordDialog from "@/apps/user/features/profile/components/ChangePasswordDialog";
import DeleteAccountDialog from "@/apps/user/features/profile/components/DeleteAccountDialog";
import EditProfileDialog from "@/apps/user/features/profile/components/EditProfileDialog";
import PageTitle from "@/shared/components/layout/PageTitle";
import Section from "@/shared/components/layout/Section";

// Hooks
import { useCustomQuery } from "@/shared/hooks/useCustomQuery";
import useProfile from "@/apps/user/features/profile/store/profileStore";

// Utils
import { formatDate } from "@/shared/lib/date";

export default function ProfilePage() {
	const { t } = useTranslation("common");
	const { getProfile } = profileAPI;
	const { profile, setProfile } = useProfile();

	const { data, refetch } = useCustomQuery({
		key: ["prfoileInfo"],
		func: getProfile,
	});

	useEffect(() => {
		if (data?.data) {
			setProfile(data.data.user);
		}
	}, [data?.data, setProfile]);

	return (
		<Section
			title={
				<PageTitle
					icon={UserRound}
					title={t("profile.pageTitle")}
					desc={t("profile.pageDescription")}
				/>
			}
			header={
				<div className="flex flex-wrap items-center gap-2">
					<EditProfileDialog refetch={refetch} />
					<ChangePasswordDialog />
					<DeleteAccountDialog />
				</div>
			}>
			<div className="flex flex-col gap-8 max-md:items-center">
				<div className="flex items-center gap-5 max-md:flex-col">
					<div className="flex size-27 shrink-0 items-center justify-center rounded-full bg-linear-30 from-accent-hover to-match">
						<div className="flex size-25 items-center justify-center rounded-full bg-background">
							<Sparkles className="size-15 text-accent-soft" />
						</div>
					</div>
					<p className="text-4xl font-semibold text-primary-text">
						{profile?.username}
					</p>
				</div>

				<section className="flex w-fit flex-col gap-5 rounded-lg border border-border bg-background p-5 text-xl text-primary-text max-md:items-center">
					<div className="flex gap-2">
						<p className="shrink-0 font-semibold">{t("profile.emailLabel")}</p>
						<p className="truncate overflow-hidden" dir="ltr">
							{profile?.email}
						</p>
					</div>
					<div className="flex gap-2">
						<p className="shrink-0 font-semibold">{t("profile.phoneLabel")}</p>
						<p>{profile?.phone_number}</p>
					</div>
				</section>

				<footer className="flex flex-col gap-1">
					<p className="text-sm font-medium text-text-muted">
						{t("profile.joinedAt", {
							date: formatDate(profile?.created_at ?? ""),
						})}
					</p>
					{profile?.updated_at ? (
						<p className="text-sm font-medium text-text-muted">
							{t("profile.updatedAt", {
								date: formatDate(profile.updated_at),
							})}
						</p>
					) : null}
				</footer>
			</div>
		</Section>
	);
}
