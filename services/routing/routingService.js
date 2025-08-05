const express = require('express');
const path = require('path');
const fs = require('fs');

class RoutingService {
    constructor() {
        this.router = express.Router();
        this.setupRoutes();
    }

    setupRoutes() {
        // Serve static files from views directory
        this.router.use('/views', express.static(path.join(__dirname, '../../views')));
        
        // Serve static files from database directory
        this.router.use('/database', express.static(path.join(__dirname, '../../database')));

        // Route for mobile app pages
        this.router.get('/app/*', (req, res) => {
            this.handlePageRequest(req, res, 'app', 'splash.html');
        });

        // Specific routes for app authentication
        this.router.get('/app/login', (req, res) => {
            this.handlePageRequest(req, res, 'app', 'login.html');
        });

        this.router.get('/app/signup', (req, res) => {
            this.handlePageRequest(req, res, 'app', 'register.html');
        });

        this.router.get('/app/register', (req, res) => {
            this.handlePageRequest(req, res, 'app', 'register.html');
        });

        // Dashboard route (markets page)
        this.router.get('/app/dashboard', (req, res) => {
            this.handlePageRequest(req, res, 'app', 'markets.html');
        });

        this.router.get('/app/home', (req, res) => {
            this.handlePageRequest(req, res, 'app', 'markets.html');
        });

        // Route for admin panel pages
        this.router.get('/admin/*', (req, res) => {
            this.handlePageRequest(req, res, 'admin-panel', 'dashboard.html');
        });

        // Route for web app pages
        this.router.get('/web/*', (req, res) => {
            this.handlePageRequest(req, res, 'web', 'home.html');
        });

        // Default route - serve app splash page
        this.router.get('/', (req, res) => {
            this.handlePageRequest(req, res, 'app', 'splash.html');
        });

        // Handle 404 - serve app splash page
        this.router.get('*', (req, res) => {
            this.handlePageRequest(req, res, 'app', 'splash.html');
        });
    }

    handlePageRequest(req, res, viewType, defaultPage) {
        const requestedPath = req.params[0] || defaultPage;
        const filePath = path.join(__dirname, '../../views', viewType, 'pages', requestedPath);
        
        // Check if file exists
        if (fs.existsSync(filePath)) {
            res.sendFile(filePath, (err) => {
                if (err) {
                    console.error(`Error serving file ${filePath}:`, err);
                    this.serveDefaultPage(res, viewType, defaultPage);
                }
            });
        } else {
            console.log(`File not found: ${filePath}`);
            this.serveDefaultPage(res, viewType, defaultPage);
        }
    }

    serveDefaultPage(res, viewType, defaultPage) {
        const defaultPath = path.join(__dirname, '../../views', viewType, 'pages', defaultPage);
        
        // Check if default page exists
        if (fs.existsSync(defaultPath)) {
            res.sendFile(defaultPath);
        } else {
            // If default page doesn't exist, create a simple fallback
            this.serveFallbackPage(res, viewType);
        }
    }

    serveFallbackPage(res, viewType) {
        const fallbackHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IQX P2P Trading - ${viewType}</title>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 500px;
            width: 100%;
        }
        h1 {
            color: #333;
            margin-bottom: 20px;
        }
        p {
            color: #666;
            line-height: 1.6;
        }
        .back-btn {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 24px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 IQX P2P Trading</h1>
        <p>Welcome to the ${viewType} interface. This page is under construction.</p>
        <a href="/" class="back-btn">← Back to Home</a>
    </div>
</body>
</html>`;
        
        res.send(fallbackHTML);
    }

    getRouter() {
        return this.router;
    }

    // Utility methods for route management
    addRoute(path, handler) {
        this.router.get(path, handler);
    }

    addPostRoute(path, handler) {
        this.router.post(path, handler);
    }

    addPutRoute(path, handler) {
        this.router.put(path, handler);
    }

    addDeleteRoute(path, handler) {
        this.router.delete(path, handler);
    }

    // Method to get available routes
    getAvailableRoutes() {
        return {
            app: '/app/*',
            appLogin: '/app/login',
            appSignup: '/app/signup',
            appRegister: '/app/register',
            appDashboard: '/app/dashboard',
            appHome: '/app/home',
            admin: '/admin/*',
            web: '/web/*',
            views: '/views/*',
            database: '/database/*',
            home: '/'
        };
    }

    // Method to check if a file exists
    fileExists(filePath) {
        return fs.existsSync(filePath);
    }

    // Method to get file path for a route
    getFilePath(viewType, fileName) {
        return path.join(__dirname, '../../views', viewType, 'pages', fileName);
    }
}

module.exports = RoutingService; 