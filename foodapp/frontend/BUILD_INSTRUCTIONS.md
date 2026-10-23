# Build Instructions for TanjoreEats Frontend

## On your local machine, run:

```bash
cd frontend
npm install
npm run build
```

This creates a `build/` folder with the production-ready frontend.

## To serve the build via the backend (optional):
Add this to backend/server.js after the routes:

```js
const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});
```

Then visit http://localhost:5000 for the full app.
