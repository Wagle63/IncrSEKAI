renderVars = {
  posX: window.innerWidth / 2,
  posY: window.innerHeight / 2,
  mousePosX: 0,
  mousePosY: 0,
  mouseIsDown: false,
  diffX: 0,
  diffY: 0,
  currentMousePos: [0, 0],
  lastRender: Date.now(),
  autoPanTime: 1500,
  isAutoPanning: false
}

cachedBoxes = []
for (let i = 0; i < boxPositions.length; i++) {
  cachedBoxes.push(document.getElementsByClassName("box")[i])
}

inputVars = {
  //isMobile: mobileCheck(),
  keyInputX: 0,
  keyInputY: 0,
  keySpeedX: 0,
  keySpeedY: 0,
  keySpeedCap: 8,
  keySpeedDecel: 30,
  keyboardRenderPerSec: 72,
  keysHeld: {
    "w": false,
    "a": false,
    "s": false,
    "d": false,
    "ArrowUp": false,
    "ArrowLeft": false,
    "ArrowRight": false,
    "ArrowDown": false,
  },
  touchIsDown: false,
  lastTouch: null,
  currentTouchPos: [0, 0],
  touchPosX: 0,
  touchPosY: 0
}

//Sets the position of all the boxes based on the X and Y position variables
//This is laggy!
function render(x, y) {

  /*cachedBoxes[1].style.left = (x) + "px"
  dragonTabHeight = cachedBoxes[3].getBoundingClientRect().height
  cachedBoxes[1].style.top = (y + 162 + dragonTabHeight / 2) + "px"*/
  for (let i = 1; i <= unlocks; i++) {
    cachedBoxes[i].style.left = (x + boxPositions[i].posX) + "px"
    cachedBoxes[i].style.top = (y + boxPositions[i].posY) + "px"
  }
  /*if (unlocks >= 3) {
    //Magic tab
    cachedBoxes[6].style.left = (x) + "px"
    cachedBoxes[6].style.top = (y - 287) + "px"
    //Magic upgrades tab
    cachedBoxes[7].style.left = (x - 365) + "px"
    if (game.unlocks >= 6) { cachedBoxes[7].style.top = (y - 130) + "px" }
    else { cachedBoxes[7].style.top = (y - 235) + "px" }
  }*/
  /*document.body.style.backgroundPosition = (x / 4) + "px " + (y / 4) + "px"
  if (game.unlocks >= 29) cachedBoxes[38].style.backgroundPosition = (x / 6) + "px " + (y / 6) + "px"*/
  //console.log(Date.now() - renderVars.lastRender)
  renderVars.lastRender = Date.now();
}

render(renderVars.posX, renderVars.posY)

function firstRender() {
  for (let i = 0; i < cachedBoxes.length; i++) {
    cachedBoxes[i].style.left = (renderVars.posX + boxPositions[i].posX) + "px"
    cachedBoxes[i].style.top = (renderVars.posY + boxPositions[i].posY) + "px"
  }
}
firstRender();

//Automatically renders 10 times per second (there's probably a better way to do this)
function renderAuto() {
  //render(renderVars.posX, renderVars.posY)
  render(renderVars.posX + renderVars.diffX, renderVars.posY + renderVars.diffY)
}
setInterval(renderAuto, 100)

//Renders 72 times per second, but only if any movement keys are held
function renderKeyboardPan() {
  updatePanKeySpeed();
  if (renderVars.mouseIsDown || (Math.abs(inputVars.keySpeedX) < 0.1 && Math.abs(inputVars.keySpeedY) < 0.1)) return; // || bigFinishPoint > 0
  renderVars.posX = renderVars.posX + inputVars.keySpeedX;
  renderVars.posY = renderVars.posY + inputVars.keySpeedY;
  //console.log("rendering")
  render(renderVars.posX, renderVars.posY)
}
setInterval(renderKeyboardPan, 1000 / inputVars.keyboardRenderPerSec)

//Sets currentMousePos when mouse goes down to compare position when the user drags
function mouseDown(e) {
  if (renderVars.isAutoPanning || e.button !== 0) { return } //ensure we only respond to left clicks
  renderVars.currentMousePos[0] = [e.pageX]
  renderVars.currentMousePos[1] = [e.pageY]
  renderVars.mouseIsDown = true
  //resetPressedKeys();
}

//Resets variables for comparing position when mouse goes up
function mouseUp(e) {
  renderVars.mouseIsDown = false
  renderVars.posX = renderVars.posX + renderVars.diffX
  renderVars.posY = renderVars.posY + renderVars.diffY
  renderVars.diffX = 0
  renderVars.diffY = 0
}

//Sets the position to x,y
function posSet(x, y) {
  //Zoom stuff!
  //renderVars.posX = 0 - window.innerWidth / (renderVars.zoomMultiplier * 2)
  //renderVars.posY = 0 - window.innerHeight / (renderVars.zoomMultiplier * 2)
  renderVars.posX = x + window.innerWidth / 2
  renderVars.posY = y + window.innerHeight / 2
  render(renderVars.posX, renderVars.posY)
  resetPressedKeys(); //pressing home will reset all held keyboard keys in case of stuck keys
}

async function panTo(endX, endY) {
  renderVars.isAutoPanning = true;
  resetPressedKeys();
  let startTime = Date.now();
  let endTime = startTime + renderVars.autoPanTime;
  let midTime = startTime + renderVars.autoPanTime * 0.75;
  let startX = renderVars.posX;
  let startY = renderVars.posY;
  let midX = startX + (endX - startX) * 0.9;
  let midY = startY + (endY - startY) * 0.9;
  //console.log("starting pan. currentx: " + renderVars.posX + ", currentY: " + renderVars.posY + ", startX: " + startX + ", startY: " + startY)
  while (Date.now() < midTime) {
    renderVars.posX = lerp(startX, midX, (Date.now() - startTime) / renderVars.autoPanTime * 1.33);
    renderVars.posY = lerp(startY, midY, (Date.now() - startTime) / renderVars.autoPanTime * 1.33);
    //console.log((Date.now() - startTime) / renderVars.autoPanTime * 0.5)
    render(renderVars.posX, renderVars.posY);
    await promiseDelay(17);
  }
  //console.log("mid pan. currentx: " + renderVars.posX + ", currentY: " + renderVars.posY + ", midX: " + midX + ", midY: " + midY)
  renderVars.posX = midX;
  renderVars.posY = midY;
  while (Date.now() < endTime) {
    renderVars.posX = lerp(midX, endX, (Date.now() - midTime) / renderVars.autoPanTime * 4);
    renderVars.posY = lerp(midY, endY, (Date.now() - midTime) / renderVars.autoPanTime * 4);
    render(renderVars.posX, renderVars.posY);
    await promiseDelay(17);
  }
  //console.log("end pan. currentx: " + renderVars.posX + ", currentY: " + renderVars.posY + ", endX: " + endX + ", endY: " + endY)
  renderVars.posX = endX;
  renderVars.posY = endY;
  renderVars.isAutoPanning = false;
}

function panToTab(tab) {
  if (tabData[tab] === undefined) { console.warn("auto tab pan attempted with invalid parameter: " + tab); return; }
  panTo(-tabData[tab][0] + (window.innerWidth / 2),
    -tabData[tab][1] + (window.innerHeight / 2))
}

function panToNewUnlock() {
  let tabNames = Object.keys(tabData);
  for (i = 0; i < tabNames.length; i++) {
    let tab = tabNames[i];
    if (tabData[tab][2] === game.unlocks) {
      panToTab(tab);
      return;
    }
  }
}

//Does position checks every time the mouse moves (if it's held down)
document.onmousemove = handleMouseMove;
function handleMouseMove(event) {
  if (renderVars.isAutoPanning) return;
  event = event || window.event;
  renderVars.mousePosX = event.pageX
  renderVars.mousePosY = event.pageY
  if (renderVars.mouseIsDown) { //  && panResistantFields.indexOf(document.activeElement.id) === -1 && bigFinishPoint == 0
    //Zoom stuff!
    //renderVars.diffX = (event.pageX - renderVars.currentMousePos[0]) / renderVars.zoomMultiplier
    //renderVars.diffY = (event.pageY - renderVars.currentMousePos[1]) / renderVars.zoomMultiplier
    renderVars.diffX = event.pageX - renderVars.currentMousePos[0]
    renderVars.diffY = event.pageY - renderVars.currentMousePos[1]
    if (Date.now() - renderVars.lastRender >= 20 && Math.abs(renderVars.diffX) + Math.abs(renderVars.diffY) > 8) {
      render(renderVars.posX + renderVars.diffX, renderVars.posY + renderVars.diffY)
    }
  }
}

function processKeyDown(event) {
  if (event.repeat || renderVars.isAutoPanning) return; //holding a key down causes repeated keydown events. make sure we don't respond to duplicates.
  inputVars.keysHeld[event.key] = true;
  updatePanKeys();
}

function processKeyUp(event) {
  inputVars.keysHeld[event.key] = false;
  updatePanKeys();
}

function arrowClick(dir) {
  inputVars.keysHeld[dir] = true;
  updatePanKeys();
  clearTouch();
}

function arrowRelease(dir) {
  inputVars.keysHeld[dir] = false;
  updatePanKeys();
}


//Update the input values. Only needs to fire when keys are pressed or released.
function updatePanKeys() {
  //if (document.querySelector('#dragonNameBox') != document.activeElement) {
  /*if (inputVars.isMobile) {
    inputVars.keyInputX = inputVars.keysHeld["a"] + inputVars.keysHeld["ArrowLeft"] - inputVars.keysHeld["d"] - inputVars.keysHeld["ArrowRight"]
    inputVars.keyInputY = inputVars.keysHeld["w"] + inputVars.keysHeld["ArrowUp"] - inputVars.keysHeld["s"] - inputVars.keysHeld["ArrowDown"]
  } else {*/
  inputVars.keyInputX = inputVars.keysHeld["a"] + inputVars.keysHeld["ArrowLeft"] - inputVars.keysHeld["d"] - inputVars.keysHeld["ArrowRight"]
  inputVars.keyInputY = inputVars.keysHeld["w"] + inputVars.keysHeld["ArrowUp"] - inputVars.keysHeld["s"] - inputVars.keysHeld["ArrowDown"]
  //}
  //}
}

//process the speed for smooth panning when using keyboard
function updatePanKeySpeed() {
  let effectiveDecel = inputVars.keySpeedDecel / inputVars.keyboardRenderPerSec;
  if (Math.sign(inputVars.keySpeedX) * Math.sign(inputVars.keyInputX) === -1) inputVars.keySpeedX = 0; // skip decel if opposite direction is pressed
  if (Math.sign(inputVars.keySpeedY) * Math.sign(inputVars.keyInputY) === -1) inputVars.keySpeedY = 0;
  if (inputVars.keyInputX === 0) {
    inputVars.keySpeedX -= Math.sign(inputVars.keySpeedX) * effectiveDecel;
    if (Math.abs(inputVars.keySpeedX) <= effectiveDecel) inputVars.keySpeedX = 0;
  } else {
    inputVars.keySpeedX = Math.sign(inputVars.keyInputX) * inputVars.keySpeedCap; // no accel, goes straight to max speed
  }
  if (inputVars.keyInputY === 0) {
    inputVars.keySpeedY -= Math.sign(inputVars.keySpeedY) * effectiveDecel;
    if (Math.abs(inputVars.keySpeedY) <= effectiveDecel) inputVars.keySpeedY = 0;
  } else {
    inputVars.keySpeedY = Math.sign(inputVars.keyInputY) * inputVars.keySpeedCap;
  }
  inputVars.keySpeedX = Math.round(inputVars.keySpeedX * inputVars.keyboardRenderPerSec) / inputVars.keyboardRenderPerSec; // avoiding precision errors (hopefully)
  inputVars.keySpeedX = Math.min(inputVars.keySpeedCap, Math.max(-inputVars.keySpeedCap, inputVars.keySpeedX)); // clamp between the speed caps
  inputVars.keySpeedY = Math.round(inputVars.keySpeedY * inputVars.keyboardRenderPerSec) / inputVars.keyboardRenderPerSec;
  inputVars.keySpeedY = Math.min(inputVars.keySpeedCap, Math.max(-inputVars.keySpeedCap, inputVars.keySpeedY));
}

//reset all held keys. 
function resetPressedKeys() {
  for (let key in inputVars.keysHeld) {
    inputVars.keysHeld[key] = false;
  }
  updatePanKeys();
}

function touchDown(event) {
  if (renderVars.isAutoPanning || !event.changedTouches || !event.changedTouches[0]) return //make sure the event data is proper
  if (inputVars.touchIsDown) clearTouch(); //if there's already an active touch, clear it
  let thisTouch = event.changedTouches[0]; //if multiple new touches registered on same event, arbitrarily choose first one in the list
  let shouldBreak = false;
  Object.keys(inputVars.keysHeld).forEach((k) => {
    if (inputVars.keysHeld[k] == true) shouldBreak = true;
  })
  if (shouldBreak) return;
  inputVars.lastTouch = thisTouch.identifier;
  inputVars.touchIsDown = true;
  inputVars.currentTouchPos[0] = [thisTouch.pageX];
  inputVars.currentTouchPos[1] = [thisTouch.pageY];
}

function touchMove(event) {
  if (renderVars.isAutoPanning) return;
  //need to iterate through and make sure one of the moved touches is the active touch
  for (let i = 0; i < event.changedTouches.length; i++) {
    if (event.changedTouches[i].identifier === inputVars.lastTouch) {
      let thisTouch = event.changedTouches[i];
      renderVars.touchPosX = thisTouch.pageX
      renderVars.touchPosY = thisTouch.pageY
      if (inputVars.touchIsDown && bigFinishPoint == 0) {
        renderVars.diffX = thisTouch.pageX - inputVars.currentTouchPos[0]
        renderVars.diffY = thisTouch.pageY - inputVars.currentTouchPos[1]
        //if (Math.abs(renderVars.diffX) + Math.abs(renderVars.diffY) > 8) {
        if (Date.now() - renderVars.lastRender >= 8 && Math.abs(renderVars.diffX) + Math.abs(renderVars.diffY) > 8) {
          render(renderVars.posX + renderVars.diffX, renderVars.posY + renderVars.diffY)
        }
      }
    }
  }
}

function touchUp(event) {
  for (let i = 0; i < event.changedTouches.length; i++) {
    if (event.changedTouches[i].identifier === inputVars.lastTouch) {
      clearTouch();
    }
  }
  resetPressedKeys();
}

function clearTouch() {
  inputVars.touchIsDown = false;
  inputVars.lastTouch = null;
  renderVars.posX = renderVars.posX + renderVars.diffX
  renderVars.posY = renderVars.posY + renderVars.diffY
  renderVars.diffX = 0
  renderVars.diffY = 0
}
/*
function mobileDebug(inputString) {
  document.getElementById("devinfo").innerHTML = inputString;
}*/

/*
document.body.addEventListener('mouseover', (e) => {
  //had to move this code to mouseenter because cursed firefox sometimes shows buttons == 0 even when it doesn't :(
  //if (e.target === document.body && e.buttons % 2 === 0) mouseUp();

  //check for hovering over achievements
  let selectedAchieve = getHoveredAchievement();
  if (selectedAchieve === null) {
    showAchievementInfo(null, null);
  } else {
    var identifiers = selectedAchieve.slice(3).split("x"); //takes an achievement id and returns an array - e.g. "ach1x3" will become [1,3]
    showAchievementInfo(parseInt(identifiers[0]), parseInt(identifiers[1]));
  }
})*/

document.body.addEventListener('mouseenter', (e) => {
  if (e.buttons % 2 === 0) mouseUp(); //this is to cover special case where user clicks to drag and releases click outside of frame
})

//general event listeners, mostly for panning controls
document.body.addEventListener('mousedown', (e) => { mouseDown(e) });
document.body.addEventListener('mouseup', (e) => { mouseUp(e) });

document.addEventListener('keydown', (event) => { processKeyDown(event) });
document.addEventListener('keyup', (event) => { processKeyUp(event) });
/*
arrowElements.up.addEventListener('pointerdown', (e) => { arrowClick('ArrowUp') });
arrowElements.up.addEventListener('pointerup', (e) => { arrowRelease('ArrowUp') });

arrowElements.down.addEventListener('pointerdown', (e) => { arrowClick('ArrowDown') });
arrowElements.down.addEventListener('pointerup', (e) => { arrowRelease('ArrowDown') });

arrowElements.left.addEventListener('pointerdown', (e) => { arrowClick('ArrowLeft') });
arrowElements.left.addEventListener('pointerup', (e) => { arrowRelease('ArrowLeft') });

arrowElements.right.addEventListener('pointerdown', (e) => { arrowClick('ArrowRight') });
arrowElements.right.addEventListener('pointerup', (e) => { arrowRelease('ArrowRight') });
*/
/*
if (inputVars.isMobile) { //event for mobile only
  document.addEventListener('pointerup', (e) => { resetPressedKeys(); }); //on mobile always reset all when any arrow is released, just to proof against weird edge cases
  document.addEventListener('touchstart', (e) => { touchDown(e); });
  document.addEventListener('touchmove', (e) => { touchMove(e); });
  document.addEventListener('touchend', (e) => { touchUp(e); });
}*/
