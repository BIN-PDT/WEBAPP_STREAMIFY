import toast from "react-hot-toast";

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
