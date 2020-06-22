const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    mongoUri: 'mongodb+srv://user:QgOVTyn4wOcG8MbV@messenger-2geth.mongodb.net/test?retryWrites=true&w=majority',
    smtpConfig: {
      host: "smtp.yandex.ru",
      port: 465,
      secure: true, // use SSL
      auth: {
          user: "dreamteammessenger@yandex.ru",
          pass: "brtbzixnwacwbazn"
      },
      tls: {
          rejectUnauthorized: false
      }
    }

  }
  
export default config