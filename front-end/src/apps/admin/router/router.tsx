import { lazy } from "react";
import { Navigate, Route } from "react-router";
import AdminLayout from "@/apps/admin/layouts/AdminLayout";

const DashboardPage = lazy(
	() => import("@/apps/admin/features/dashboard/pages/DashboardPage"),
);
const UsersPage = lazy(
	() => import("@/apps/admin/features/users/pages/UsersPage"),
);
const JobsPage = lazy(
	() => import("@/apps/admin/features/jobs/pages/JobsPage"),
);

export const adminRouteElements = (
	<Route path="admin" element={<AdminLayout />}>
		<Route index element={<Navigate to="dashboard" replace />} />
		<Route path="dashboard" element={<DashboardPage />} />
		<Route path="users" element={<UsersPage />} />
		<Route path="jobs" element={<JobsPage />} />
	</Route>
);
