// WebBrawler, a beat-em-up style game written in javascript/DHTML
// Copyright (C) 2008  Seth Galbraith. See copying.txt for full copyright notice

var entities = new Array()
var triggers = new Array()
var players = new Array()

function startSolarSystem() {
  entities[entities.length] = new Planet("mars",  18, 350, 687)
  entities[entities.length] = new Planet("earth", 35, 300, 365.25)
  entities[entities.length] = new Planet("sun", 232, 0, 0)
  entities[entities.length - 1].setClickable(false)
  setInterval(think, 20)
}

function startGroundScene() {
  players[0] = new Player("1",
    83, // key code for S key
    70, // key code for F key
    69, // key code for E key
    68, // key code for D key
    32) // key code for spacebar
  players[1] = new Player("2",
    37, // key code for left arrow
    39, // key code for right arrow
    38, // key code for up arrow
    40, // key code for down arrow
    13) // key code for enter key
  players[1].avatar.x = parseInt(getStyle("playarea", "width"))
  players[1].avatar.y = parseInt(getStyle("playarea", "height"))
  players[1].avatar.facing = "left"
  entities[entities.length] = players[0].avatar
  entities[entities.length] = players[1].avatar
  setInterval(think, 50)
}

function think() {
  var l = 0
  var t = 0
  var r = l + parseInt(getStyle("playarea", "width"))
  var b = t + parseInt(getStyle("playarea", "height"))
  for (var i = 0; i < entities.length; i++)
    entities[i].move(l, t, r, b, triggers)
  entities.sort(compareEntities)
  for (var i = 0; i < entities.length; i++)
    entities[i].element.style.zIndex = i
}

function compareEntities(a, b) {
  return a.y - b.y
}

function keyDown(event) {
  code = getKeyCode(event)
  for (var i = 0; i < players.length; i++)
    players[i].keyDown(code)
}

function keyUp(event) {
  code = getKeyCode(event)
  for (var i = 0; i < players.length; i++)
    players[i].keyUp(code)
}

function writeInventories() {
  for (var i = 0; i < 2; i++) {
    suffix = (i + 1)
    document.write('  <div id="inventory' + (i + 1) + '">\n')
    document.write('    <img src="../graphics/controls' + (i + 1) + '.png" />\n')
    document.write('    <br />\n')
    document.write('    <br />\n')
    document.write('     <div class="inventory">\n')
    document.write('      <b>equip player ' + (i + 1) + '</b>\n')
    document.write('      <ul>\n')
    document.write('        <li><a href="#" onclick="players[' + i + 
      '].avatar.equip(' + "'unarmed'" + ')">unarmed</a></li>\n')
    document.write('        <li><a href="#" onclick="players[' + i + 
      '].avatar.equip(' +  "'sword'"  + ')">sword</a></li>\n')
    document.write('      </ul>\n')
    document.write('    </div>\n')
    document.write('    <div id="score' + (i + 1) + '" style="width:100px"></div>\n')
    document.write('    <div id="hp'    + (i + 1) + '" style="width:100px"></div>\n')
    document.write('  </div>\n')
  }
}

