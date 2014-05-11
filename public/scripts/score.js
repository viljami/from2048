define([
    'lodash'
], function(
    _
){
    var container = document.createElement('div');
    document.body.appendChild(container);

    container.style.cssText = [
        'position: fixed',
        'top: 0',
        'right: 10px',
        'font-family: arial',
        'color: #333',
        'font-size: 16px'
    ].join(';');

    var p = document.createElement('p');
    container.appendChild(p);

    var spans = {
        total: document.createElement('span'),
        max: document.createElement('span')
    };

    _.forEach(spans, function(span){
        p.appendChild(span);
    });

    var score = {
        total: 0,
        max: 0,
        allTime: 0,

        more: function(amount){
            score.total += amount;

            if (score.total > score.max) score.max = score.total;
        },

        less: function(amount){
            score.total -= amount;
        },

        reset: function(){
            score.total = 0;
            score.max = 0;
        },

        draw: function(){
            spans.total.innerText = 'Score: ' + score.total;
            spans.max.innerText = 'Best: ' + score.max;
        }
    }

    return score;
})
