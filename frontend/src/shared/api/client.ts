import axios from "axios";
import type { AxiosResponse } from "axios";
import i18n from "@/shared/i18n";
import { toast } from "@/shared/lib/toast";
import { removeTokens } from "@/shared/lib/authTokens";
import { getStorageItem, setStorageItem } from "@/shared/lib/storage";

interface ApiResponse<T> {
	status: "200" | "201";
	message: string;
	data: T;
}
interface Exceptions {
	status: "401" | "500" | "404";
	error: string;
	data: null;
}

interface RefreshTokenResponse {
	data: {
		accessToken: string;
		refreshToken: string;
	};
}

export const api = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL}api`,
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use((config) => {
	const token = getStorageItem("accessToken");
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

const getNewToken = async () => {
	const refreshToken = getStorageItem("refreshToken");

	const res = await axios.post<
		RefreshTokenResponse,
		AxiosResponse<RefreshTokenResponse>
	>(
		`${import.meta.env.VITE_API_URL}api/auth/refresh`,
		{},
		{
			headers: {
				Authorization: `Bearer ${refreshToken}`,
			},
		},
	);
	return res.data;
};

api.interceptors.response.use(
	(response) => response.data,
	async (error) => {
		const originalRequest = error.config;

		if (
			!error.request.responseURL.includes("login") &&
			error.response?.status === 401 &&
			!originalRequest._retry
		) {
			originalRequest._retry = true;

			try {
				const refreshResponse = await getNewToken();

				const { accessToken, refreshToken } = refreshResponse.data;

				setStorageItem("accessToken", accessToken);
				setStorageItem("refreshToken", refreshToken);

				originalRequest.headers.Authorization = `Bearer ${accessToken}`;

				return api(originalRequest);
			} catch (err) {
				removeTokens();

				toast.error(i18n.t("toasts:auth.error.reloginRequired"));

				setTimeout(() => {
					window.dispatchEvent(new Event("unauthorized"));
				}, 1000);

				return Promise.reject(err);
			}
		}

		const message = error.data?.message || error.data?.error || null;

		if (message) toast.error(message);

		return Promise.reject(error);
	},
);

export type { Exceptions, ApiResponse };
