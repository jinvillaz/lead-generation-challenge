import { Request, Response } from 'express'
import log4js from 'log4js'
import { schemaValidator } from './schema'
import mongoose from 'mongoose'
import { CognitoIdentityServiceProvider } from 'aws-sdk'
import { BodyUser } from '../../models/user'

const logger = log4js.getLogger('UsersHandler')
logger.level = 'debug'
const BAD_REQUEST = 400
const USER = 'User'
const cognito = new CognitoIdentityServiceProvider({ region: 'us-east-1' })

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const dataToValidate = req.body as BodyUser
    await schemaValidator.validate(dataToValidate, { abortEarly: false, strict: true })
    const data = {
      firstName: dataToValidate.firstName,
      lastName: dataToValidate.lastName,
      role: dataToValidate.role,
      email: dataToValidate.email,
      phoneNumber: dataToValidate.phoneNumber,
      company: dataToValidate.company,
    }
    
    const params = {
      ClientId: process.env.AWS_CLIENT_ID,
      UserPoolId: process.env.AWS_USER_POOL_ID,
      Username: dataToValidate.email,
      Password: dataToValidate.password,
      UserAttributes: [
        { Name: 'email', Value: dataToValidate.email },
        { Name: 'given_name', Value: dataToValidate.firstName },
        { Name: 'family_name', Value: dataToValidate.lastName },
      ]
    }
    await cognito.signUp(params).promise()

    const userModel = mongoose.model(USER)
    const userCreated = await userModel.create(data)
    res.json(userCreated)
  } catch (e) {
    logger.warn(e)
    if (e.errors) {
      return res.status(BAD_REQUEST).send(e.errors)
    } else {
      return res.status(BAD_REQUEST).send(e.message)
    }
  }
}

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const cognitoParams = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: process.env.AWS_CLIENT_ID,
      UserPoolId: process.env.AWS_USER_POOL_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password
      }
    }
    
    const { AuthenticationResult } = await cognito.initiateAuth(cognitoParams).promise()
    if (!AuthenticationResult) {
      throw new Error('Authentication failed')
    }
    const userModel = mongoose.model(USER)
    const user = await userModel.findOne({ email }).exec()
      
    return res.json({ message: 'Login successful', token: AuthenticationResult.IdToken, user })
  } catch (e) {
    logger.warn(e)
    if (e.errors) {
      return res.status(BAD_REQUEST).send(e.errors)
    } else {
      return res.status(BAD_REQUEST).send(e.message)
    }
  }
}

export const logoutHandler = async (req: Request, res: Response) => {
  try {
    const { accessToken } = req.body

    const params = {
      AccessToken: accessToken
    }

    await cognito.globalSignOut(params).promise()

    return res.json({ message: 'Logout successful' })
  } catch (e) {
    logger.warn(e)
    if (e.errors) {
      return res.status(BAD_REQUEST).send(e.errors)
    } else {
      return res.status(BAD_REQUEST).send(e.message)
    }
  }
}
