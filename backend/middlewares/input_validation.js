import {
    validationResult,
    body,
    query,
    param,
    oneOf,
} from 'express-validator'
import BaseError from '../utils/base_error.js'
import errorMessage from '../configs/error_messages.js'
import validator from 'validator'

const checkExpressValidator = (req) => {
    let result = validationResult(req)

    if (result.isEmpty()) return

    let errors = result.array()

    if (errors.length === 1) {
        let error = errors[0]
        throw new BaseError(error.value === undefined ? errorMessage.INVALID_INPUT : error.msg, 400)
    }

    throw new BaseError(errorMessage.INVALID_INPUT, 400)
}

const checkValidation = (req, res, next) => { // the function "custom validator" return a error or null
    try {
        checkExpressValidator(req)
    } catch (error) {
        return next(error)
    }

    next()
}


// check empty
const checkEmptyFieldsInBody = (...fields) => {
    return fields.map((field) => body(field).notEmpty())
}
const checkEmptyFieldsInQuery = (...fields) => {
    return fields.map((field) => query(field).notEmpty())
}
const checkEmptyFieldsInParams = (...fields) => {
    return fields.map((field) => param(field).notEmpty())
}


// check number
const checkIsNumberInBody = (...fields) => {
    return body(fields).isNumeric()
}
const checkIsNumberInQuery = (...fields) => {
    return query(fields).isNumeric()
}


// check email
const checkIsEmailInBody = (field = 'email') => {
    return body(field).isEmail().withMessage('Not a valid e-mail address').toLowerCase()
}
const checkIsEmailInQuery = (field = 'email') => {
    return query(field).isEmail().withMessage('Not a valid e-mail address').toLowerCase()
}
const checkIsEmailInParams = (field = 'email') => {
    return param(field).isEmail().withMessage('Not a valid e-mail address').toLowerCase()
}


// check mongo id
const checkIsMongoIdInBody = (...fields) => {
    return fields.map((field) => body(field).isMongoId())
}
const checkIsMongoIdInQuery = (...fields) => {
    return fields.map((field) => query(field).isMongoId())
}
const checkIsMongoIdInParams = (...fields) => {
    return fields.map((field) => param(field).isMongoId())
}
const checkIsMongoIdListInBody = (field) => (req, res, next) => {
    let id_list = req.body[field]

    for (let id of id_list) {
        if (!validator.isMongoId(id))
            return next(new BaseError('Invalid input'))
    }

    next()
}


// check JSON array
const checkIsArrayInJSONBody = (...fields) => {
    return body(fields).isJSON().custom((value, { req }) => {
        return Array.isArray(JSON.parse(value))
    })
}


// check array
const checkIsArrayInBody = (...fields) => {
    return body(fields).isArray()
}


const checkOneOf = (validations) => {
    return oneOf(validations)
}


// check optional
const checkOptional = (validations, values = 'undefined') => {
    return validations.optional({ values })
}


const checkIsEmpty = (value) => value === undefined || value === '' || value === null || value === NaN

export {
    checkValidation,
    checkEmptyFieldsInBody,
    checkEmptyFieldsInQuery,
    checkEmptyFieldsInParams,
    checkOneOf,
    checkIsEmailInBody,
    checkIsEmailInQuery,
    checkIsEmailInParams,
    checkIsArrayInBody,
    checkIsNumberInBody,
    checkIsNumberInQuery,
    checkIsEmpty,
    checkIsMongoIdInBody,
    checkIsMongoIdInQuery,
    checkIsMongoIdInParams,
    checkIsMongoIdListInBody,
    checkIsArrayInJSONBody,
    checkOptional,
}