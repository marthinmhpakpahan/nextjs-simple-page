import { useSession } from "next-auth/react";
import User from "../../../models/User";
import dbConnect from "../../../helpers/dbConnect";

export default async (req, res) => {
  console.log("EXECUTING user update");
  const userParam = JSON.parse(req.body);
  console.log(userParam);
  const { data: session } = useSession();
  console.log(session);
  
  var response = {
    error: false,
    message: "Nothing happened",
    data: null
  };

  await dbConnect();

  if (req.method === "POST") {

    var user = await User.findOne({ id: session.user.id });
    var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

    user.modified_date = datetime;
    if(userParam.credits != "") {
      user.credits = user.credits + userParam.credits;
    }
    user.save();
    response = {
      error: false,
      message: "user found, returning user exists",
      data: user
    };
  }

  console.log(response)
  res.status(200).json(response)
  res.end();
};