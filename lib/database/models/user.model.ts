import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  ClerkId: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  img: { type: String, required: true },
});

const User = models.User || model("User", UserSchema);
export default User;
