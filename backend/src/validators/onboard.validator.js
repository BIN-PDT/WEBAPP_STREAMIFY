import { checkSchema } from "express-validator";

const schema = {
	fullName: {
		isString: { errorMessage: "Field must be a string." },
		notEmpty: { errorMessage: "Field is required." },
		trim: true,
	},
	bio: {
		isString: { errorMessage: "Field must be a string." },
		notEmpty: { errorMessage: "Field is required." },
		trim: true,
	},
	nativeLanguage: {
		isString: { errorMessage: "Field must be a string." },
		notEmpty: { errorMessage: "Field is required." },
		trim: true,
	},
	learningLanguage: {
		isString: { errorMessage: "Field must be a string." },
		notEmpty: { errorMessage: "Field is required." },
		trim: true,
	},
	location: {
		isString: { errorMessage: "Field must be a string." },
		notEmpty: { errorMessage: "Field is required." },
		trim: true,
	},
};

const OnboardValidator = checkSchema(schema, ["body"]);

export default OnboardValidator;
