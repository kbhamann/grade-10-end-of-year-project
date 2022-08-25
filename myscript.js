//Variables
let x = 400
let y = 400
let xspd = 0
let yspd = -10
let jump = 1
let buildmode = 1
let length = 0
let angle;
let grappleAngle;
let grangle
let spd;
let mPressed = 0
let used = 1
let used1 = 1
let used2 = 1
let bx1
let bx2
let by1
let by2
let telesafe = 1
let timer = 0
let telecool = 0
let stamina = 100
let xcollision = false
let colliders = [
  [],
  []
]

//Variables



function setup() {
	let sketch = createCanvas(1200, 675);
    sketch.parent("mycanvas");
    background(200,150,150);
    angleMode(DEGREES)
    frameRate(60);
}//end setup

function draw() {
  used1 = 1
  background(0)
  
  {//Control Bundle
    {//Basic Key Presses
      if (keyIsDown(65) || keyIsDown(187)) {
        xspd -= 0.2;
      }//'A' Press
      if (keyIsDown(68) || keyIsDown(187)) {
        xspd += 0.2;
      }//'D' Press
      if (keyIsDown(83) || keyIsDown(187)) {
        yspd += 0.2;
      }//'S' Press
    }//Basic Key Presses
    
    
    if (y < height-25) {
      
      y += 1
      yspd += 0.1    
      
      if (keyIsDown(68) || keyIsDown(65) || keyIsDown(187)) {} else {
        if (xspd > 0) {xspd -= 0.01}
        if (xspd < 0) {xspd += 0.01}
      }
      
    } else {
      if (y > height - 25) {
        y = height - 25
        yspd = 0.001
        jump = 2
        stamina = 100
      }
      
      
      if (keyIsDown(68) || keyIsDown(65) || keyIsDown(187)) {} else {
        for (let i = 0; i < 10; i++) {
          if (xspd > 0) {xspd -= 0.01}
          if (xspd < 0) {xspd += 0.01}
        }
      }
      if (xspd > 7) {xspd -= 0.3}
      if (yspd > 7) {yspd -= 0.3}
      if (xspd < -7) {xspd += 0.3}
      if (yspd < -7) {yspd += 0.3}
      
    }
    
    grappleAngle = atan((yspd)/(xspd))
    if (yspd < 0 && xspd < 0) {}
    if (yspd > 0 && xspd < 0) {grappleAngle += 360}
    if (yspd < 0 && xspd > 0) {grappleAngle += 180}
    if (yspd > 0 && xspd > 0) {grappleAngle += 180}
    spd = sqrt(sq(xspd) + sq(yspd))
    grappleAngle += 90
    grappleAngle = -1*grappleAngle%360 + 720
    //print(grappleAngle%360)

    //x += xspd
    //y += yspd
    
    
    
  }//Control Bundle #1
  background(0)
  telesafe = 1
  
  xcollision = false
  fill(255)
  text((spd/1.5).toFixed(1) + " m/s", 20, 20)
  if (buildmode === -1) {
    text("buildmode", 100, 20)
  }
  for (let x2 = 0; x2 < length; x2++) {
      for (let y2 = 0; y2 < length; y2++) {
        bx1 = colliders[0][x2*2]
        bx2 = colliders[0][x2*2+1]
        by1 = colliders[1][x2*2]
        by2 = colliders[1][x2*2+1]
        fill(255)
        rect(bx1, by1, bx2-bx1, by2-by1)
        {//Collisions
          if (bx1 > bx2 && by1 > by2) {
            if (x-24 < bx1 && y - 20 < by1 && y + 20 > by2 && x+24 > bx1) {
            if (!keyIsDown(65)) {
              xcollision = true
              x = bx1 + 25
            } else if (keyIsDown(65)) {
              xspd = 0
              yspd = -10
              x = bx1 + 25
            }
          }//wall
            if (x+24 > bx2 && y - 20 < by1 && y + 20 > by2 && x-24 < bx2) {
            if (!keyIsDown(68)) {
              xcollision = true
              x = bx2 - 25
            } else if (keyIsDown(68)) {
              xspd = 0
              yspd = -10
              x = bx2 - 25
            }
          }//wall
            if (x-24 < bx1 && y+24 > by2 && y-24 < by2 && x+24 > bx2) {
            y = by2-25
            yspd = -0.01
            if (xspd > 7) {xspd -= 0.3}
            if (yspd > 7) {yspd -= 0.3}
            if (xspd < -7) {xspd += 0.3}
            if (yspd < -7) {yspd += 0.3}
            jump = 2
            stamina = 100
          }//floor
            if (x-24 < bx1 && y+24 < by1 && y-24 > by1 && x+24 > bx2) {
            y = by1+25
            yspd *= -0.8
            
          }//ceiling
        }
          if (bx1 < bx2 && by1 > by2) {
            if (x-24 < bx1 && y - 20 < by1 && y + 20 > by2 && x+24 > bx1) {
            if (!keyIsDown(68)) {
              xcollision = true
              x = bx1 - 25
            } else if (keyIsDown(68)) {
              xspd = 0
              yspd = -10
              x = bx1 - 25
            }
          }//wall
            if (x+24 > bx2 && y - 20 < by1 && y + 20 > by2 && x-24 < bx2) {
            if (!keyIsDown(65)) {
              xcollision = true
              x = bx2 + 25
            } else if (keyIsDown(65)) {
              xspd = 0
              yspd = -10
              x = bx2 + 25
            }
          }//wall
            if (x-24 < bx2 && y+24 > by2 && y-24 < by2 && x+24 > bx1) {
            y = by2-25
            yspd = -0.01
            if (xspd > 7) {xspd -= 0.3}
            if (yspd > 7) {yspd -= 0.3}
            if (xspd < -7) {xspd += 0.3}
            if (yspd < -7) {yspd += 0.3}
            jump = 2
            stamina = 100
          }//floor
            if (x-20 < bx2 && y+24 < by1 && y-24 >by1 && x+24 > bx1) {
            y = by1+25
            yspd *= -0.8
          }//ceiling
        }
        }//Collisions
        {//teleport
          if (bx1 > bx2 && by1 > by2) {
            if ((mouseX-25 < bx1 && mouseX+25 > bx2 && mouseY-25 < by1 && mouseY+25 > by2)) {
              fill(255)
              telesafe *= 0
            }//wall
            
          }
          if (bx1 < bx2 && by1 > by2) {
            if ((mouseX+25 > bx1 && mouseX-25 < bx2 && mouseY-25 < by1 && mouseY+25 > by2)) {
              fill(255)
              telesafe *= 0
            }//wall
          }
        }//teleport
        
      }
      
    }
  if (timer + 100 < millis() && xcollision === true) {
    xspd *= -0.7
    used2 = 1
  }
  if (xcollision === true && used2 === 1) {
    timer = millis()
    used2 = 0
  }

  
  x += spd*sin(grappleAngle)
  y += spd*cos(grappleAngle)
  
  ellipse(x, y, 50, 50)
}//end draw

function keyPressed() {
  if (keyIsDown(32) || keyIsDown(187)) {
    buildmode *= -1 
  }//'S' Press
  if (keyIsDown(87) && jump > 0 || keyIsDown(187) && jump > 0) {
    yspd = -7;
    y -= 0.5
    xspd *= 1.25
    jump -= 1
  }
}//end keyPressed
function mousePressed() {
  if(telesafe === 1 && buildmode === 1 && telecool + 2000 < millis()) {
    xspd = -5*(x-mouseX)/sqrt(sq(y-mouseY) + sq(x-mouseX))
    yspd = -10*(y-mouseY)/sqrt(sq(y-mouseY) + sq(x-mouseX))
    x = mouseX
    y = mouseY
    telecool = millis()
    for (let i = 0; i < 10; i++){
      
    }
  }

  if (buildmode === -1) {
    used *= -1
    
    if (used === -1){
      colliders[0][length*2] = round(mouseX/10)*10
      colliders[1][length*2] = round(mouseY/10)*10
    }
    if (used === 1){
      colliders[0][length*2+1] = round(mouseX/10)*10
      colliders[1][length*2+1] = round(mouseY/10)*10
      length+=1
    }
  }//build 
  if (buildmode === 1) {
    print(colliders[0])
  }
  
}//end mousePressed
  
