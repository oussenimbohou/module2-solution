(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


// ToBuy - controller
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var list1 = this;

  list1.items = ShoppingListCheckOffService.getBuyItems();
  list1.itemName = "";
  list1.itemQuantity = "";

  list1.addItem = function () {
    ShoppingListCheckOffService.addItem(list1.itemName, list1.itemQuantity);
  }

  list1.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  };
  list1.notEmpty = function(){
    if(list1.items.length > 0){
         return false;
       }
       return true;
  }
}

// AlreadyBought - controller
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var list2 = this;

  list2.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
  list2.addItem = function () {
      ShoppingListCheckOffService.addItem(list2.itemName, list2.itemQuantity);
  }
  list2.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  };
  list2.deleteItem = function(itemIndex){
    ShoppingListCheckOffService.deleteItem(itemIndex);
  }
  list2.notEmpty = function(){
    if(list2.items.length > 0){
         return false;
       }
       return true;
  }
}
//Shopping List Service
function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var itemToBuy = [
                    {name:"Mango",quantity:10},
                    {name:"Apple",quantity:20},
                    {name:"Pineapple",quantity:7},
                    {name:"Orange",quantity:15},
                    {name:"Pomegranate",quantity:35},
                    {name:"Lemon",quantity:25}
                  ];
  var itemAlreadyBought = [];
  service.addItem = function (itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      itemToBuy.push(item);
  };

  service.removeItem = function (itemIndex) {
    var item={
      name:itemToBuy[itemIndex].name,
      quantity:itemToBuy[itemIndex].quantity
    };
    itemAlreadyBought.push(item);
    itemToBuy.splice(itemIndex, 1);
  };

  service.deleteItem = function(itemIndex){
    itemAlreadyBought.splice(itemIndex, 1);
  }

  service.getBuyItems = function(){
    return itemToBuy;
  };
  service.getAlreadyBoughtItems = function(){
    return itemAlreadyBought;
  }
}

})();