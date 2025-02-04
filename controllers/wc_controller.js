angular.module('wc_app').controller('wc_controller', function($scope, $http, $interval) {



    $scope.S_rate = 1;
    $scope.MAX_clouds = 10;
    $scope.MAX_words = 20.;

    $scope.begin = function() {

        var req = {
            method: 'POST',
            url: '/stats/filepipline',
            data: { S_rate: $scope.S_rate,
                MAX_clouds: $scope.MAX_clouds,
                MAX_words: $scope.MAX_words,

            }
        };

        $http(req).then(function(res){console.log(res)});

        $scope.slot = -1;
        tc_display();

    };




    function tc_display() {

        $scope.timer = $interval(
            function wc_show(){

                $scope.slot++ ;
                console.log("slot:",$scope.slot);

                var static_path = 'data/slot_';
                var file  = static_path + String($scope.slot) +".json";

                $http.get(file)
                    .then(function(res) {

                        var fill = d3.scale.category20();
                        // console.log('data', $scope.cloud_data)
                        $scope.layout = d3.layout.cloud()
                            .size([500, 500])
                            .words(res.data)
                            .padding(5)
                            .rotate(function() { return (Math.random() * 40)-(Math.random() * 40); })
                            // .rotate(function() { return 30; })
                            .font("Impact")
                            .fontSize(function(d) { return d.size; })
                            .on("end", draw);

                        $scope.layout.start();

                        function draw(words) {
                            d3.select("#vis").append("svg")
                                .attr("width", $scope.layout.size()[0])
                                .attr("height", $scope.layout.size()[1])
                                .append("g")
                                .attr("transform", "translate(" + $scope.layout.size()[0] / 2 + "," + $scope.layout.size()[1] / 2 + ")")
                                .selectAll("text")
                                .data(words)
                                .enter().append("text")
                                .style("font-size", function(d) { return d.size + "px"; })
                                .style("font-family", "Impact")
                                .style("fill", function(d, i) { return fill(i); })
                                .attr("text-anchor", "middle")
                                .attr("transform", function(d) {
                                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                                })
                                .text(function(d) { return d.text; });
                        }

                    })}
            , $scope.S_rate * 1000, $scope.MAX_clouds
        );

        $scope.$on(
            "$destroy",
            function() {
                $interval.cancel( $scope.timer );
            }
        );
    }



    $scope.pause = function(){

        $interval.cancel( $scope.timer );

    };

    $scope.continue = function(){

        tc_display();

    };


    $scope.clear = function(){

        d3.select("#vis").selectAll('*').remove();
        // d3.select("#vis").remove();
        $scope.layout.stop();
        $interval.cancel( $scope.timer );
    };
    // $http.get('data/slot_1.json')
    //     .then(function(res) {
    //
    //         var fill = d3.scale.category20();
    //         // console.log('data', $scope.cloud_data)
    //         var $scope.layout = d3.$scope.layout.cloud()
    //             .size([500, 500])
    //             .words(res.data)
    //             .padding(5)
    //             .rotate(function() { return ~~(Math.random() * 2) * 90; })
    //             .font("Impact")
    //             .fontSize(function(d) { return d.size; })
    //             .on("end", draw);
    //
    //         $scope.layout.start();
    //
    //         function draw(words) {
    //             d3.select("#vis").append("svg")
    //                 .attr("width", $scope.layout.size()[0])
    //                 .attr("height", $scope.layout.size()[1])
    //                 .append("g")
    //                 .attr("transform", "translate(" + $scope.layout.size()[0] / 2 + "," + $scope.layout.size()[1] / 2 + ")")
    //                 .selectAll("text")
    //                 .data(words)
    //                 .enter().append("text")
    //                 .style("font-size", function(d) { return d.size + "px"; })
    //                 .style("font-family", "Impact")
    //                 .style("fill", function(d, i) { return fill(i); })
    //                 .attr("text-anchor", "middle")
    //                 .attr("transform", function(d) {
    //                     return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    //                 })
    //                 .text(function(d) { return d.text; });
    //         }
    //
    //     });


        // var fill = d3.scale.category20();

    // console.log("test1",$scope.layout);

    // var $scope.layout2 = d3.$scope.layout.cloud()
    //     .size([500, 500])
    //     .words([
    //         "Hello", "world", "normally", "you", "want", "more", "words",
    //         "than", "this","shit","love","fuck","languages","nature"].map(function(d) {
    //         return {text: d, size: 10 + Math.random() * 90};
    //     }))
    //     .padding(5)
    //     .rotate(function() { return ~~(Math.random() * 2) * 90; })
    //     .font("Impact")
    //     .fontSize(function(d) { return d.size; })
    //     .on("end", draw);
    //
    // console.log("test2",$scope.layout2);
    //
    //
    // $scope.layout2.start();

    // function draw(words) {
    //     d3.select("#vis").append("svg")
    //         .attr("width", $scope.layout.size()[0])
    //         .attr("height", $scope.layout.size()[1])
    //         .append("g")
    //         .attr("transform", "translate(" + $scope.layout.size()[0] / 2 + "," + $scope.layout.size()[1] / 2 + ")")
    //         .selectAll("text")
    //         .data(words)
    //         .enter().append("text")
    //         .style("font-size", function(d) { return d.size + "px"; })
    //         .style("font-family", "Impact")
    //         .style("fill", function(d, i) { return fill(i); })
    //         .attr("text-anchor", "middle")
    //         .attr("transform", function(d) {
    //             return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    //         })
    //         .text(function(d) { return d.text; });
    // }

});