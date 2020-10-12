import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        }
    },
    { timestamps: true },
);

userSchema.plugin(passportLocalMongoose);

const userModel = mongoose.model('users', userSchema, 'users');

export default userModel;
