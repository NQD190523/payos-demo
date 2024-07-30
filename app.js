const expresss = require('express');
const PayOS = require('@payos/node');

const payos = new PayOS(
  '506cc59d-3a96-40e2-ad02-3012cd02a3cd',
  ' 5eadb357-5d50-4ebd-97b1-09debce0831b',
  '819acb3df7cf0f3cdf19ca250f17c8cdd9352b3c290617959b9796243453854e');
const app = expresss();
app.use(expresss.static('public'));
app.use(expresss.json());

const domain = 'http://localhost:3000';
app.post('/create-payment-link',async(req,res) =>{
    const order = {
        amount: 5000,
        description: 'Thanh toan sach',
        orderCode: Math.floor(100000 + Math.random() * 900000),
        returnUrl: `${domain}/success.html`,
        cancelUrl: `${domain}/cancel.html`
    };
    const  paymentLink = await payos.createPaymentLink(order);
    res.redirect(303,paymentLink.checkoutUrl);

})

app.listen(3000, () => console.log('listening on port 3000'));