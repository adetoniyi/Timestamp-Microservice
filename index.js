const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  let date;

  if (!dateParam) {
    // No date provided - use current date
    date = new Date();
  } else {
    // Check if dateParam is only digits (a timestamp)
    if (/^\d+$/.test(dateParam)) {
      // Parse as number (Unix timestamp in milliseconds or seconds)
      date = new Date(parseInt(dateParam));
    } else {
      // Parse as ISO string
      date = new Date(dateParam);
    }
  }

  // Invalid date check
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
