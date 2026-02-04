# How to Start the Backend Server

## Quick Start

1. **Open a new terminal/command prompt**

2. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

3. **Install dependencies (if not already installed):**
   ```bash
   pip install flask flask-cors
   ```

4. **Start the server:**
   ```bash
   python app.py
   ```

5. **You should see:**
   ```
   Starting N-Gram Analysis API server...
   API will be available at http://localhost:5000
   * Running on http://0.0.0.0:5000
   ```

6. **Keep this terminal open** - the server needs to keep running

## Verify Server is Running

Open a browser and go to: `http://localhost:5000/api/health`

You should see:
```json
{
  "status": "healthy",
  "message": "N-Gram Analysis API is running"
}
```

## Troubleshooting

### Port 5000 already in use
If you get an error that port 5000 is in use:
- Find and close the process using port 5000
- Or change the port in `backend/app.py` (line 142) to a different port like 5001
- Update `VITE_API_URL` in your `.env` file to match

### Module not found errors
Make sure Flask is installed:
```bash
pip install -r requirements.txt
```

### CORS errors
The server has CORS enabled, but if you still see errors, make sure:
- The backend is running on `http://localhost:5000`
- The frontend is trying to connect to the same URL
- Check your `.env` file has: `VITE_API_URL=http://localhost:5000/api`
