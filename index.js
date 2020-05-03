require('dotenv').config();
const server = require('./server');

// DEPLOYMENT - Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static   
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server running on port 8000`));