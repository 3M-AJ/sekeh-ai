import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { jobsAPI } from "@/apps/admin/features/jobs/service/jobsService";
import { useCustomQuery } from "@/shared/hooks/useCustomQuery";

export function useJobsPage() {
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const queryClient = useQueryClient();
	const { data, isPending } = useCustomQuery({
		key: ["adminJobs", search, page],
		func: () => jobsAPI.jobs({ q: search, page, per_page: 20 }),
	});

	const handleSearchChange = (value: string) => {
		setPage(1);
		setSearch(value);
	};
	const handleDeleted = () =>
		queryClient.invalidateQueries({ queryKey: ["adminJobs"] });

	return {
		search,
		page,
		setPage,
		handleSearchChange,
		handleDeleted,
		data,
		jobs: data?.data.jobs ?? [],
		isPending,
	};
}
