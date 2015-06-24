(function(){
    "use strict";
    function d3Bars(d3) {
        return {
            restrict: 'EA',
            scope: {
                data: "=",
                label: "@",
                onClick: "&"
            },
            link: function(scope, iElement, iAttrs) {
                var svg = d3.select(iElement[0])
                    .append("svg")
                    .attr("width", "1300%");

                // on window resize, re-render d3 canvas
                window.onresize = function() {
                    return scope.$apply();
                };
                scope.$watch(function(){
                        return angular.element(window)[0].innerWidth;
                    }, function(){
                        return scope.render(scope.data);
                    }
                );

                // watch for data changes and re-render
                scope.$watch('data', function(newVals, oldVals) {
                    return scope.render(newVals);
                }, true);

                // define render function
                scope.render = function(data) {
                    // remove all previous items before render
                    svg.selectAll("*").remove();
                    if (scope.data != null) {
                        // setup variables
                        var width, height, max;
                        width = d3.select(iElement[0])[0][0].offsetWidth - 20;
                        // 20 is for margins and can be changed
                        height = scope.data.length * 35;
                        // 35 = 30(bar height) + 5(margin between bars)
                        // Use the category20() scale function for multicolor support
                        var color = d3.scale.category20();
                        max = 98;
                        // this can also be found dynamically when the data is not static
                        // max = Math.max.apply(Math, _.map(data, ((val)-> val.count)))

                        // set the height based on the calculations above
                        svg.attr('height', height);
                        //create the rectangles for the bar chart
                        svg.selectAll("rect")
                            .data(data)
                            .enter()
                            .append("rect")
                            .on("click", function (d, i) {
                                return scope.onClick({item: d});
                            })
                            .attr("height", 30) // height of each bar
                            .attr("width", 0) // initial width of 0 for transition
                            .attr("x", 10) // half of the 20 side margin specified above

                            .attr("y", function (d, i) {
                                return i * 35;
                            }) // height + margin between bars
                            .attr('fill', function (d) {
                                return color(d.count);
                            })
                            .transition()
                            .duration(1000) // time of duration
                            .attr("width", function (d) {
                                return d.count / (max / width);
                            }); // width based on scale

                        svg.selectAll("text")
                            .data(data)
                            .enter()
                            .append("text")
                            .attr("fill", "#ffffff")
                            .attr("y", function (d, i) {
                                return i * 35 + 22;
                            })
                            .attr("x", 15)
                            .text(function (d) {
                                return d["name"] + " (" + d["count"] + " screens)";
                            });
                    }
                    ;
                }
            }
        };
    };
    angular.module('app').directive('d3Bars', ['d3',d3Bars])
})();