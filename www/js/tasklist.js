var TaskListView = function(ul){
	this.el = $(ul);	
}

TaskListView.prototype.refreshList = function(tasks){
	this.el.html('');
	this.el.hide();
	this.addTasks(tasks);
	this.el.fadeIn('slow');
}
TaskListView.prototype.addTasks = function(tasks){
	$.each(tasks,$.proxy(function(i,task){
		this.addTask(task);
	},this));
}

TaskListView.prototype.addTask = function(task){
	this.el.append($('<li/>').html(task.title));
}


// Task Manage 

var TaskList = (function(){
	
	// Sync from the remote server
	var listView = new TaskListView('.main ul');

	function initialize(){
		listView.refreshList(getTasksfromLocalStorage());
		this.sync = sync;
		this.clear = clear;
		bindEvents()

	}


	function bindEvents(){
		$(document).on('click','#sync',function(){
			sync();
		});
		$(document).on('click','#clear',function(){
			clear();
		})

	}

	function sync(){
		url = "http://pastebin.com/raw.php?i=a2XK3rbT";
		$.getJSON(url,function(tasks){
			storeTaskinLocalStorage(tasks);	
			listView.refreshList(tasks);
		})
	}


	// Store tasks in localstorage 
	function storeTaskinLocalStorage(tasks){
		localStorage.setItem('tasklist',JSON.stringify(tasks));
	}


	// View Tasks 
	function getTasksfromLocalStorage(){
		return JSON.parse(localStorage.getItem('tasklist'));
	}


	// clear out the interface
	function clear(){
		localStorage.setItem('tasklist','{}');
		listView.refreshList({});
	}

	return {
		initialize:initialize,
	}
}())