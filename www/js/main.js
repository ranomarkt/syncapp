var ListView = function(ul){
	this.el = $(ul);

}

ListView.prototype.refreshList = function(items){
	this.el.html('');
	this.el.hide();
	this.addItems(items);
	this.el.fadeIn('slow');
}


ListView.prototype.addItems = function(items){
	ListView = this
	$.each(items,function(i,item){
		ListView.addItem(item);
	})
}


ListView.prototype.addItem = function(item){
	this.el.append($('<li>').html(item.title));
}

var App = (function(){

	function initialize(){
		listView.refreshList(getStudiosfromLocalStorage());
	}


	var listView = new ListView(".main ul");

	function sync(){
		url = "http://localhost/app.php";
		$.getJSON(url,function(studios){
			storeStudiosLocalStorage(studios);
			listView.refreshList(studios);
		});
	}

	function storeStudiosLocalStorage(studios){
		// console.log(studios);
		localStorage.setItem('studios',JSON.stringify(studios));
	}

	function getStudiosfromLocalStorage(){
		return JSON.parse(localStorage.getItem('studios'));
	}

	function clear(){
		localStorage.setItem('studios',{});
		listView.refreshList([{}])
	}
	return {
		initialize:initialize
	}
}());