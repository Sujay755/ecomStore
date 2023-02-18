const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "822hyxtzn6p4xr5y",
  publicKey: "tx9d3qfjf4frrvvm",
  privateKey: "8df9071e24c880ce4ac13c57bbb6ba23"
});


exports.getToken =(req,res)=>{
    gateway.clientToken.generate({}, (err, response) => {
       if(err){
        res.status(500).send(err)
       }
       else{
        res.send(response)
       }
      });
}

exports.processPayment = (req,res)=>{
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
        if(err){
            res.status(500).json(err)
        }
        else{
            res.json(result)
        }
      });
}