define([], function(){
    var b2Vec2 = Box2D.Common.Math.b2Vec2;

    var canvas = document.getElementsByTagName("canvas")[0];
    var context = canvas.getContext('2d');
    context.font = '12pt "Clear Sans", "Helvetica Neue", Arial, sans-serif';

    var boxSettings = {
        4096: {
            color: '#000',
            fontColor: '#fff',
            fontSize: '',
            fontPos: []
        },

        2048: { // 0 0 30px 10px rgba(243, 215, 116, 0.55556), inset 0 0 0 1px rgba(255, 255, 255, 0.33333)
            color: '#edc22e',
            fontColor: '#f9f6f2',
            fontSize: '',
            fontPos: []
        },
        1024: {
            color: '#edc53f',
            fontColor: '#f9f6f2',
            fontSize: '',
            fontPos: []
        },
        512: { // 0 0 30px 10px rgba(243, 215, 116, 0.39683), inset 0 0 0 1px rgba(255, 255, 255, 0.2381)
            color: '#edc850',
            fontColor: '#f9f6f2',
            fontSize: '',
            fontPos: []
        },
        256: { // box shadow: 0 0 30px 10px rgba(243, 215, 116, 0.31746), inset 0 0 0 1px rgba(255, 255, 255, 0.19048)
            color: '#edcc61',
            fontColor: '#f9f6f2',
            fontSize: '',
            fontPos: []
        },
        128: {
            color: '#edcf72',
            fontColor: '#f9f6f2',
            fontSize: '',
            fontPos: []
        },
        64: {
            color: '#f65e3b',
            fontColor: '#f9f6f2',
            fontSize: '',
            fontPos: []
        },
        32: {
            color: '#f67c5f',
            fontColor: '#f9f6f2',
            fontSize: '',
            fontPos: []
        },
        16: {
            color: '#f59563',
            fontColor: '#f9f6f2',
            fontSize: '',
            fontPos: []
        },
        8: {
            color: '#f2b179',
            fontColor: '#f9f6f2',
            fontSize: '',
            fontPos: []
        },
        4: {
            color: '#ede0c8',
            fontColor: '#776e65',
            fontSize: '',
            fontPos: []
        },
        2: {
            color: '#eee4da',
            fontColor: '#776e65',
            fontSize: '',
            fontPos: []
        }
    };

    return {
        alallowSleep: true,
        canvas: canvas,
        context: context,
        gravity:  new b2Vec2(0, 5),
        scale: 30.0,
        boxSettings: boxSettings,
        splitImpulse: 30
    };
});
