import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { usersAPI } from "@/apps/admin/features/users/service/usersService";
import { useCustomQuery } from "@/shared/hooks/useCustomQuery";

export function useUsersPage() {
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const queryClient = useQueryClient();
	const { data, isPending } = useCustomQuery({
		key: ["adminUsers", search, page],
		func: () => usersAPI.users({ q: search, page, per_page: 20 }),
	});

	const handleSearchChange = (value: string) => {
		setPage(1);
		setSearch(value);
	};
	const handleDeleted = () =>
		queryClient.invalidateQueries({ queryKey: ["adminUsers"] });

	return {
		search,
		page,
		setPage,
		handleSearchChange,
		handleDeleted,
		data,
		users: data?.data.users ?? [],
		isPending,
	};
}
