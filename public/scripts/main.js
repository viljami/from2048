
require.config({
    paths: {
        'lodash': '/lodash'
    }
});

require([
    'config',
    'events',
    'game',
    'score'
], function(
    config,
    events,
    game,
    score
){
    // GAME
    game.init();
    game.step();

    var startGame = function(e){
        e.preventDefault();

        config.canvas.removeEventListener('mouseup', startGame);
        game.start();
    };

    config.canvas.addEventListener('mouseup', startGame);
    game.controlsActivate();
console.log('KKKKKKKKKKKK');
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
