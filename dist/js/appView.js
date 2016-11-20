var app = app || {};

app.AppView = Backbone.View.extend({
    el: '.skills',

    events: {
        'click .new-skill' : 'createNewSkill',
        'click .clear-skills' : 'clearSkillsList',
        'click .show-graph' : 'showGraph'
    },

    initialize: function(){
        this.$inputSkillName = this.$('.enter-skill-name');
        this.$inputSkillLevel = this.$('.enter-skill-level');
        this.$clearButon = this.$('.clear-skills');
        this.$newSkillButon = this.$('.new-skill');
        this.$graphLink = this.$('.show-graph');
        this.$main = this.$('.main');
        this.listenTo(app.Skills, 'add', this.addOne);
        this.listenTo(app.Skills, 'reset', this.addAll);
        this.listenTo(app.Skills, 'remove', this.addAll);
        this.listenTo(app.Skills, 'all', this.render);
        app.Skills.fetch();
    },

    render: function() {
        if ( app.Skills.length ) {
            this.$main.removeClass('invisible');
            // this.$graphLink.removeClass('disabled');
        } else {
            this.$main.addClass('invisible');
            // this.$graphLink.addClass('disabled');
        }
    },

    showGraph: function(){
        var graphView = new app.GraphView();

        graphView.render();
        // if ( app.Skills.length ) {
        // // if ( false ) {
        //     // app.routesApp.navigate("showGraph", true);
        //     var myChart = new Chart(this.$chartCreate, {
        //         type: 'bar',
        //         data: {
        //             labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        //             datasets: [{
        //                 label: '# of Votes',
        //                 data: [12, 19, 3, 5, 2, 3],
        //                 backgroundColor: [
        //                     'rgba(255, 99, 132, 0.2)',
        //                     'rgba(54, 162, 235, 0.2)',
        //                     'rgba(255, 206, 86, 0.2)',
        //                     'rgba(75, 192, 192, 0.2)',
        //                     'rgba(153, 102, 255, 0.2)',
        //                     'rgba(255, 159, 64, 0.2)'
        //                 ],
        //                 borderColor: [
        //                     'rgba(255,99,132,1)',
        //                     'rgba(54, 162, 235, 1)',
        //                     'rgba(255, 206, 86, 1)',
        //                     'rgba(75, 192, 192, 1)',
        //                     'rgba(153, 102, 255, 1)',
        //                     'rgba(255, 159, 64, 1)'
        //                 ],
        //                 borderWidth: 1
        //             }]
        //         },
        //         options: {
        //             scales: {
        //                 yAxes: [{
        //                     ticks: {
        //                         beginAtZero:true
        //                     }
        //                 }]
        //             }
        //         }
        //     });

        // }
    },

    createOptionsGraph: function() {
        var options = {};

        options = {
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        };
        return options;
    },

    createDataGraph: function() {
        var dataObj = {};
        dataObj = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1,
                    data: [65, 59, 80, 81, 56, 55, 40],
                }
            ]
        };
        return dataObj;

    },

    addOne: function(skill){
        var view = new app.SkillView({
            model:skill
        });
        $('.skills-list').append( view.render().el );
    },

    addAll: function(){

        this.$('.skills-list').html('');
        app.Skills.each(this.addOne,this);
    },

    newAttributes: function() {
        return {
            skillLevel: this.$inputSkillLevel.val().trim(),
            order: app.Skills.nextOrder(),
            skillName: this.$inputSkillName.val().trim()
        };
    },

    createNewSkill: function( event ) {
        // TODO try to validate during molel creating
        if (this.$inputSkillName.val() !== '' && this.$inputSkillLevel.val()) {
            app.Skills.create( this.newAttributes() );
            this.$inputSkillName.val('');
            this.$inputSkillLevel.val('');
        }
    },

    clearSkillsList: function() {
        app.Skills.reset();
        app.Skills.localStorage._clear();
        this.$clearButon.addClass('disabled');
    }

});