var Product = function(){
	this.id = "";
	this.productTitleField = "";
	this.productDescriptionField = "";
	this.chooseProductCategory = "";
	this.imageField = "";
	this.addPriceField = "";
	this.dateCreated = "";
	this.colorSize = [];

	this.addColorSize = function(colorSize){
		this.colorSize.push(colorSize);
	}

	this.deleteColorSize = function(colorSize){
		var resultArray = [];
		for (var i = 0; i < this.colorSize.length;i++){
			if (colorSize.id !== this.colorSize[i].id){
				resultArray.push(colorSize);
			}
		}
		return resultArray;
	}
};