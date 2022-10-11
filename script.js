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

function trashTalk() {
  let trashTalk = document.createElement("div")
  trashTalk.classList.add("trashTalk")
  trashTalk.style.width = 35 + "vh";
  trashTalk.style.height = 20 + "vh";
  trashTalk.style.position = "absolute";
  trashTalk.style.border = "1px solid white";
  trashTalk.style.left = 0;
  trashTalk.style.top = 0;
  trashTalk.style.margin = 25 + "px";
  trashTalk.style.display = "flex";
  trashTalk.style.justifyContent = "center";
  trashTalk.style.alignItems = "center";
  trashTalk.style.color = "white";
  trashTalk.style.fontSize = 25 + "px";
  trashTalk.style.borderRadius = 10 + "px";
  trashTalk.style.textAlign = "center";
  gameScreen.appendChild(trashTalk)
}
trashTalk()

let talk = "Can you pop my bubbles?"
function setTrash() {
  let trashBoard = document.querySelector(".trashTalk")
  trashBoard.innerText = talk;
}
setTrash()
function scoreBoard() {
  let scoreBoard = document.createElement("div")
  scoreBoard.classList.add("scoreBoard")
  scoreBoard.style.width = 35 + "vh";
  scoreBoard.style.height = 20 + "vh";
  scoreBoard.style.position = "absolute";
  scoreBoard.style.border = "1px solid white";
  scoreBoard.style.right = 0;
  scoreBoard.style.top = 0;
  scoreBoard.style.margin = 25 + "px";
  scoreBoard.style.display = "flex";
  scoreBoard.style.justifyContent = "center";
  scoreBoard.style.alignItems = "center";
  scoreBoard.style.color = "white";
  scoreBoard.style.fontSize = 50 + "px";
  scoreBoard.style.borderRadius = 10 + "px";
  gameScreen.appendChild(scoreBoard)
}
scoreBoard()


let currentScore = 0;
function setScore() {
  let scoreBoard = document.querySelector(".scoreBoard")
  scoreBoard.innerText = currentScore;
}
setScore()
function createMap() {
  let map = document.createElement("div");
  map.classList.add("mapContainer");
  map.style.display = "grid";
  map.style.height = "90vh";
  map.style.width = "90vh";
  // map.style.transform = "rotateZ(45deg)";
  gameScreen.append(map);

  function generatePlatform(num) {
    let platform = document.createElement("div");
    platform.classList.add("platform");
    let number = document.createElement("div")
    number.innerText = num;
    number.classList.add("nums")
    platform.appendChild(number);

    map.append(platform);
  }

  for (let i = 0; i < 36; i++) {
    generatePlatform(i);
  }
}
createMap();

function createPlayer(start) {
  let player = document.createElement("div");
  player.setAttribute("id", "player");
  player.style.height = 5 + "vh";
  player.style.width = 5 + "vh";
  player.style.position = "absolute";
  player.style.left = start.getBoundingClientRect().left;
  player.style.top = start.getBoundingClientRect().top;
  player.innerText = start.innerText;
  start.appendChild(player);
  let sword = document.createElement("div");
  sword.classList.add("sword");
  sword.setAttribute("id", "sword");
  sword.style.height = start.getBoundingClientRect().width * 2.1 + "px";
  player.appendChild(sword);
  let sword2 = document.createElement("div");
  sword2.classList.add("sword2");
  sword2.setAttribute("id", "sword2");
  sword2.style.width = start.getBoundingClientRect().width * 2.1 + "px";
  player.appendChild(sword2);
}
function placePlayer() {
  let randomIndex = Math.floor(
    Math.random() * document.querySelectorAll(".platform").length
  );
  let startPosition = document.querySelectorAll(".platform")[randomIndex];
  console.log(startPosition);
  createPlayer(startPosition);
}

placePlayer();

function moveLeft() {
  let currentPosition = document.querySelector("#player");
  let platforms = document.querySelectorAll(".platform");

  for (let i = 0; i < platforms.length; i++) {
    if (platforms[i] === currentPosition.parentElement && i % 6 !== 0) {
      // console.log(platforms[i].childNodes)
      platforms[i].removeChild(currentPosition);
      createPlayer(platforms[i - 1]);
      // platforms[i-1].appendChild(platforms[i].childNodes[1])
    }
  }
}

let noRights = [];

function moveRight() {
  let platforms = document.querySelectorAll(".platform");
  let currentPosition = document.querySelector("#player");
  for (let i = 0; i < platforms.length; i++) {
    if (
      platforms[i] === currentPosition.parentElement &&
      i < platforms.length - 1 &&
      i !== (Math.sqrt(platforms.length) - 1) &&
      i !== (Math.sqrt(platforms.length) * 2 - 1) &&
      i !== (Math.sqrt(platforms.length) * 3 - 1) &&
      i !== (Math.sqrt(platforms.length) * 4 - 1)&&
      i !== (Math.sqrt(platforms.length) * 5 - 1)&&
      i !== (Math.sqrt(platforms.length) * 6 - 1)
    ) {
      platforms[i].removeChild(currentPosition);
      createPlayer(platforms[i + 1]);
    }
  }
}

function moveUp() {
  let platforms = document.querySelectorAll(".platform");
  let currentPosition = document.querySelector("#player");
  for (let i = 0; i < platforms.length; i++) {
    if (platforms[i] === currentPosition.parentElement && i >= (Math.sqrt(platforms.length))) {
      platforms[i].removeChild(currentPosition);
      createPlayer(platforms[i - 6]);
    }
  }
}

function moveDown() {
  let platforms = document.querySelectorAll(".platform");
  let currentPosition = document.querySelector("#player");
  for (let i = 0; i < platforms.length; i++) {
    if (platforms[i] === currentPosition.parentElement && i < (platforms.length - Math.sqrt(platforms.length))) {
      platforms[i].removeChild(currentPosition);
      createPlayer(platforms[i + 6]);
    }
  }
}

function attack() {
  let sword = document.querySelector(".sword");
  let sword2 = document.querySelector(".sword2");
  sword.classList.add("attack");
  sword2.classList.add("attack");
  function removeAttack() {
    sword.classList.remove("attack");
    sword2.classList.remove("attack");
  }
  setTimeout(removeAttack, 700);
  let player = document.querySelector("#player");
  let platforms = document.querySelectorAll(".platform");
  let removed = [];
  for (let i = 0; i < platforms.length; i++) {
    let bombs = document.querySelectorAll(".ball");
    if (platforms[i] == player.parentElement) {
      let topRow = i - (Math.sqrt(platforms.length));
      let bottomwRow = i + (Math.sqrt(platforms.length));
      let left = i - 1;
      let right = i + 1; 
      let topLeftCorner = i - (Math.sqrt(platforms.length) + 1);
      let topRightCorner = i - (Math.sqrt(platforms.length) - 1);
      let bottomLeftCorner = i + (Math.sqrt(platforms.length)  - 1);
      let bottomRightCorner = i + (Math.sqrt(platforms.length)  + 1);
      
      for (let j = 0; j < bombs.length; j++) {
        if ((bombs[j].parentElement == platforms[i]) || (bombs[j].parentElement == platforms[left]) || (bombs[j].parentElement == platforms[right]) || (bombs[j].parentElement == platforms[topRow]) || (bombs[j].parentElement == platforms[bottomwRow]) || (bombs[j].parentElement == platforms[topLeftCorner]) || (bombs[j].parentElement == platforms[topRightCorner] || (bombs[j].parentElement == platforms[bottomLeftCorner])) || (bombs[j].parentElement == platforms[bottomRightCorner])) {
          removed.push(bombs[j])
          bombs[j].remove()
        }
      }
    }
  }
    if (removed.length == 1) {
    console.log("only one bubble?");
      currentScore += 1
      talk = "Just one bubble?!?"
      setTrash();
      setScore()
      removed = [];
  }
    else if (removed.length == 2) {
    // console.log("1POINT!!")
    console.log("popped two bubble!")
      currentScore += 5
      talk = "Two bubbles is alright.."
      setTrash();
      setScore()
      removed = [];
  } else if (removed.length == 3) {
    console.log("THREE BUBBLE COMBO +3POINTS!")
      currentScore += 10
      talk = "Fine, i under-estimated you"
      setTrash();
      setScore()
      removed = [];
  } else if (removed.length > 3) {
    console.log("BIG COMBO! + 5 points")
      currentScore += 100
      talk = "WOW, you are a champ after all"
      setTrash();
      setScore()
      removed = [];
  } 
}

function createBomb() {
  let randomIndex = Math.floor(
    Math.random() * document.querySelectorAll(".platform").length
  );
  let startPosition = document.querySelectorAll(".platform")[randomIndex];
  let bomb = document.createElement("div");
  bomb.classList.add("ball");
  bomb.classList.add("bubble")
  bomb.setAttribute("id", "bomb");
  startPosition.append(bomb);
  function removeBomb() {
    function shrink() {
      bomb.classList.add("shrink")
    }
    function remove() {
      bomb.remove()
    }
    setTimeout( shrink, 3000);
    setTimeout(remove,3800)
    }
  removeBomb()
}

setInterval(createBomb, 1000);
