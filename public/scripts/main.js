
require.config({
    paths: {
        'lodash': '/lodash',
        'Box2D': '/vendor/Box2dWeb-2.1.a.3',
        'setup': '/lib/setup'
    },
    shim: {
        'Box2D': {
            deps: [],
            exports: 'Box2D'
        },
        'setup': {
            deps: [],
            exports: 'setup'
        }
    }
});

require([
    'config',
    'events',
    'game',
    'score',
    'is-mobile',
    'Box2D',
    'setup'
], function(
    config,
    events,
    game,
    score,
    isMobile,
    Box2D
){
    // GAME
    game.init();
    game.step();

    var startEvent = 'mouseup'; //isMobile ? 'touchstart' : 'mouseup';

    var startGame = function(e){
        e.preventDefault();

        config.canvas.removeEventListener(startEvent, startGame);
        game.start();
    };

    config.canvas.addEventListener(startEvent, startGame);
    game.controlsActivate();

    // SCORE
    score.draw();

    events.on('box:split', function(){
        score.more(2);
        score.draw();
    });

    events.on('box:join', function(){
        score.less(2);
        score.draw();
    });
});
