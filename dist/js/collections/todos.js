var app = app || {};

var TodoList = Backbone.Collection.extend({
	model: App.todo,
	localStorage: new Backbone.LocalStorage('todos-backbone'),
	completed: function(){
		return this.filter(function(todo){
			return todo.get('completed');
		});
	},
	remaining: function() {
		// провірити цю реалізацію сортування
		// return this.filter(function(todo){
		// 	return !todo.get('completed');
		// });
		return this.without.apply(this, this.completed());
	},
	nextOrder: function() {
		if ( !this.length ) {
			return 1;
		}
		return this.last().get('order') + 1;
	},
	comparator: function( todo ) {
		return todo.get('order');
	}
});

app.Todos = new TodoList();