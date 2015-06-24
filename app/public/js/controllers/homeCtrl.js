(function(){
    "use strict";
    function homeCtrl(){
        function init() {
            var canvas = document.getElementById("canvas");
            if (canvas.getContext)
            {
                var ctx = canvas.getContext("2d");

//Specify the text alignment
                ctx.textAlign="start";

// Specify the font colour.
                ctx.fillStyle = "red";

// Specify the font size and font type.
                ctx.font = "25px Arial";

// Specify the shadow colour.
                ctx.shadowColor = "black";

// Specify the shadow offset.
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 2;

// Blur the shadow to create a bevel effect.
                ctx.shadowBlur = 3;

// Display the text with bevel effect
                ctx.fillText("COMMERCIAL APP", 20,40);
            }
        }
        init()

    }
    angular.module('app').controller('homeCtrl', [homeCtrl])
})();