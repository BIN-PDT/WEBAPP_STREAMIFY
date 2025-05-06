import { checkSchema } from "express-validator";

const schema = {
	email: {
		isString: { errorMessage: "Field must be a string." },
		notEmpty: { errorMessage: "Field is required." },
		isEmail: { errorMessage: "Field must be a valid email address." },
		trim: true,
	},
	password: {
		isString: { errorMessage: "Field must be a string." },
		notEmpty: { errorMessage: "Field is required." },
		trim: true,
	},
};

const SigninValidator = checkSchema(schema, ["body"]);

export default SigninValidator;
