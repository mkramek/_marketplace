const config = {
  env: process.env.NODE_ENV || 'development',
  url: process.env.NODE_ENV === 'development' ? '' : '',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri: process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' +
    (process.env.MONGO_PORT || '27017') +
    '/mernproject',
  p24_api_url: process.env.NODE_ENV === 'development' ? '' : '',
  p24_url: process.env.NODE_ENV === 'development' ? '' : '',
  p24_api_key: process.env.NODE_ENV === 'development' ? '' : '',
  p24_crc: process.env.NODE_ENV === 'development' ? '' : '',
  p24_merchant_id: 0,
  p24_pos_id: 0,
  sendgrid_api_user: '',
  sendgrid_api_key: ''
};

export default config
