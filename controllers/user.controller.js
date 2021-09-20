const User = require("../models/user.model");

exports.getAllUsers = async (req, res) => {
  try {
    User.find((err, data) => {
      if (err) {
        return res.status(400).json({ errors: [{ msg: err }] });
      }
      return res.status(200).json({ users: data });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

exports.getUserById = async (req, res) => {
  const _id = req.params.id;
  try {
    User.findOne({ _id }, (err, data) => {
      if (err) {
        return res.status(400).json({ errors: [{ msg: err }] });
      }
      return res.status(200).json({ user: data });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

exports.addUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isEmailExists = await User.findOne({
      $or: [{ email: email }],
    });

    if (isEmailExists) {
      return res
        .status(400)
        .json({ errors: [{ msg: "The email/username is already in use" }] });
    }

    const user = new User({
      email,
      password,
      // username,
      // shippingAddress,
    });

    user.save((err, data) => {
      if (err) {
        return res.status(400).json({ errors: [{ msg: err }] });
      }
      return res.status(200).json(data);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

exports.editUser = async (req, res) => {
  try {
    User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      (err, data) => {
        if (err) {
          return res.status(400).json({ errors: [{ msg: err }] });
        } else if (data) {
          return res.status(200).json(data);
        } else {
          return res
            .status(400)
            .json({ errors: [{ msg: "Something Went Wrong!" }] });
        }
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};


exports.logUser = async(req,res)=>{
  const {email,password} = req.body;
  User.findOne({email : email}, (err,user) => {
      console.log(user);
      if(user){
         if(password === user.password)
         {
              res.status(200).send({message : "Login Successful",user:user})      
         }
         else{
          res.status(401).send({message : "Password didn't match",user:{}})      
         }    
      }
      else{
          res.status(500).send({message : "User not registered",user:{}})      
      }
  })
}