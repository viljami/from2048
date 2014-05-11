define([
    'config',
    'box2d.setup',
    'box2d.utils',
    'box'
], function(
    config,
    box2dSetup,
    box2dUtils,
    Box
){
    var splitImpulse = config.splitImpulse;

    var b2Vec2 = Box2D.Common.Math.b2Vec2;
    var p2u = box2dUtils.p2u;
    var u2p = box2dUtils.u2p;

    var world = box2dSetup.world;
    var boxes = {};

    var create = function(x, y, w, h, isStatic){
        if (! x) x = y = w = h = 1;

        var box = new Box(x, y, w, h);
        box.init(isStatic);
        box.body = world.CreateBody(box.bodyDef);
        box.body.CreateFixture(box.fixDef);

        boxes[box.id] = box;
        return box;
    };

    var remove = function(box){
        boxes[box.id] = undefined;
        delete boxes[box.id];

        world.DestroyBody(box.body);
    };

    var splitBox = function(box){
        var center = box.body.GetWorldCenter(); // .x, .y

        if (box.value === 2) return;

        remove(box); // box

        var x1, y1, x2, y2, w, h, i1, i2, b1, b2;
        if (box.width > box.height) {
            x1 = center.x - box.width / 2 - 0.05;
            x2 = center.x + box.width / 2 + 0.05;
            y1 = y2 = center.y;
            w = box.width / 2;
            h = box.height;
            i1 = new b2Vec2(-w * h * splitImpulse, 0);
            i2 = new b2Vec2(w * h * splitImpulse, 0);
        } else {
            x1 = x2 = center.x;
            y1 = center.y - box.height / 2 - 0.05;
            y2 = center.y + box.height / 2 + 0.05;
            w = box.width;
            h = box.height / 2;
            i1 = new b2Vec2(0, -w * h * splitImpulse);
            i2 = new b2Vec2(0, w * h * splitImpulse);
        }

        b1 = create(x1, y1, w, h);
        b2 = create(x2, y2, w, h);
        b1.value = box.value / 2;
        b2.value = box.value / 2;
        b1.body.ApplyImpulse(i1, new b2Vec2(x1, y1));
        b2.body.ApplyImpulse(i2, new b2Vec2(x2, y2));
    };

    var joinBoxes = function(box1, box2){
        var w = box1.width,
            h = box1.height,
            center1 = box1.body.GetWorldCenter(),
            center2 = box2.body.GetWorldCenter(),
            value = box1.value * 2,
            x, y, center;

        if (w > h){
            center = center1.y < center2.y ? center1 : center2;
            h *= 2;
            x = center.x;
            y = center.y - box1.height / 4;
        } else {
            center = center1.x < center2.x ? center1 : center2;
            w *= 2;
            x = center.x - box1.width / 4;
            y = center.y;
        }

        remove(box1);
        remove(box2);

        create(x, y, w, h).value = value;
    };

    createWalls = function(){
        var w = p2u(window.innerWidth);
        var h = p2u(window.innerHeight);

        create(w / 2, -2, w, 2, true); // top
        create(w + 2, h / 2, 2, h, true); // right
        create(w / 2, h + 2, w, 2, true); // bottom
        create(-2, h / 2, 2, h, true); // left
    };

    return {
        boxes: boxes,
        create: create,
        createWalls: createWalls,
        remove: remove,
        splitBox: splitBox,
        joinBoxes: joinBoxes
    };
});
