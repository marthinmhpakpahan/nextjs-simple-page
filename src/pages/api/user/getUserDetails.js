import User from "../../../models/User";
import dbConnect from "../../../helpers/dbConnect";

export default async (email) => {
  console.log("EXECUTING getUserDetails");
  
  var response = {
    error: true,
    message: "Nothing happened",
    data: null
  };

  await dbConnect();

  var user = await User.findOne({ email: email });
  if(user) {
    response = {
      error: false,
      message: "user found, returning user exists",
      data: user
    };
  }
  return response;
};