// var app = app || {};

var RoutesApp = Backbone.Router.extend({
    routes: {
        "": "start", 
        "/": "start", 
        "graph": "showGraph"
    },

    start: function () {
        $(".graph").hide(); 
        $(".skills").show();

    },

    showGraph: function () {
        $(".skills").hide();
        $(".graph").show();
    }
});

var routesApp = new RoutesApp(); 

Backbone.history.start();