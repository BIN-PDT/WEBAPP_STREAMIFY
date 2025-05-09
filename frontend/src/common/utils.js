import toast from "react-hot-toast";
import { TIME_INTERVALS } from "./constants";

export function capitialize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toastErrorMessage({ message, errors }) {
	const errorMessage =
		message ||
		Object.entries(Object.values(errors)[0])
			.flatMap(([field, lines]) => {
				const title = capitialize(field);
				return lines.map((line) => `${line.replace(/Field/gi, title)}`);
			})
			.join("\n");

	toast(errorMessage, { className: "error-message", duration: 10000 });
}

export function timeSince(dateString) {
	const now = new Date();
	const date = new Date(dateString);
	const seconds = Math.floor((now - date) / 1000);

	for (const interval of TIME_INTERVALS) {
		const count = Math.floor(seconds / interval.seconds);
		if (count > 0) {
			return count === 1
				? `1 ${interval.label} ago`
				: `${count} ${interval.label}s ago`;
		}
	}
	return "Recently";
}
