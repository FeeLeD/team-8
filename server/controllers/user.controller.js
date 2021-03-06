import User from "../models/User";
import crypto from "crypto";
import VerificationToken from "../models/VerificationToken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import config from "../config/config";

//Get a specific user by ID method
const read = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

const getOtherUser = async (req, res) => {
  res.json(req.otherUser);
}

//Create new user method
const create = async (req, res) => {
  const { login, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        errors: [
          {
            msg: "Пользователь с данным e-mail уже существует!",
          },
        ],
      });
    }

    user = await User.findOne({ login })
    if (user) {
      return res.status(400).json({
        errors: [
          {
            msg: "Пользователь с данным логином уже существует!",
          },
        ],
      });
    }

    user = new User({
      login,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Verification token
    const token = new VerificationToken({
      userId: user.id,
      token: crypto.randomBytes(16).toString("hex"),
    });
    await token.save();

    //Send email
    const transporter = nodemailer.createTransport(config.smtpConfig);
    const mailOptions = {
      from: "Messenger",
      to: user.email,
      subject: "Подтверждение регистрации",
      html:
        `<h1>Привет, <span style="color:blue">${user.login}</span>!</h1>
         <h2>Вы зарегистрировались в приложении-мессендежере https://team-8-messenger.herokuapp.com/</h2>
         <p>Для подтверждения регистрации перейдите по ссылке https://team-8-messenger.herokuapp.com/confirmation/${token.token}</p>`
    };
    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        return res.status(400).json({
          errors: [
            {
              msg: "По техническим причинам e-mail не был отправлен",
              err: err.message
            },
          ],
        });
      }
      res.status(200).json({
        msg: "На адрес " + user.email + " было отправлено письмо для подтверждения регистрации",
      });
    });

  } catch (err) {
    console.error(err.message);
    return res.status(400).json({
      errors: [
        {
          msg: "Регистрация не удалась по техническим причинам... Попробуйте ещё раз"
        },
      ],
    });
  }
};

const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id).select("-password");
    req.otherUser = user;
    next();
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const getToken = async (req, res, next, token) => {
  VerificationToken.findOne({ token: token }).exec((err, token) => {
    if (err || !token) return res.status(400).json({
      errors: [
        {
          msg: "Ваше письмо устарело, либо аккаунт уже подтверждён..."
        }
      ]
    });
    req.token = token;
    next()
  })
};

const confirm = async (req, res) => {
  // Try to find a token
  let token = req.token

  // If we found a token, find a matching user
  let user = await User.findOne({
    _id: token.userId,
  });

  if (!user) {
    return res.status(400).json({
      errors: [
        {
          msg: "Пользователь не был найден, попробуйте зарегистрироваться снова",
        }
      ]
    });
  }
  if (user.isVerified) {
    return res.status(400).json({
      errors: [
        {
          msg: "Аккаунт пользователя уже подтверждён!",
        }
      ]
    });
  }

  // Verify and save the user
  user.isVerified = true;
  await user.save((err) => {
    if (err) {
      return res.status(500).send({
        msg: err.message,
      });
    }
  });

  // Delete verification token from db
  await VerificationToken.findOneAndRemove({
    userId: user.id
  });

  res.status(200).send("Аккаунт подтверждён. Пожалуйста войдите");
};

const resend = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return res.status(400).json({
      errors: [
        {
          msg: "Пользователь с данным e-mail не найден"
        }
      ]
    });
  }
  if (user.isVerified) {
    return res.status(400).json({
      errors: [
        {
          msg: "Данный аккаунт уже подтверждён!"
        }
      ]
    });
  }

  //Delete old token
  await VerificationToken.findOneAndRemove({
    userId: user.id,
  });

  // Verification token
  const token = new VerificationToken({
    userId: user.id,
    token: crypto.randomBytes(16).toString("hex"),
  });

  // Save the token
  await token.save();

  //Send email
  const transporter = nodemailer.createTransport(config.smtpConfig);
  const mailOptions = {
    from: "Messenger",
    to: user.email,
    subject: "Подтверждение регистрации",
    html:
      `<h1>Привет, <span style="color:blue">${user.login}</span>!</h1>
       <h2>Вы зарегистрировались в приложении-мессендежере https://team-8-messenger.herokuapp.com/</h2>
       <p>Для подтверждения регистрации перейдите по ссылке https://team-8-messenger.herokuapp.com/confirmation/${token.token}</p>`
  };
  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      return res.status(400).json({
        errors: [
          {
            msg: "По техническим причинам e-mail не был отправлен",
            err: err.message
          },
        ],
      });
    }
    res.status(200).json({
      msg: "На адрес " + user.email + " было отправлено письмо для подтверждения регистрации",
    });
  });
};

//Get all the users in the database method
const list = async (req, res) => {
  try {
    const users = await User.find().select('id login email');

    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


export default {
  read,
  getOtherUser,
  create,
  userByID,
  confirm,
  resend,
  getToken,
  list
};
