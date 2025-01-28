const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Allow requests from your Elastic Beanstalk domain
app.use(
  cors({
    origin: 'http://team5-codepipeline-demoapp-env.eba-apbnns5a.eu-north-1.elasticbeanstalk.com',
  })
);

// Route for fetching horoscope data
app.get('/api/horoscope/:sign', async (req, res) => {
  const { sign } = req.params;
  try {
    const response = await axios.get(`https://ohmanda.com/api/horoscope/${sign}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching horoscope:', error.message);
    res.status(500).json({ error: 'Failed to fetch horoscope' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(
    `Proxy server is running on http://team5-codepipeline-demoapp-env.eba-apbnns5a.eu-north-1.elasticbeanstalk.com:${PORT}`
  );
});
