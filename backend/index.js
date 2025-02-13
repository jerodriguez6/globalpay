require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const GLOBALPAY_API_KEY = process.env.GLOBALPAY_API_KEY;
const GLOBALPAY_API_URL = "https://api.globalpay.com/open-banking/payment";

app.post("/api/create-payment", async (req, res) => {
  try {
    const { amount, currency, customerName, customerEmail, bank, iban, swift, countryCode, paymentType, reference } = req.body;

    const paymentData = {
      amount,
      currency,
      customer: {
        name: customerName,
        email: customerEmail,
        bank: bank,
        iban: iban,
        swift: swift,
        country: countryCode,
      },
      payment_type: paymentType,
      reference,
    };

    const response = await axios.post(GLOBALPAY_API_URL, paymentData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GLOBALPAY_API_KEY}`,
      },
    });

    res.json({ payment_url: response.data.redirect_url });
  } catch (error) {
    res.status(500).json({ message: error.response?.data || "Error al procesar el pago" });
  }
});

app.listen(5000, () => {
  console.log("Backend corriendo en http://localhost:5000");
});
