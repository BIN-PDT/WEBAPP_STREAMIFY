import { checkSchema } from "express-validator";

const schema = {
	fullName: {
		isString: { errorMessage: "Field must be a string." },
		notEmpty: { errorMessage: "Field is required." },
		trim: true,
	},
	email: {
		isString: { errorMessage: "Field must be a string." },
		notEmpty: { errorMessage: "Field is required." },
		isEmail: { errorMessage: "Field must be a valid email address." },
		trim: true,
	},
	password: {
		isString: { errorMessage: "Field must be a string." },
		notEmpty: { errorMessage: "Field is required." },
		isLength: {
			options: { min: 6 },
			errorMessage: "Field must be at least 6 characters long.",
		},
		trim: true,
	},
};

const SignupValidator = checkSchema(schema, ["body"]);

export default SignupValidator;
