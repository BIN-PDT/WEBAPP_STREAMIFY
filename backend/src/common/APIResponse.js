class APIResponse {
	constructor(statusCode, success = true) {
		this.statusCode = statusCode;
		this.success = success;
		this.message = null;
		this.data = null;
		this.errors = null;
	}

	setMessage(value) {
		this.message = value;
		return this;
	}

	setData(value) {
		this.data = value;
		return this;
	}

	setErrors(value) {
		this.errors = value;
		return this;
	}

	send(response) {
		return response.status(this.statusCode).json({
			statusCode: this.statusCode,
			success: this.success,
			message: this.message,
			data: this.data,
			errors: this.errors,
		});
	}
}

export default APIResponse;
