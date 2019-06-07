const production = process.env.NODE_ENV === 'production';

export default {
  server: {
    port: process.env.PORT || 5000,
    production: production ? true : false,
  },
  database: {
    name: process.env.DATABASE_NAME || 'calendeok',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'test',
    host: process.env.DATABASE_HOST || 'localhost',
    timezone: 'Asia/Seoul',
    dialect: 'mysql',
    logging: production ? false : console.log,
    sync: false,
    define: {
      engine: 'InnoDB',
      charset: 'utf8',
    },
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucket: process.env.AWS_BUCKET,
  },
  auth: {
    secret: process.env.SECRET || 'accesstokensecret',
    algorithm: process.env.ALGORITHM || 'HS256',
    session: false,
    refreshSecret: process.env.REFRESH_SECRET || 'refreshtokensecret',
    expiresIn: '1 days',
    refreshExpiresIn: '7 days',
  },
};
