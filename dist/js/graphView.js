var app = app || {};

app.GraphView = Backbone.View.extend({
    el: '.graph',

    events: {

    },

    initialize: function() {
        this.$graphBlock = this.$('#myChart');
    },

    render: function() {
        if ( app.Skills.length ) {
            
            if (this.$el.data('graph-init') == 'true') {
                app.myChart.destroy();
            }

            app.myChart = new Chart(this.$graphBlock, {
                type: 'bar',
                data: {
                    labels: this.getSkillTitle(),
                    datasets: [{
                        label: 'skill',
                        data: this.getSkillLevels(),
                        backgroundColor: this.getColors('0.2'),
                        borderColor: this.getColors('1'),
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });

        }

        this.$el.data('graph-init', 'true');

        return this;
    },

    getSkillTitle: function() {
        var titles = app.Skills.pluck("skillName");
        return titles;
    },
    getSkillLevels: function() {
        var levels = app.Skills.pluck("skillLevel");
        return levels;
    },

    getColors: function(opacity){
        // TODO make colors dinamicly
        var colors = [
            'rgba(0, 99, 255,' + opacity + ')',
            'rgba(168, 75, 75, ' + opacity + ')',
            'rgba(235, 206, 0, ' + opacity + ')',
            'rgba(50, 200, 20, ' + opacity + ')',
            'rgba(20, 200, 200, ' + opacity + ')',
            'rgba(70, 100, 130, ' + opacity + ')',
            'rgba(100, 45, 135, ' + opacity + ')',
            'rgba(190, 23, 150, ' + opacity + ')',
            'rgba(200, 20, 60, ' + opacity + ')'
        ];
        var rgbaArray = [];
        for (i=0; i<app.Skills.length; i++) {
            rgbaArray.push(colors[this.getRandomArbitrary(0, colors.length)]);
        }
        return rgbaArray;
    },

    getRandomArbitrary: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },


});