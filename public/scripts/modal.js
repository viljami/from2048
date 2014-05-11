define([

], function(

){
    var container = document.getElementsByClassName('modal')[0];
    var content = document.getElementsByClassName('modal-content')[0];
    var scoreEl = document.getElementsByClassName('modal-score')[0];
    var twitterEl = document.getElementsByClassName('twitter-share-button')[0];

    container.style.cssText = [
        'position: fixed',
        'top: 0',
        'left: 0',
        'right: 0',
        'bottom: 0'
    ].join(';');

    content.style.cssText = [
        'width: 300px',
        'background-color: rgba(0, 0, 0, 0.5)',
        'margin: 50px auto',
        'padding: 20px'
    ].join(';');

    var modal = {
        content: content,

        show: function(score){
            if (! score) score = 0;

            scoreEl.innerText = score;
            // twitterEl.src = 'http://platform.twitter.com/widgets/tweet_button.1399599786.html#_=1399765699685&count=none&hashtags=from2048&id=twitter-widget-0&lang=en&original_referer=http%3A%2F%2Flocalhost%3A3000%2Ffrom2048%2Findex.html&related=viljamipeltola&size=m&text=I%20completed%20From%202048%20with%20score%20' + score + '&url=http%3A%2F%2Flocalhost%3A3000%2Ffrom2048%2Findex.html';
            twitterEl.dataset.text = 'I completed From 2048 with score ' + score + '!';
            // Twitter code
            !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');

            container.style.display = 'block';
        },

        hide: function(){
            container.style.display = 'none';
        }
    };

    modal.hide();
    document.body.appendChild(container);

    return modal;
});
