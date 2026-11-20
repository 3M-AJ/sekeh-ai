import { MarkAPI } from "@/apps/user/features/marks/service/marksService";
import { useCustomQuery } from "@/shared/hooks/useCustomQuery";

export function useMarksPage() {
	const { data } = useCustomQuery({
		func: MarkAPI.allMarked,
		key: ["allMarked"],
	});
	return { all: data?.data.bookmarks ?? [] };
}
