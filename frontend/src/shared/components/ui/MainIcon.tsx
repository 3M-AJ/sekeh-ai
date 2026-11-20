import iconSrc from "@/assets/sekeh-icon.png";
import { cn } from "@/shared/lib/cn";

export default function MainIcon({ className }: { className?: string }) {
	return (
		<div className={cn(className)}>
			<img
				alt=""
				className="pointer-events-none size-full select-none object-contain"
				src={iconSrc}
			/>
		</div>
	);
}
