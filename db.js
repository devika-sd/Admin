const mongoose = require('mongoose');

// 4. Create connection
async function databaseConnection()
{
    let connection = await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
    });
  console.log("connected to database")
}

module.exports = databaseConnection;