import { Suspense } from "react";
import { Routes, Route } from "react-router";

// Components
import RouteLoading from "@/shared/components/feedback/RouteLoading";
import { NotFoundPage } from "@/shared/components/layout";

// Utils
import { userRouteElements } from "@/apps/user/router/router";
import { adminRouteElements } from "@/apps/admin/router/router";

export default function AppRouter() {
	return (
		<Suspense fallback={<RouteLoading />}>
			<Routes>
				{userRouteElements}
				{adminRouteElements}
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</Suspense>
	);
}
