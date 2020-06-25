const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri: process.env.MONGO_URI,
  smtpConfig: {
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  }

}

export default config