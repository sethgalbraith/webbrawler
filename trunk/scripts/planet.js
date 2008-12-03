// Planet, an entity which orbits the center of the play area
// Copyright (C) 2008  Seth Galbraith. See copying.txt for full copyright notice

function Planet(id, radius, orbit, period) {
  this.orbit  = orbit
  this.period = period
  this.clickable = true
  this.element = new Image()
  this.element.setAttribute("id", id)
  this.element.setAttribute("src", "graphics/" + id + ".png")
  this.element.setAttribute("border", "0")
  this.element.style.position = "absolute"
  this.element.style.marginLeft = -radius
  this.element.style.marginTop  = -radius
  this.link = document.createElement("a")
  this.link.setAttribute("href", id + indexIfLocal())
  this.link.appendChild(this.element)
  document.getElementById("playarea").appendChild(this.link)
  this.days = 0
  this.move()
}

Planet.prototype.move = function (left, top, right, bottom, triggers) {
  this.days = this.days + 0.5
  if (this.period == 0) {
    this.x = 0
    this.y = 0
  } else {
    a = 2 * Math.PI * this.days / this.period
    this.x = Math.cos(a) * this.orbit
    this.y = Math.sin(a) * this.orbit / 3
  }
  this.element.style.left = ((left + right) / 2 + this.x) + "px"
  this.element.style.top  = ((top + bottom) / 2 + this.y) + "px"
}

Planet.prototype.setClickable = function (clickable) {
  if (clickable == this.clickable) return
  space = document.getElementById("playarea")
  if (clickable) {
    space.removeChild(this.element)
    space.appendChild(this.link)
  } else {
    space.removeChild(this.link)
    space.appendChild(this.element)
  }
  this.clickable = clickable
}

