var cartCtrl = require('./controllers.cartCtrl');
var orderCtrl = require('./controllers.orderCtrl');
var productsCtrl = require('./controllers.productsCtrl');
var userCtrl = require('./controllers.userCtrl');

module.exports = function(app){

  app.get('/api/whatever', cartCtrl.getCart);

}