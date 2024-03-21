const express = require('express');
const db=require('./DB/DatabaseConnect')
const userRoutes = require('./routes/userRoutes');
const cors=require("cors")
const app = express();
app.use(express.json());

app.use(cors({ origin: 'http://localhost:5173' }))

// Connect to MongoDB
db()

// Routes
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
