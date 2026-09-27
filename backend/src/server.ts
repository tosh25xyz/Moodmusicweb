import dotenv from 'dotenv';
dotenv.config();

import app from './app';


const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();