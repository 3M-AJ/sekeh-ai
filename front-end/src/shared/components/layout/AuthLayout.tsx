import { Outlet } from "react-router";
import Title from "@/shared/components/ui/MainTitle";
import { ThemeForce, ThemeToggle } from "@/shared/theme";

export default function AuthLayout() {
	return (
		<div className="bg-linear-300 from-accent-hover to-primary-green w-full h-dvh flex flex-row-reverse justify-end overflow-hidden p-7">
			<main className="bg-background relative w-140 rounded-lg">
				<ThemeToggle className="absolute top-4 start-4 z-10" />
				<Outlet />
			</main>
			<ThemeForce
				theme="light"
				className="fixed bottom-7 end-7 max-[1030px]:hidden">
				<Title
					wrapperClassName="flex-row-reverse"
					subColor="background"
					mianColor="accent"
					iconClass="md:size-20"
				/>
			</ThemeForce>
		</div>
	);
}
