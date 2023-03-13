import { getSession } from "next-auth/react";
import User from "../../../models/User";
import dbConnect from "../../../helpers/dbConnect";

export default async (req, res) => {
  console.log("EXECUTING authenticate");
  const userParam = JSON.parse(req.body);
  
  var response = {
    error: false,
    message: "Nothing happened",
    data: null
  };

  await dbConnect();

  if (req.method === "POST") {

    var user = await User.findOne({ id: userParam.id });
    var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

    if(!user) {
      user = new User(userParam);
      user.credits = 0;
      user.modified_date = datetime;
      user.save()
      response = {
        error: false,
        message: "user not found, creating new user",
        data: user
      };
    } else {
      user.modified_date = datetime;
      user.save();
      response = {
        error: false,
        message: "user found, returning user exists",
        data: user
      };
    }
  }

  console.log(response)
  res.status(200).json(response)
  res.end();
};