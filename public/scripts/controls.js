define([
    'lodash',
    'events',
    'config',
    'box2d.utils',
    'is-mobile'
], function(
    _,
    events,
    config,
    box2dUtils,
    isMobile
){
    var canvas = config.canvas;
    var u2p = box2dUtils.u2p;
    var p2u = box2dUtils.p2u;
    var getBodyAt = box2dUtils.getBodyAt;

    var stopperEvent = isMobile ? 'touchstart' : 'mousedown';
    var actionEvent = isMobile ? 'touchstart' : 'mouseup';

    var reportBodyAtTap = function(body){
        events.trigger('tap:body', body);
    };

    var getUCoordinate = function(e){
        var x, y, touch;
        if (isMobile){
            touch = e.touches[0];
            x = touch.clientX;
            y = touch.clientY;
        } else {
            x = e.x;
            y = e.y;
        }
        
        return {x: p2u(x), y: p2u(y)};
    };

    var stopEventDead = function(e){
        e.preventDefault();
        e.stopPropagation();
        return e;
    };

    var clickHandler = _.compose(
        _.curry(getBodyAt)(reportBodyAtTap),
        getUCoordinate
        // stopEventDead
    );

    var activate = function(){
        if (! isMobile) canvas.addEventListener(stopperEvent, stopEventDead);
        canvas.addEventListener(actionEvent, clickHandler);
    };

    var deactivate = function(){
        if (! isMobile) canvas.removeEventListener(stopperEvent, stopEventDead);
        canvas.removeEventListener(actionEvent, clickHandler);
    };

    return {
        activate: activate,
        deactivate: deactivate
    };
});
