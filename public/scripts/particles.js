define([
    'lodash',
    'config',
    'request-animation-frame'
], function(
    _,
    config,
    raf
){
    var context = config.context;

    var friction = 0.9;
    var X = 0, Y = 1, VX = 2, VY = 3, AX = 4, AY = 5, COLOR = 6, LIFE = 7, START = 8, R = 9;

    var mark = function(){ return Math.random() < 0.5 ? -1 : 1; };
    var isAlive = function(p){ return Date.now() - p[START] < p[LIFE]; };
    var update = function(p){
        p[AX] *= friction;
        p[VX] *= friction;
        p[X] += p[VX] + p[AX];
        p[AY] *= friction;
        p[VY] *= friction;
        p[Y] += p[VY] + p[AY];
    };
    var draw = function(p){
        // context.globalCompositeOperation = 'lighter';
        context.beginPath();
        var gradient = context.createRadialGradient(p[X], p[Y], 0, p[X], p[Y], p[R]);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
        gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.5)');
        gradient.addColorStop(0.4, p[COLOR]);
        gradient.addColorStop(0.9, 'rgba(255, 255, 255, 0.5)');
        gradient.addColorStop(1.0, 'rgba(255, 255, 255, 0)');

        context.fillStyle = gradient;
        context.arc(p[X], p[Y], p[R], Math.PI * 2, false);
        context.fill();
        // context.stroke();
    };

    var particleFactory = {
        mine: [],
        create: function(x, y, color){
            if (! color) color = 'rgba(237, 194, 46, 0.5)';
            var particle = [x, y, mark() * Math.random(), mark() * Math.random(), mark() * Math.random(), mark() * Math.random(), color, 500, Date.now(), Math.random() * 10 + 15];
            particleFactory.mine.push(particle);
        },

        remove: function(){
            var alives = particleFactory.mine.filter(isAlive);
            delete particleFactory.mine;
            particleFactory.mine = alives;
        },

        update: function(){
            particleFactory.mine.forEach(update);
        },

        draw: function(){
            particleFactory.mine.forEach(draw);
        }
    };

    var emitter = function(x, y, power){
        for (var i = 0; i < power; i++) particleFactory.create(x,y);
    };

    var loop = function(){
        if (! particleFactory.mine.length) return;

        particleFactory.remove();
        particleFactory.update();
        particleFactory.draw();
    };

    return {
        emit: emitter,
        loop: loop
    };
});
