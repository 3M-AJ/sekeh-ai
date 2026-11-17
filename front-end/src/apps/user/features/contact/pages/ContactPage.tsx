import { Mail, BookOpen, GraduationCap } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ContactPage() {
	const { t } = useTranslation("common");

	return (
		<div className="flex items-center justify-center px-4 py-10">
			<div className="w-full max-w-3xl rounded-3xl border border-border bg-background p-8 shadow-lg shadow-border flex flex-col gap-8">
				<div className="flex items-center gap-5 text-primary-action">
					<BookOpen className="size-6" />
					<div className="flex flex-col items-start gap-3">
						<p className="text-3xl font-bold">{t("contact.title")}</p>
						<p className="text-sm text-text-muted">{t("contact.subtitle")}</p>
					</div>
				</div>

				<div className="grid gap-6 sm:grid-cols-2">
					<div className="rounded-2xl border border-border bg-surface p-5 flex flex-col gap-4">
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
						<div className="flex flex-col gap-2 text-primary-text text-sm">
							<p>mohsenmahmoudi79@gmail.com</p>
							<p>moamini8343@gmail.com</p>
						</div>
					</div>

					<div className="rounded-2xl border border-border bg-surface p-5 flex flex-col gap-4">
						<div className="flex items-center gap-3">
							{/* <Github className="size-5 text-primary-action" /> */}
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
							className="text-sm font-semibold text-accent hover:underline">
							https://github.com/Moh3n31/sekeh_front
						</a>
						<a
							href="https://github.com/Astr0Net/3k-backend"
							target="_blank"
							rel="noreferrer"
							className="text-sm font-semibold text-accent hover:underline">
							https://github.com/Astr0Net/3k-backend
						</a>
					</div>
				</div>

				<div className="rounded-2xl border border-border bg-surface p-5 flex flex-col gap-4">
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
					<p className="text-sm text-primary-text leading-7">
						{t("contact.projectDetailsBody")}
					</p>
				</div>
			</div>
		</div>
	);
}
