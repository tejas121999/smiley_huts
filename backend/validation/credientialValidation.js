const { body, check } = require("express-validator");


exports.credientialValidation = [
    check(
        body('email')
            .exists().withMessage('Email is Required')
            .notEmpty().withMessage('Email is Required')
            .isEmail().withMessage('Email is Required')
            .isLength({ min: 5, max: 50 }).withMessage('Max length of emails is 50')
    ),

    check(
        body('name')
            .exists().withMessage('Name is Required')
            .notEmpty().withMessage('Name is Required')
            .matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic'),
    )
]