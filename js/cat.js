var BigCat = function(x,y,cat_level,key){
    this.cat_level = cat_level;
    this.key = key;
    this.points = [];
    let _path = "";
    let verticesRaw = cat_shapes[this.cat_level];
    for(let p of verticesRaw){
        let px = p[0] / 4 - 150;
        let py = p[1] / 4 - 150;
        _path += " " + px  + " " + py ;
        this.points.push([px ,py]);
    }
    let _vertices = Vertices.fromPath(_path)
    this.body = Bodies.fromVertices(x, y, _vertices,{
        cat_level:this.cat_level,
        cat_key:key,
        frictionStatic:1
    },false,0.01,10);
    this.center = Vertices.centre(_vertices);
    World.add(world,this.body);
    this.show = function(){
        let pos = this.body.position;
        let angle = this.body.angle;
        let frameInfo = catConfig.frames['c' + (this.cat_level + 1) + ".png"].frame;
        let [x,y,w,h] = [frameInfo.x,frameInfo.y,frameInfo.w,frameInfo.h];
        push();
        translate(pos.x,pos.y);
        rotate(angle);
        let [cx,cy] = [this.center.x,this.center.y];
        image(catSprite,-w / 4 - cx,-h / 4 - cy, w / 2 , h / 2 , x,y, w, h);
        pop();
    }
    this.removeFromWorld = function(){
        World.remove(world,this.body);
    }
}