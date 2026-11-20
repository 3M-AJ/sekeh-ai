export function deepMerge<T extends Record<string, unknown>>(
	...sources: Array<T | Record<string, unknown> | undefined>
): T {
	const result: Record<string, unknown> = {};

	for (const source of sources) {
		if (!source) continue;

		for (const [key, value] of Object.entries(source)) {
			const existing = result[key];
			if (isPlainObject(value) && isPlainObject(existing)) {
				result[key] = deepMerge(existing, value);
			} else if (isPlainObject(value)) {
				result[key] = deepMerge({}, value);
			} else {
				result[key] = value;
			}
		}
	}

	return result as T;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
