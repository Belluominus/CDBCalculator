import mongoose from 'mongoose';

import { app } from './app';

const startUp = async () => {
  try {
    await mongoose.connect('mongodb://cdbcalculator-mongo-srv:27017/cdbcalculator');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });
};

startUp();
