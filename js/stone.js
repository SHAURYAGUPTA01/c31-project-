class Stone{
    constructor(x,y,r){
     this.body = Bodies.circle(x , y , r, { restitution: 0.8}) 
     this.r = r
     World.add(world,this.body)
     this.image = loadImage("assets/stone.png")
    }

    display(){
        push()
        image(this.image,this.body.position.x , this.body.position.y , 50 , 50)
        pop()
    }
}