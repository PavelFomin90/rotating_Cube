var setSpining = function(domElement, derection, duration,autoStart){
        var autoStart = autoStart || "y";

        domElement.setInitialRotate = function(){
            var sides = domElement.querySelectorAll('.side');
            var sidesLen = sides.length;
            for (var i = 0; i < sidesLen; i++){
                var init = 90*i;
                sides[i].style.transform = "rotateY("+ init + "deg) translateZ(120px)";
            }
        }

        domElement.leftSpin = function (){
            var sides = domElement.querySelectorAll('.side');
            var sidesLen = sides.length;
            for (var i = 0; i < sidesLen; i++){
               var currentTransform = sides[i].style.transform.split("(");
                var oldRotate = parseInt(currentTransform[1]);
                 sides[i].style.transform = "rotateY(" + (oldRotate - 90) + "deg) translateZ(120px)";
            }
        }

        domElement.rightSpin = function(){
            var sides = domElement.querySelectorAll('.side');
            var sidesLen = sides.length;
            for (var i = 0; i < sidesLen; i++){
               var currentTransform = sides[i].style.transform.split("(");
                var oldRotate = parseInt(currentTransform[1]);
                 sides[i].style.transform = "rotateY(" + (oldRotate + 90) + "deg) translateZ(120px)";
            }
        }

        domElement.startSpining = function(derection, duration){
            var duration = duration || 3000;
            if(derection == "right"){
                domElement.spin = setInterval(function(){
                    domElement.rightSpin();
                },duration)
            }else if(derection == "left"){
                domElement.spin = setInterval(function(){
                    domElement.leftSpin();
                },duration)
            }
            domElement.restartSpining = function(){
                domElement.startSpining(derection, duration);
            }
        }

        domElement.stopSpining = function(){
            clearInterval(domElement.spin);
        }

        function autoInit(){
            domElement.setInitialRotate();
            domElement.startSpining(derection,duration);
            domElement.addEventListener("mouseenter",function(){
                domElement.stopSpining();
            })
            domElement.addEventListener("mouseleave",function(){
                domElement.restartSpining(derection,duration);
            })
            window.onblur = function () {
                domElement.stopSpining();
            }
            window.onfocus = function () {
                domElement.restartSpining(derection,duration);
            }

        };

        if (autoStart == "y"){
            autoInit();
        } else {
            domElement.setInitialRotate();
            domElement.addEventListener("mouseenter",function(){
                domElement.stopSpining();
            })
            domElement.addEventListener("mouseleave",function(){
                domElement.restartSpining(derection,duration);
            })
        }


};