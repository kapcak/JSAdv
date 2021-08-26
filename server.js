const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const jsonParser = express.json();

app.use(express.static('.'));

app.get('/catalogData', (req, res) => {
  fs.readFile('catalog.json', 'utf-8', (err, data) => {
    res.send(data);
  });
});

app.post('/addToCart', jsonParser, (req, res) => {
  fs.readFile('cart.json', 'utf-8', (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const cart = JSON.parse(data);
      const item = req.body;
      console.log(`Adding ${item.product_name}`);
      item.id = cart.length;
      cart.push(item);
      fs.writeFile('cart.json', JSON.stringify(cart), (error) => {
        console.log(`Added ${item.product_name}`);
      });
      res.send('{"result": 1}');
    }
  });
});

app.get('/getBasket', (req, res) => {
  fs.readFile('cart.json', 'utf-8', (err, data) => {
    res.send(data);
  });
});

app.post('/deleteFromCart', jsonParser, (req, res) => {
  fs.readFile('cart.json', 'utf-8', (err, data) => {
    if (err) {
      res.send('{"result": 0}');
    } else {
      const cart = JSON.parse(data);
      if (cart.length === 0) {
        console.log('Empty cart');
        res.send('{"result": 0}');
      } else {
        const item = req.body;
        console.log(`Deleting ${item.product_name} id: ${item.id}`);
        const index = cart.findIndex((i) => i.id === item.id);
        cart.splice(index, 1);
        fs.writeFile('cart.json', JSON.stringify(cart), (error) => {
          console.log(`Deleted ${item.product_name} id: ${item.id}`);
        });
        res.send('{"result": 1}');
      }
    }
  });
});

app.listen(3000, () => {
  console.log('server is running on port 3000!');
});
