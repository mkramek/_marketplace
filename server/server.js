import config from './../config/config'
import app from './express'
import mongoose from 'mongoose'
import bidding from './controllers/bidding.controller'
import admin from 'firebase-admin';

// Connection URL
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true })

// hardcoded temporarily
// mongoose.connect("mongodb+srv://user:pass@subdomain.xyxvt.mongodb.net/Database?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.on('error', (err) => {
  console.error(err);
  throw new Error(`unable to connect to database: ${config.mongoUri}`)
})

const server = app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', config.port)
})

admin.initializeApp();

bidding(server)
