// Entity, a generic middle ground prop which can be sorted by depth
// Copyright (C) 2008  Seth Galbraith. See copying.txt for full copyright notice

function Entity(id) {
  this.element = document.getElementById(id)
  this.y = parseInt(getStyle(this.element, "top"))
}
Entity.prototype.move = function (l, t, r, b, triggers) {
}

