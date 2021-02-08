let starsRows = document.getElementsByClassName("starsRows");
let stars;
let starToTurnWhite;
let starToTurnGold;
let clickedStarIndex;
let row;
let percent = 0.005;
let points = 0;
let totalPoints = 0;
let priceInput = document.getElementById("priceInput");
let tipButton = document.getElementById("tipButton");
let lastGoldStarIndex;
let lastGoldStar;
let starToCheck;
let price = 0;
let totalTip = 0;

function populateStarsDivs() {
  for (i = 0; i < starsRows.length; i++) {
    for (j = 0; j < 5; j++) {
      starsRows[i].innerHTML += `<i id = "star${i}.${j}" class="stars far fa-star"></i>`;
    }
  }
  chooseStarsToTurnGold();
}

function chooseStarsToTurnGold() {
  stars = document.querySelectorAll(".stars");
  for (i = 0; i < stars.length; i++) {
    stars[i].addEventListener("click", function () {
      clickedStarIndex = this.id[this.id.length - 1];
      row = this.id[this.id.length - 3];
      if (!this.classList.contains("gold")) { // if star is not gold:       
        if (clickedStarIndex > 0) {
          for (i = 0; i <= clickedStarIndex; i++) { // turn star and all prev stars gold:
            starToTurnGold = document.getElementById(`star${row}.${i}`);
            turnStarsGold(starToTurnGold);
          }
        } else { // only turn first star gold:
          turnStarsGold(this);
        }
      } else { // if star is already gold;
        chooseStarsToTurnWhite();
      }
    });
  }
}

function findLastGoldStarInRow(row) {
  lastGoldStarIndex = 0;
  // go through all the stars in this row and check if they are gold...
  for (i = 0; i < 5; i++) {
    starToCheck = document.getElementById(`star${row}.${i}`);
    if (!starToCheck.classList.contains("gold")) { // if starToCheck is not gold:    
      lastGoldStarIndex = i - 1;
      break;
    } else {
      if (i == 4) {
        lastGoldStarIndex = i;
      }
    }
  }
}

function chooseStarsToTurnWhite() {
  findLastGoldStarInRow(row);
  if (clickedStarIndex == lastGoldStarIndex) {
    lastGoldStar = document.getElementById(`star${row}.${lastGoldStarIndex}`); // only turn lastGoldStar white.
    turnStarsWhite(lastGoldStar);
  } else if (clickedStarIndex < lastGoldStarIndex) { 
    // turn all those AFTER clickedStarIndex white, including lastGoldStar.
    for (i = 0; i <= lastGoldStarIndex; i++) {
      if (i > clickedStarIndex) {
        starToTurnWhite = document.getElementById(`star${row}.${i}`);
        turnStarsWhite(starToTurnWhite);
      }
    }
  }
}

function turnStarsGold(stars) {
  stars.classList.remove("far");
  stars.classList.add("fas");
  stars.classList.add("gold");
}

function turnStarsWhite(stars) {
  stars.classList.remove("gold");
  stars.classList.remove("fas");
  stars.classList.add("far");
}

tipButton.onclick = function () {
  price = priceInput.value;
  calculateTip();
};

function calculateTip() {
  totalPoints = 0;
  for (j = 0; j < starsRows.length; j++) {
    findLastGoldStarInRow(j);
    points = lastGoldStarIndex + 1;
    totalPoints += points;
  }
  totalTip = price * (totalPoints * percent);
  document.getElementById("resultSpan").innerHTML = totalTip;
}

populateStarsDivs();
