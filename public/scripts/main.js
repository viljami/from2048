
require.config({
    paths: {
        'lodash': '/lodash'
    }
});

require([
    'config',
    'events',
    'game',
    'score',
    'is-mobile'
], function(
    config,
    events,
    game,
    score,
    isMobile
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
