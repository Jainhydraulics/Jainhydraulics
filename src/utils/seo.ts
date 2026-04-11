export function slugifySegment(value: string) {
	return value
		.normalize("NFKD")
		replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.replace(/-{2,}/g, "-");
}

export function humanizeSlug(value: string) {
	return value
		.split("-")
		.filter(Boolean)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

export function toAbsoluteUrl(value: string | URL, site?: URL) {
	if (value instanceof URL) {
		return value.toString();
	}

	if (/^https?:\/\//.test(value)) {
		return value;
	}

	if (!site) {
		return value;
	}

	return new URL(value, site).toString();
}
