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
    var actionEvent = isMobile ? 'touchend' : 'mouseup';

    var reportBodyAtTap = function(body){
        events.trigger('tap:body', body);
    };

    var getUCoordinate = function(e){
        return {x: p2u(e.x), y: p2u(e.y)};
    };

    var stopEventDead = function(e){
        e.preventDefault();
        e.stopPropagation();
        return e;
    };

    var clickHandler = _.compose(
        _.curry(getBodyAt)(reportBodyAtTap),
        getUCoordinate,
        stopEventDead
    );

    var activate = function(){
        canvas.addEventListener(stopperEvent, stopEventDead);
        canvas.addEventListener(actionEvent, clickHandler);
    };

    var deactivate = function(){
        canvas.removeEventListener(stopperEvent, stopEventDead);
        canvas.removeEventListener(actionEvent, clickHandler);
    };

    return {
        activate: activate,
        deactivate: deactivate
    };
});
