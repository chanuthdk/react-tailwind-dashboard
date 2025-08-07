const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// security middlewares
app.use(helmet());
app.use(morgan('combined'));

const corsOptions = {
    origin:[
        process.env.FRONTEND_URL || 'http://localhost:3000',
        'https://localhost:3000',
    ],
    Credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// body parser middleware
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());

// MongoDB connection
if(!process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.log('MongoDB connection failed!');
        console.error('MongoDB connection error:', err);
    });
}

// Routes
app.use('/api/comments', require('./routes/comments'));
app.use('/api/upload', require('./routes/upload'));

//health check route
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        mongoose: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' 
    });
});

//error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
    });
});

//404 error handling
app.use('*', (req, res) => {
    res.status(404).json({error:'Route not found'});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
});