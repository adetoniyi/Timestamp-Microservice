const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

//Timestamp API
app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  let date;

  if (!dateParam) {
    date = new Date();
  } else {
    // If it's a number, treat it as Unix timestamp
    if (!isNaN(dateParam) && /^\d+$/.test(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }
  }

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

