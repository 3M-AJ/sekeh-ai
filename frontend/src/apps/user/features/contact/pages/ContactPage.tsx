import { Mail, BookOpen, GraduationCap, Github } from "lucide-react";
import { useTranslation } from "react-i18next";

// Components
import PageTitle from "@/shared/components/layout/PageTitle";
import Section from "@/shared/components/layout/Section";

export default function ContactPage() {
	const { t } = useTranslation("common");

	return (
		<Section
			title={
				<PageTitle
					icon={BookOpen}
					title={t("contact.title")}
					desc={t("contact.subtitle")}
				/>
			}>
			<div className="grid gap-5 sm:grid-cols-2">
				<div className="flex flex-col gap-4 rounded-lg border border-border bg-background p-5">
					<div className="flex items-center gap-3">
						<Mail className="size-5 text-primary-action" />
						<div>
							<p className="font-semibold text-primary-text">
								{t("contact.emailsTitle")}
							</p>
							<p className="text-sm text-text-muted">
								{t("contact.emailsSubtitle")}
							</p>
						</div>
					</div>
					<div className="flex flex-col gap-2 text-sm text-primary-text">
						<p>mohsenmahmoudi79@gmail.com</p>
						<p>moamini8343@gmail.com</p>
					</div>
				</div>

				<div className="flex flex-col gap-4 rounded-lg border border-border bg-background p-5">
					<div className="flex items-center gap-3">
						<Github className="size-5 text-primary-action" />
						<div>
							<p className="font-semibold text-primary-text">
								{t("contact.githubTitle")}
							</p>
							<p className="text-sm text-text-muted">
								{t("contact.githubSubtitle")}
							</p>
						</div>
					</div>
					<a
						href="https://github.com/Moh3n31/sekeh_front"
						target="_blank"
						rel="noreferrer"
						className="text-sm font-semibold text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
						https://github.com/Moh3n31/sekeh_front
					</a>
					<a
						href="https://github.com/Astr0Net/3k-backend"
						target="_blank"
						rel="noreferrer"
						className="text-sm font-semibold text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
						https://github.com/Astr0Net/3k-backend
					</a>
				</div>

				<div className="flex flex-col gap-4 rounded-lg border border-border bg-background p-5 sm:col-span-2">
					<div className="flex items-center gap-3">
						<GraduationCap className="size-5 text-primary-action" />
						<div>
							<p className="font-semibold text-primary-text">
								{t("contact.projectDetailsTitle")}
							</p>
							<p className="text-sm text-text-muted">
								{t("contact.projectDetailsSubtitle")}
							</p>
						</div>
					</div>
					<p className="text-sm leading-7 text-primary-text">
						{t("contact.projectDetailsBody")}
					</p>
				</div>
			</div>
		</Section>
	);
}
