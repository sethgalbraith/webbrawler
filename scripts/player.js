// Player, handles input for a single user
// Copyright (C) 2008  Seth Galbraith. See copying.txt for full copyright notice

function Player(suffix, left, right, up, down, attack) {
  this.left = left
  this.right = right
  this.up = up
  this.down = down
  this.attack = attack
  this.avatar = new Avatar(suffix)
  this.north = false
  this.south = false
  this.east = false
  this.west = false
}
Player.prototype.keyDown = function (code) {
  if (code == this.left)   this.west  = true
  if (code == this.right)  this.east  = true
  if (code == this.up)     this.north = true
  if (code == this.down)   this.south = true
  if (code == this.attack) this.avatar.attack()
  this.direction()
}
Player.prototype.keyUp = function (code) {
  if (code == this.left)  this.west  = false
  if (code == this.right) this.east  = false
  if (code == this.up)    this.north = false
  if (code == this.down)  this.south = false
  this.direction()
}
Player.prototype.direction = function () {
	// recalculate horizontal and vertical velocity
	this.avatar.xVel = 0
	this.avatar.yVel = 0
	if (this.north) this.avatar.yVel = -AVATAR_Y_SPEED
	if (this.south) this.avatar.yVel =  AVATAR_Y_SPEED
	if (this.east)  this.avatar.xVel =  AVATAR_X_SPEED
	if (this.west)  this.avatar.xVel = -AVATAR_X_SPEED
}

