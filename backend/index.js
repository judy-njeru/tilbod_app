const express = require('express');
const app = express();
const xRay = require('x-ray');
const x = xRay({
filters: {
  trim: function (value) {
    let val = value.replace(/\r/g,'').replace(/\n/g,'').replace(/\t/g,' ')
    while(val.indexOf('  ')!== -1){
      val=val.replace('  ', ' ');
    }
    return typeof value === 'string' ? val.trim() : value
  },
  reverse: function (value) {
    return typeof value === 'string' ? value.split('').reverse().join('') : value
  },
  slice: function (value, start , end) {
    return typeof value === 'string' ? value.slice(start, end) : value
  }
}
});


let aha;
getAhaTilbod = ()=>{
 x('https://www.aha.is/tilbod-dagsins', '.item', [{
     title: 'h2',
     link: 'h2 a@href',
     image: '.product-image img@src',
     price: '.price',
 }])((err, obj)=>{
   aha = obj;
   console.log("aha is done");
 });
}

getAhaTilbod();
setInterval(getAhaTilbod, 600000);
app.set('json spaces', 4);
app.get('/aha', (req, res)=> {
res.header("Access-Control-Allow-Origin", "*");
res.header("Content-Type", "application/json; charset=utf-8");
res.json(aha);
});


let hopkaup;
getHopkaup = ()=>{
  x('https://www.hopkaup.is/', '.single-offer', [{
    title: '.content .offer-title',
    link: 'a@href',
    images: '.inner .back-img@style',
    price:'.offer-price | trim'
//Vikrar þetta? console log tékk. breytan hopkaup er objectin í arreyinu
  }])((err, obj)=>{
    hopkaup = obj;
    console.log("hopkaup er tilbúið");
  });
}
// til þess að við fáum ekki alltaf gamlar upplýsingar, uppfærist á ákveðnum tíma/þarna 6 sek fresti
getHopkaup();
setInterval(getHopkaup, 600000);
app.get('/hopkaup', (req, res)=> {
  //The Cross-Origin Resource Sharing (CORS) mechanism gives web servers cross-domain access controls, which enable secure cross-domain data transfers.
 res.header("Access-Control-Allow-Origin", "*");
 //til þess að fá ísl stafi
 res.header("Content-Type", "application/json; charset=utf-8");
 res.json(hopkaup);
});




app.listen(3000);
