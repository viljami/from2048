define([], function(){
    var b2Body = Box2D.Dynamics.b2Body;
    var b2BodyDef = Box2D.Dynamics.b2BodyDef;
    var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

    var id = 0;

    var Box = function(x, y, w, h){
        this.id = ++id;
        this.width = w;
        this.height = h;

        this.init = function(isStatic){

            this.fixDef = new b2FixtureDef();
            this.fixDef.density = 1.0;
            this.fixDef.friction = 0.5;
            this.fixDef.restitution = 0.2;
            this.fixDef.shape = new b2PolygonShape();
            this.fixDef.shape.SetAsBox(w, h);

            this.bodyDef = new b2BodyDef();
            this.bodyDef.type = isStatic ? b2Body.b2_staticBody : b2Body.b2_dynamicBody;
            this.bodyDef.position.Set(x, y);
            this.bodyDef.userData = this;
        };
    };

    return Box;
});
