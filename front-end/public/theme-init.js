(function () {
	try {
		var key = "sekeh-theme";
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
	} catch (e) {}
})();
