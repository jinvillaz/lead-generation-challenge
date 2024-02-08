import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import { Role } from '../../models/user'

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    company: {
      type: String,
    },
    role: {
      type: String,
      default: Role.USER,
      enum: Object.values(Role),
    },
  },
  {
    timestamps: true,
  },
)
userSchema.indexes()
userSchema.plugin(uniqueValidator, { message: 'The {PATH} {VALUE} already exist.' })

const User = mongoose.model('User', userSchema)
export default User
