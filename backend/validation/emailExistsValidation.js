const { body, check } = require("express-validator");


exports.emailExistsValidation = [
    check(
        body('email')
            .exists().withMessage('Email is Required')
            .notEmpty().withMessage('Email is Required')
            .isEmail().withMessage('Email is Required')
            .isLength({ min: 5, max: 50 }).withMessage('Max length of emails is 50')
    )
]