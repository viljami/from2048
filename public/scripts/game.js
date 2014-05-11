define([
    'lodash',
    'config',
    'box2d.setup',
    'box2d.utils',
    'events',
    'controls',
    'box-factory',
    'contact-listener',
    'modal',
    'score',
    'particles'
], function(
    _,
    config,
    box2dSetup,
    box2dUtils,
    events,
    controls,
    boxFactory,
    contactListener,
    modal,
    score,
    particles
){
    var game = {};
    var context = config.context;
    var canvas = config.canvas;
    var boxSettings = config.boxSettings;

    var world = box2dSetup.world;
    var step = box2dSetup.step;
    var p2u = box2dUtils.p2u;
    var u2p = box2dUtils.u2p;

    var splitBoxesFromBody = function(body){
        var box = body.GetUserData();
        events.trigger('box:split', box);

        if (! box.value) return;
        
        if (box.value <= 2){
            var center = box.body.GetWorldCenter();
            particles.emit(u2p(center.x), u2p(center.y), 3);
            return boxFactory.remove(box);
        }

        boxFactory.splitBox(box);
    };

    var joinBoxesFromContact = function(contactPair){
        events.trigger('box:join', contactPair);
        boxFactory.joinBoxes.apply(null, contactPair);
    };

    var black = 'rgb(0, 0, 0)';
    var white = 'rgb(255, 255, 255)';

    var font = function(boxValue){

    };

    var drawBox = function(box){
        if (! box.value) return;

        var center = box.body.GetWorldCenter(),
            angle = box.body.GetAngle(),
            width = u2p(box.width),
            height = u2p(box.height);

        context.save();
        context.beginPath();
        // context.moveTo(u2p(center.x), u2p(center.y));
        context.translate(u2p(center.x), u2p(center.y));
        context.rotate(angle);
        context.fillStyle = boxSettings[box.value].color;
        context.fillRect(-width, -height,  width * 2, height * 2);
        context.fillStyle = boxSettings[box.value].fontColor;
        context.fillText(box.value < 10 ? ' ' + box.value : box.value, -10, 10);
        context.stroke();
        context.restore();
    };

    var draw = function(){
        _.forEach(boxFactory.boxes, drawBox);
    };

    var isFinished = function(){
        return _.keys(boxFactory.boxes).length <= 4;
    };

    game.init = function(){
        boxFactory.createWalls();

        var w = p2u(window.innerWidth);
        var h = p2u(window.innerHeight);
        var box = boxFactory.create(w / 2, h / 2, w / 3, h / 3);
        box.value = 2048;
    };

    game.step = function(){
        step();

        contactListener.contacts.forEach(joinBoxesFromContact);
        contactListener.reset();

        // context.globalCompositeOperation = "source-over";
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.globalCompositeOperation = "lighter";
        particles.loop();

        context.globalCompositeOperation = "source-over";
        draw();


        if (isFinished()){
            game.stop();
            modal.show(score.max);
        }
    };

    game.start = function(){
        if (game.interval) return;
        game.interval = setInterval(game.step, 1000 / 60);
    };

    game.controlsActivate = function(){
        events.on('tap:body', splitBoxesFromBody);
        controls.activate();
    };

    game.stop = function(){
        if (! game.interval) return;

        clearInterval(game.interval);

        events.off('tap:body');
        controls.deactivate();
    };

    return game;
});
