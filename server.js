require('dotenv').config();
const express = require('express');
const Shopify = require('shopify-api-node');
const moment = require('moment'); // for date formatting

const app = express();

const shopify = new Shopify({
  shopName: 'devtestrecruitte.myshopify.com',
  apiKey: 'd156c699edcc98186dae8e6f9562d838',
  password: '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',
});

app.get('/products', async (req, res) => {
  const products = await shopify.product.list();
  const formattedProducts = products.map(product => {
    return {
      ...product,
      created_at: moment(product.created_at).format('YYYY-DD-MM')
    };
  });
  console.log(JSON.stringify(formattedProducts));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});