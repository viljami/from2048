define([
    'config',
    'box2d.setup'
], function(
    config,
    box2dSetup
){
    var b2AABB = Box2D.Collision.b2AABB;
    var scale = config.scale;
    var world = box2dSetup.world;

    var pixelToUnit = function(pixels){
        return pixels / scale;
    };

    var unitToPixel = function(units){
        return units * scale;
    };

    var getBodyAtCoordinate = function(callback, coordinate){
        var aabb = new b2AABB();
        aabb.lowerBound.Set(coordinate.x - 0.001, coordinate.y - 0.001);
        aabb.upperBound.Set(coordinate.x + 0.001, coordinate.y + 0.001);

        world.QueryAABB(function(fixture){
            var body = fixture.GetBody();
            body.SetAwake(true);
            if (callback) callback(body);

            return false; // NOT to continue the query, take only the first
        }, aabb);
        return;
    };

    return {
        p2u: pixelToUnit,
        u2p: unitToPixel,
        getBodyAt: getBodyAtCoordinate
    };
});
