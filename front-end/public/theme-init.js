(function () {
	try {
		var prefix =
			(typeof window !== "undefined" && window.__STORAGE_PREFIX__) || "sekeh";
		var key = prefix + "-theme";
		var stored = localStorage.getItem(key);
		var theme =
			stored === "light" || stored === "dark" || stored === "system"
				? stored
				: "system";
		var isDark =
			theme === "dark" ||
			(theme === "system" &&
				window.matchMedia("(prefers-color-scheme: dark)").matches);
		var root = document.documentElement;
		root.classList.toggle("dark", isDark);
		root.classList.toggle("light", !isDark);
		root.style.colorScheme = isDark ? "dark" : "light";

		var langKey = prefix + "-language";
		var lang = localStorage.getItem(langKey) || "fa";
		var rtlLocales = { fa: true };
		root.lang = lang;
		root.dir = rtlLocales[lang] ? "rtl" : "ltr";
	} catch (e) {}
})();
