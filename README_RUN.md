# How to Run Homework App

## Easy Way (Windows)
Double-click `run_app.bat`.
This will automatically:
1. Install necessary files (if missing).
2. Build the website (if missing).
3. Start the server.
4. Open the app in your browser at http://localhost:5000.

## Manual Way (Terminal)
1. **Install Dependencies**:
   ```bash
   npm install
   cd client && npm install && cd ..
   ```

2. **Build Client**:
   ```bash
   cd client && npm run build && cd ..
   ```

3. **Start Server**:
   ```bash
   node server/index.js
   ```

4. **Open Browser**:
   Go to [http://localhost:5000](http://localhost:5000)
