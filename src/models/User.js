import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    id: String,
    name: String,
    email: String,
    image: String,
    credits: Number,
    modified_date: String,
});
mongoose.models = {};

export default mongoose.models.User || mongoose.model("User", userSchema);