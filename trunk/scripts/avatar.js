// Avatar, an animated fighting entity
// Copyright (C) 2008  Seth Galbraith. See copying.txt for full copyright notice

var AVATAR_RUN_DELAY = 5
var AVATAR_ATTACK_DURATION = 5
var AVATAR_FALL_DURATION = 50
var AVATAR_SWORD_IMAGE_WIDTH = 36
var AVATAR_SWORD_IMAGE_HEIGHT = 20
var AVATAR_UNARMED_IMAGE_WIDTH = 32
var AVATAR_UNARMED_IMAGE_HEIGHT = 20
var AVATAR_X_SIZE = 10    // physical width in pixels
var AVATAR_Y_SIZE = 4     // physical depth in pixels
var AVATAR_X_SPEED = 4    // horizontal movement speed
var AVATAR_Y_SPEED = 2    // vertical movement speed

preloadImages([
  "../graphics/sword/readyleft.gif", "../graphics/sword/readyright.gif",
  "../graphics/sword/advanceleft.gif", "../graphics/sword/advanceright.gif",
  "../graphics/sword/retreatleft.gif", "../graphics/sword/retreatright.gif",
  "../graphics/sword/attackleft.gif", "../graphics/sword/attackright.gif",
  "../graphics/sword/fallenleft.gif", "../graphics/sword/fallenright.gif",
  "../graphics/sword/runleft.gif", "../graphics/sword/runright.gif",
  "../graphics/sword/runup.gif", "../graphics/sword/rundown.gif",
  "../graphics/unarmed/readyleft.gif", "../graphics/unarmed/readyright.gif",
  "../graphics/unarmed/advanceleft.gif", "../graphics/unarmed/advanceright.gif",
  "../graphics/unarmed/retreatleft.gif", "../graphics/unarmed/retreatright.gif",
  "../graphics/unarmed/attackleft.gif", "../graphics/unarmed/attackright.gif",
  "../graphics/unarmed/fallenleft.gif", "../graphics/unarmed/fallenright.gif",
  "../graphics/unarmed/runleft.gif", "../graphics/unarmed/runright.gif",
  "../graphics/unarmed/runup.gif", "../graphics/unarmed/rundown.gif"])

function Avatar(suffix) {
  this.suffix = suffix
  this.lMargin = AVATAR_X_SIZE / 2
  this.rMargin = AVATAR_X_SIZE / 2
  this.tMargin = AVATAR_Y_SIZE / 2
  this.bMargin = AVATAR_Y_SIZE / 2
  this.x = 0
  this.y = 0
  this.xVel = 0
  this.yVel = 0
  this.fallTime = 0
  this.attackTime = 0
  this.runTime = AVATAR_RUN_DELAY
  this.facing = "right"
  this.element = new Image()
  this.element.style.position = "absolute"
  this.oldImage = ""
  this.equip("unarmed")
  document.getElementById("playarea").appendChild(this.element)
  this.hitSound  = new Sound("../sounds/hit.wav")
  this.missSound = new Sound("../sounds/miss.wav")
}
Avatar.prototype.move = function (l, t, r, b, triggers) {
  if (this.fallTime <= 0) {
    this.x = this.x + this.xVel
    this.y = this.y + this.yVel
  }
  myLeft   = this.x - this.lMargin
  myRight  = this.x + this.rMargin
  myTop    = this.y - this.tMargin
  myBottom = this.y + this.bMargin
  if (myLeft   < l) this.x = l + this.lMargin
  if (myRight  > r) this.x = r - this.rMargin
  if (myTop    < t) this.y = t + this.tMargin
  if (myBottom > b) this.y = b - this.bMargin
  this.element.style.left = this.x + "px"
  this.element.style.top  = this.y + "px"
  this.animate()
  for (var i = 0; i < triggers.length; i++) {
    if (myLeft   > triggers[i].right)  continue
    if (myRight  < triggers[i].left)   continue
    if (myTop    > triggers[i].bottom) continue
    if (myBottom < triggers[i].top)    continue
	triggers[i].action()
  }
}
Avatar.prototype.animate = function () {
  this.attackTime = this.attackTime - 1
  this.fallTime = this.fallTime - 1
  this.runTime = this.runTime - 1
  if (this.fallTime > 0) {                       // fallen
    action = "fallen" + this.facing
  } else if (this.attackTime > 0) {              // attacking
    action = "attack" + this.facing
  } else if (this.xVel == 0 && this.yVel == 0) { // standing
    action = "ready" + this.facing
    this.runTime = AVATAR_RUN_DELAY
  } else if (this.runTime > 0) {                 // moving but not running yet
    action = "retreat" + this.facing
    if (this.facing == "left"  && this.xVel < 0) action = "advanceleft"
    if (this.facing == "right" && this.xVel > 0) action = "advanceright"
  } else {                                       // running
    if (this.xVel < 0) this.facing = "left"
    if (this.xVel > 0) this.facing = "right"
    if (Math.abs(this.yVel) <= Math.abs(this.xVel)) action = "run" + this.facing
    else if (this.yVel > 0) action = "runup"
    else action = "rundown"
  }
  this.setImage(this.folder + "/" + action + ".gif")
}
Avatar.prototype.setImage = function (newImage) {
  if (this.oldImage != newImage) {
    this.element.src = newImage
    this.oldImage  = newImage
  }
}
Avatar.prototype.attack = function () {
  if (this.fallTime > 0) return
  if (this.attackTime > 0) return
  this.attackTime = AVATAR_ATTACK_DURATION
  var left   = this.x
  var right  = this.x
  var top    = this.y - this.reach / 2
  var bottom = this.y + this.reach / 2
  if (this.facing == "left")  left  = this.x - this.reach
  if (this.facing == "right") right = this.x + this.reach
  if (this.xVel < 0) {this.facing = "left";  left  = this.x - this.reach}
  if (this.xVel > 0) {this.facing = "right"; right = this.x + this.reach}
  hit = false
  for (var i = 0; i < entities.length; i++) {
    if (entities[i].fall == undefined) continue
    if (entities[i] === this) continue
    if (entities[i].fallTime > 0) continue
    if (entities[i].x - entities[i].lMargin > right)  continue
    if (entities[i].x + entities[i].rMargin < left)   continue
    if (entities[i].y - entities[i].tMargin > bottom) continue
    if (entities[i].y + entities[i].bMargin < top)    continue
    entities[i].fall()
    document.getElementById("score" + this.suffix).innerHTML += "* "
    hit = true
  }
  if (hit) this.hitSound.play()
  else this.missSound.play()
}
Avatar.prototype.fall = function() {
  this.fallTime = AVATAR_FALL_DURATION
}
Avatar.prototype.equip = function (folder) {
  if (folder == "sword") {
    this.element.style.marginLeft = -AVATAR_SWORD_IMAGE_WIDTH / 2
    this.element.style.marginTop = AVATAR_Y_SIZE / 2 - AVATAR_SWORD_IMAGE_HEIGHT
    this.reach = AVATAR_SWORD_IMAGE_WIDTH / 2
  } else {
    this.element.style.marginLeft = -AVATAR_UNARMED_IMAGE_WIDTH / 2
    this.element.style.marginTop = AVATAR_Y_SIZE / 2 - AVATAR_UNARMED_IMAGE_HEIGHT
    this.reach = AVATAR_UNARMED_IMAGE_WIDTH / 2
  }
  this.folder = "../graphics/" + folder
  this.animate()
}

