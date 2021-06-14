const mongoose = require('mongoose');

// 4. Create connection
async function databaseConnection()
{
    let connection = await mongoose.connect(`mongodb://localhost:27017/bookstore`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
    });
  console.log("connected to database")
}

module.exports = databaseConnection;