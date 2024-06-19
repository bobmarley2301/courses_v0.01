const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors'); // Додано

dotenv.config();

const app = express();
const port = process.env.PORT;

// Налаштування CORS
app.use(cors());

app.use(bodyParser.json());

// Підключення до MongoDB
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

// Підключення маршрутів
const coursesRouter = require('./routes/courses');
const videosRouter = require('./routes/videos');

app.use('/api/courses', coursesRouter);
app.use('/api/videos', videosRouter);
app.use('/api/course', require('./routes/courses'));

// Запуск сервера
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
