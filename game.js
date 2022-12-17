const spieler = document.querySelector(".player");
const spielfeld = document.querySelector(".playground");
spieler.style.top = "100px";
spieler.style.left = "50px";
const timerObjektErstellen = new Timer(120);
const timerObjektBewegen = new Timer(1);
const punkteAnzeige = document.querySelector(".punkte");
let score = 0;

function steuerung() {
  if (keyboard(38)) {
    spieler.style.top = parseInt(spieler.style.top) - 5 + "px";
  }
  if (keyboard(40)) {
    spieler.style.top = parseInt(spieler.style.top) + 5 + "px";
  }
}

// function anleitung() {
//   alert(
//     "Bewege mit den Pfeiltasten deinen Dino. Sammle das Fleisch ein um Punkte zu gewinnen. Gib acht auf die Meteoriten und das Lava sonst ist Game Over! "
//   );
// }

// function hindernisErstellen() {
//   if (timerObjektErstellen.ready()) {
//   }
// }

function futterErstellen() {
  if (timerObjektErstellen.ready()) {
    let zuefallFutter = Math.random() * 800;
    let foods = document.createElement("div");
    foods.classList.add("food");
    foods.style.right = "0px";
    foods.style.top = zuefallFutter + "px";
    spielfeld.appendChild(foods);
    let zuefallEnemies = Math.random() * 800;
    let enemies = document.createElement("div");
    enemies.classList.add("enemy1");
    enemies.style.right = "0px";
    enemies.style.top = zuefallEnemies + "px";
    spielfeld.appendChild(enemies);
    // let zuefallEnemies2 = Math.random() * 800;
    // let enemies2 = document.createElement("div");
    // enemies2.classList.add("enemy2");
    // enemies2.style.right = "0px";
    // enemies2.style.top = zuefallEnemies2 + "px";
    // spielfeld.appendChild(enemies2);
  }
}

function hindernisBewegen() {
  if (timerObjektBewegen.ready()) {
    let hindernisse = document.querySelectorAll(".enemy1");
    for (const hindernis of hindernisse) {
      hindernis.style.right = parseInt(hindernis.style.right) + 10 + "px";
      if (parseInt(hindernis.style.right) > 1500) {
        hindernis.parentNode.removeChild(hindernis);
      }
    }
    // let hindernisse2 = document.querySelectorAll(".enemy2");
    // for (const hindernis2 of hindernisse2) {
    //   hindernis2.style.right = parseInt(hindernis2.style.right) + 10 + "px";
    //   if (parseInt(hindernis2.style.right) > 1500) {
    //     hindernis2.parentNode.removeChild(hindernis2);
    //   }
    // }
  }
}

function futterBewegen() {
  if (timerObjektBewegen.ready()) {
    let futter = document.querySelectorAll(".food");
    for (const futterEinzel of futter) {
      futterEinzel.style.right = parseInt(futterEinzel.style.right) + 10 + "px";
      if (parseInt(futterEinzel.style.right) > 1500) {
        futterEinzel.parentNode.removeChild(futterEinzel);
      }
    }
  }
}

function scoreHigher() {
  let futter = document.querySelectorAll(".food");
  let collisions = allCollisions(spieler, futter);
  for (var collision of collisions) {
    score = score + 1;
    punkteAnzeige.textContent = score;
    collision.parentNode.removeChild(collision);
  }
}

function kollision() {
  const hindernisse = document.querySelectorAll(".enemy1");
  const hindernisse2 = document.querySelectorAll(".enemy2");
  if (anyCollision(spieler, hindernisse)) {
    // if (anyCollision(spieler, hindernisse || spieler, hindernisse2)) {
    alert("Game over! Start again?");
    window.location.reload();
    return true;
  }
}
// function kollision2() {
//   const hindernisse2 = document.querySelectorAll(".enemy2");
//   if (anyCollision(spieler, hindernisse2)) {
//     //alert("Game over! Start again?");
//     window.location.reload();
//     return;
//   }
// }

function loop() {
  steuerung();
  // anleitung();
  // hindernisErstellen();
  futterErstellen();
  hindernisBewegen();
  futterBewegen();
  scoreHigher();
  if (kollision()) {
    return;
  }
  // kollision2();

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
