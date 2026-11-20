import { lazy } from "react";
import { Route } from "react-router";
import UserLayout from "@/apps/user/layouts/UserLayout";
import AuthLayout from "@/shared/components/layout/AuthLayout";

const ChatPage = lazy(
	() => import("@/apps/user/features/chat/pages/ChatPage"),
);
const ChatHistoryPage = lazy(
	() => import("@/apps/user/features/chat/pages/ChatHistoryPage"),
);
const MarksPage = lazy(
	() => import("@/apps/user/features/marks/pages/MarksPage"),
);
const ProfilePage = lazy(
	() => import("@/apps/user/features/profile/pages/ProfilePage"),
);
const ResumePage = lazy(
	() => import("@/apps/user/features/resume/pages/ResumePage"),
);
const LoginPage = lazy(
	() => import("@/apps/user/features/auth/pages/LoginPage"),
);
const SignupPage = lazy(
	() => import("@/apps/user/features/auth/pages/SignupPage"),
);
const ContactPage = lazy(
	() => import("@/apps/user/features/contact/pages/ContactPage"),
);
const LandingPage = lazy(
	() => import("@/apps/user/features/landing/pages/LandingPage"),
);

export const userRouteElements = (
	<>
		<Route index element={<LandingPage />} />

		<Route path="auth" element={<AuthLayout />}>
			<Route path="login" element={<LoginPage />} />
			<Route path="signup" element={<SignupPage />} />
		</Route>

		<Route element={<UserLayout />}>
			<Route path="chats" element={<ChatHistoryPage />} />
			<Route path="chats/:chatId" element={<ChatPage />} />
			<Route path="marks" element={<MarksPage />} />
			<Route path="profile" element={<ProfilePage />} />
			<Route path="resume" element={<ResumePage />} />
			<Route path="contact-us" element={<ContactPage />} />
		</Route>
	</>
);
