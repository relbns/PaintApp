# Paint 2.0

A modern web-based paint application built with Vue.js that allows users to create digital artwork with various brushes, colors, and background options. The application supports both server-based storage and local storage modes with automatic fallback, controlled entirely through npm scripts.

## Features

- **Drawing Tools**: Adjustable brush size and color selection
- **Background Options**: Set solid background colors or load custom images
- **Image Management**: Save drawings to server or local storage with gallery view
- **Download**: Export your artwork as PNG files
- **Dual Storage Modes**: Server mode with localStorage fallback for maximum flexibility
- **Mode Indicator**: Visual indicator showing current storage mode
- **Script-Controlled**: Mode selection through npm scripts - no configuration files needed
- **Responsive Design**: Clean, modern interface with intuitive controls

## Technology Stack

- **Frontend**: Vue.js 2
- **Storage**: Node.js server + JSON storage OR Browser Local Storage
- **Deployment**: GitHub Pages with automated CI/CD

## Storage Modes

### Server Mode
- Uses the Node.js backend for persistent storage
- Images are stored on the server and shared between sessions
- Automatically falls back to localStorage if server is unavailable
- Best for development and local usage

### Local Storage Mode
- Uses browser's local storage for client-only operation
- No server required - perfect for GitHub Pages deployment
- Images are stored locally in your browser
- Best for demos and production deployment

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/relbns/PaintApp.git
cd PaintApp
```

2. Install dependencies:
```bash
npm install
```

### Development

**Run with both client and server (recommended for full development):**
```bash
npm run dev
```

**Force localStorage mode only (no server needed):**
```bash
npm run dev:local
```

**Force server mode only (requires server to be running):**
```bash
npm run dev:server-mode
```

**Run client only (auto-detects available storage):**
```bash
npm run dev:client
```

The application will be available at `http://localhost:8080` (or the next available port).

### Building for Production

**Build for GitHub Pages (localStorage mode):**
```bash
npm run build:local
```

**Build with automatic mode detection:**
```bash
npm run build
```

The built files will be located in the `client/dist` directory.

## Script Control

Mode selection is controlled entirely through npm scripts using inline environment variables:

- `npm run dev:local` → Sets `VUE_APP_USE_SERVER=false` (localStorage only)
- `npm run dev:server-mode` → Sets `VUE_APP_USE_SERVER=true` (server required)
- `npm run dev:client` → No explicit mode (tries server, falls back to localStorage)

No configuration files needed - everything is controlled by which script you run!

## Usage

1. **Drawing**: Click and drag on the canvas to draw
2. **Brush Settings**: 
   - Use the size slider to adjust brush thickness
   - Click the color picker to change brush color
3. **Background**: 
   - Use the background color picker to change canvas background
   - Click "Choose File" to load a background image
4. **Saving**: Click "Save image" to store your artwork (server or localStorage)
5. **Downloading**: Click "Download" to save your artwork as a PNG file
6. **Gallery**: View and manage your saved images in the right panel
   - Click on any saved image to load it as a background
   - Use the "Delete" button to remove individual images
   - Mode indicator shows whether you're using "Server Mode" or "Local Storage"

## Storage Mode Detection

The application automatically detects which mode to use:

1. **Script Control**: Script sets environment variable inline
2. **Server Availability**: Tests if the server is running and accessible (when not forced)
3. **Automatic Fallback**: Falls back to localStorage if server is unavailable
4. **Visual Indicator**: Shows current mode with a colored badge

## Running the Server

To use server mode, start the backend server:

```bash
npm run dev:server
```

The server will run on `http://localhost:3000` and provide:
- Image storage and retrieval
- RESTful API endpoints
- Persistent storage across sessions

## Deployment

### GitHub Pages (Automatic)
This application is configured for automatic deployment to GitHub Pages using localStorage mode. Any push to the `main` branch will trigger the deployment workflow.

The deployment process:
1. Installs dependencies
2. Builds the application in localStorage mode (`build:local`)
3. Deploys to the `gh-pages` branch

### Manual Deployment
For server-based deployment, ensure your environment supports Node.js and run:

```bash
npm run build
npm start
```

## API Endpoints (Server Mode)

- `GET /images` - Retrieve all saved images
- `POST /images` - Save a new image
- `DELETE /images` - Delete all images
- `GET /health` - Server health check

## Testing Different Modes

**Test localStorage mode specifically:**
```bash
npm run dev:local
```
- Should show "Local Storage" badge
- Check browser dev tools → Application → Local Storage → "images" key

**Test server mode:**
```bash
# Start server in separate terminal
npm run dev:server

# In another terminal, force server mode
npm run dev:server-mode
```
- Should show "Server Mode" badge
- Images persist on server between sessions

**Test fallback behavior:**
```bash
# Start without server running
npm run dev:client
```
- Should attempt server connection, then fall back to localStorage
- Check console for "Server unavailable, falling back to localStorage mode"

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Project Structure

```
PaintApp/
├── client/                    # Vue.js frontend application
│   ├── public/               # Static assets
│   ├── src/                  # Source code
│   │   ├── components/       # Vue components
│   │   ├── services/         # API service layer with dual-mode support
│   │   ├── App.vue           # Main application component
│   │   └── main.js           # Application entry point
│   └── package.json          # Client dependencies
├── server/                   # Node.js backend server
│   ├── server.js             # Express server
│   ├── images.json           # JSON-based image storage
│   └── package.json          # Server dependencies
├── .github/workflows/        # GitHub Actions CI/CD (localStorage mode)
└── package.json              # Root package.json with mode-controlled scripts
```

## Troubleshooting

### Mode Control Issues
- Use `npm run dev:local` to force localStorage mode
- Use `npm run dev:server-mode` to force server mode (server must be running)
- Check console messages for mode detection logs

### Server Mode Issues
- Ensure the server is running: `npm run dev:server`
- Check server is accessible at `http://localhost:3000`
- Verify firewall settings aren't blocking the connection

### Local Storage Issues
- Check if localStorage is enabled in your browser
- Clear localStorage data: `localStorage.removeItem('images')`
- Ensure you're not in private/incognito mode

### Build Issues
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility
