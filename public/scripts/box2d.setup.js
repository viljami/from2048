define([
    'config',
    'contact-listener'
], function(
    config,
    contactListener
){
    var b2Vec2 = Box2D.Common.Math.b2Vec2;
    var b2BodyDef = Box2D.Dynamics.b2BodyDef;
    var b2Body = Box2D.Dynamics.b2Body;
    var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    var b2Fixture = Box2D.Dynamics.b2Fixture;
    var b2MassData = Box2D.Collision.Shapes.b2MassData;
    var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
    var b2World = Box2D.Dynamics.b2World;

    var world = new b2World(config.gravity, config.allowSleep);
    world.SetContactListener(contactListener);
    //
    // var debugDraw = new b2DebugDraw();
    // debugDraw.SetSprite(config.context);
    // debugDraw.SetDrawScale(config.scale);
    // debugDraw.SetFillAlpha(0.3);
    // debugDraw.SetLineThickness(1.0);
    // debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    // world.SetDebugDraw(debugDraw);

    var timeStep = 1 / 60;
    var step = function(){
        //frame-rate, velocity iterations, position iterations
        world.Step(timeStep, 10, 10);
        // world.DrawDebugData();
        world.ClearForces();
    };

    return {
        world: world,
        step: step
    };
});
