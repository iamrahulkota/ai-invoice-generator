import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Parse command line arguments for port
const args = process.argv.slice(2);
const portArg = args.find(arg => arg.startsWith('--port='));
const portFromArgs = portArg ? parseInt(portArg.split('=')[1]) : null;

// Priority: command line argument > environment variable > default
const PORT = portFromArgs || process.env.PORT || 4046;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle client-side routing - return index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view the application`);
});
