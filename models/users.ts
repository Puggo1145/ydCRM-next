import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    role: {
        type: String,
        required: true,
        default: "employee",
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const User = models.User || model("User", userSchema);

export default User;