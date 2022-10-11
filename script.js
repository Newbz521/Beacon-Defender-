let gameScreen = document.body;
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    // console.log('left');
    moveLeft();
    // createBullet()
  }
  if (event.key === "ArrowRight") {
    // console.log('right');
    moveRight();
    // createBullet()
  }
  if (event.key === "ArrowUp") {
    // console.log("space")
    moveUp();
  }
  if (event.key === "ArrowDown") {
    // console.log("space")
    moveDown();
  }
  if (event.key === " ") {
    // console.log("space")
    attack();
  }
});


function createMap() {
  let map = document.createElement("div");
  map.classList.add("mapContainer");
  map.style.display = "grid";
  map.style.height = "80vh";
  map.style.width = "80vh";
  // map.style.transform = "rotateZ(45deg)";
  gameScreen.append(map);

  function generatePlatform(num) {
    let platform = document.createElement("div");
    platform.classList.add("platform");
    platform.innerText = num;

    map.append(platform);
  }
  for (let i = 0; i < 36; i++) {
    generatePlatform(i);
  }
}
createMap();
let mapSelect = document.querySelector(".mapContainer")

function createPlayer(start) {
  let player = document.createElement("div");
  player.setAttribute("id", "player");
  player.style.height = 5 + "vh";
  player.style.width = 5 + "vh";
  player.style.position = "absolute";
  player.style.background = "red";
  // player.style.left = start.getBoundingClientRect().left;
  // player.style.top = start.getBoundingClientRect().top;
  // player.innerText = start.innerText;
  mapSelect.appendChild(player);
  // let sword = document.createElement("div");
  // sword.classList.add("sword")
  // sword.setAttribute("id", "sword");
  // sword.style.height = start.getBoundingClientRect().width * 2.1 + "px";
  // player.appendChild(sword);
}

function placePlayer() {
  createPlayer();
  let player = document.querySelector("#player")
  let randomIndex = Math.floor(
    Math.random() * document.querySelectorAll(".platform").length
  );

  let startPosition = document.querySelectorAll(".platform")[randomIndex].getBoundingClientRect();
  player.style.left = startPosition.left + "px";
  player.style.right = startPosition.top + "px";
}

placePlayer();

function moveLeft() {
  let currentPosition = document.querySelector("#player");
  let platforms = document.querySelectorAll(".platform");
  for (let i = 0; i < platforms.length; i++) {
    if (platforms[i] === currentPosition.parentElement && i > 0) {
      platforms[i].removeChild(currentPosition);
      createPlayer();
    }
  }
}

function moveRight() {
  let platforms = document.querySelectorAll(".platform");
  let currentPosition = document.querySelector("#player");
  for (let i = 0; i < platforms.length; i++) {
    if (platforms[i] === currentPosition.parentElement && (i < platforms.length - 1)) {
      platforms[i].removeChild(currentPosition);
      createPlayer();
    }
  }
}

function moveUp() {
  let platforms = document.querySelectorAll(".platform");
  let currentPosition = document.querySelector("#player");
  for (let i = 0; i < platforms.length; i++) {
    if (platforms[i] === currentPosition.parentElement && (i > 6)) {
      platforms[i].removeChild(currentPosition);
      createPlayer();
    }
  }
}

function moveDown() {
  let platforms = document.querySelectorAll(".platform");
  let currentPosition = document.querySelector("#player");
  for (let i = 0; i < platforms.length; i++) {
    if (platforms[i] === currentPosition.parentElement && (i < 30)) {
      platforms[i].removeChild(currentPosition);
      createPlayer();
    }
  }
}

function attack() {
  let sword = document.querySelector(".sword");
  sword.classList.add("attack")
  function removeAttack() {
    sword.classList.remove("attack")
  }
  setTimeout(removeAttack, 700)
}
