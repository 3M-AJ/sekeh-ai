import { getStorageItem, removeStorageItem, setStorageItem } from "./storage";

interface AuthTokens {
	access: string;
	refresh: string;
}

export const addTokens = ({ access, refresh }: AuthTokens) => {
	setStorageItem("accessToken", access);
	setStorageItem("refreshToken", refresh);
};

export const removeTokens = () => {
	removeStorageItem("accessToken");
	removeStorageItem("refreshToken");
};

export const checkTokens = (): boolean => {
	return !!(getStorageItem("accessToken") && getStorageItem("refreshToken"));
};
