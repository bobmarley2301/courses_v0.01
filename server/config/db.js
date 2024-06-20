const mongoose = require('mongoose');


dotenv.config();

// Підключення до бази даних MongoDB
mongoose.connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Підключено до бази даних MongoDB');
    })
    .catch((error) => {
        console.error('Помилка підключення до бази даних MongoDB:', error);
    });