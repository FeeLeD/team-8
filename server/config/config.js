const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    mongoUri: 'mongodb+srv://user:QgOVTyn4wOcG8MbV@messenger-2geth.mongodb.net/test?retryWrites=true&w=majority',
    smtpConfig: {
      service: 'gmail',
      host: 'smtp.gmail.com',
      secure: false,
      port: 25,
      auth: {
          user: "dreamteammessenger@gmail.com",
          pass: "TBH-qG9-d7r-zi81"
      },
      tls: {
          rejectUnauthorized: false
      }
    }

  }
  
export default config