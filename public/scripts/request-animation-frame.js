define([], function(){
    // Source: http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})
