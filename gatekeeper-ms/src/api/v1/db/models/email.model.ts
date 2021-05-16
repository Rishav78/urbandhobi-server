import * as mongoose from 'mongoose';
import { ROLES } from '../../../../lib/constants';
import { Role } from '../../typings';

export const EmailSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'please provide a valid email',
      ],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      match: [
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        'password must contain a 1 small and capital character, 1 number, 1 special character',
      ],
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ROLES,
      default: 'USER',
    },
    active: {
      type: Boolean,
      default: true,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export interface Email {
  email: string;
  password: string;
  role?: Role;
  active?: boolean;
  isDeleted?: boolean;
}

export interface EmailModelSchema extends Email, mongoose.Document {
  id: string;
  active: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const name = 'EMAILSCHEMA';
