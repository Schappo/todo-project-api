import mongoose from 'mongoose';

const {
  DB_URI
} = process.env;

const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
};

mongoose.connect(DB_URI, options).then(() => {
  console.log('MongoDb os connected!');
})
  .catch((err) => {
    console.log(err)
  })

export default DatabaseConfig;