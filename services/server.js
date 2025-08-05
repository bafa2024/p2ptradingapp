const express = require('express');
const path = require('path');
const { RoutingService } = require('./routing');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '..')));

// Use the routing service
const routingService = new RoutingService();
app.use('/', routingService.getRouter());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server with error handling
const server = app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📱 Mobile App: http://localhost:${PORT}/app/`);
    console.log(`⚙️ Admin Panel: http://localhost:${PORT}/admin/`);
    console.log(`🌐 Web App: http://localhost:${PORT}/web/`);
    console.log(`📁 Static Files: http://localhost:${PORT}/views/`);
    console.log(`💾 Database Files: http://localhost:${PORT}/database/`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use. Please try a different port.`);
        console.log(`💡 You can set a different port using: PORT=3002 npm start`);
        process.exit(1);
    } else {
        console.error('❌ Server error:', err);
        process.exit(1);
    }
}); 