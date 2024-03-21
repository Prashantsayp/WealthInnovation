// server.js

const express = require('express');
const mongoose = require('mongoose');
const Case = require('./models/Case');
const emailService = require('./services/emailService');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cases', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

// Endpoint to handle disbursed cases
app.post('/cases/disbursed', async (req, res) => {
  try {
    // Fetch disbursed cases from the database
    const disbursedCases = await Case.find({ status: 'disbursed' });

    // Check conditions and send emails
    disbursedCases.forEach(async (case) => {
      if (/* Add conditions here */) {
        await emailService.sendEmail(case.clientEmail, 'Disbursed Case Notification', 'Your case has been disbursed. Please review.');
      }
    });

    res.status(200).send('Emails sent successfully');
  } catch (err) {
    console.error('Error processing disbursed cases', err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
