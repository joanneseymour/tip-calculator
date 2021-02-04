let starsDivs = document.getElementsByClassName("starsDivs");
let stars;
let starToTurnWhite;
let starToTurnGold;
let clickedStarIndex;
let clickedStarRow;

function populateStarsDivs() {
  for (i = 0; i < starsDivs.length; i++) {
    for (j = 0; j < 5; j++) {
      starsDivs[i].innerHTML += `<i id = "star${i}.${j}" class="stars far fa-star"></i>`;
    }
  }
  chooseStarsToTurnGold();
}

function chooseStarsToTurnGold() {
  stars = document.querySelectorAll(".stars");
  for (i = 0; i < stars.length; i++) {
    stars[i].addEventListener("click", function () {
      clickedStarIndex = this.id[this.id.length - 1];
      clickedStarRow = this.id[this.id.length - 3];
      if (!this.classList.contains("gold")) {
        // if star is not gold
        if (clickedStarIndex > 0) {
          for (i = 0; i <= clickedStarIndex; i++) {
            // turn star and all prev stars gold
            starToTurnGold = document.getElementById(
              `star${clickedStarRow}.${i}`
            );
            turnStarsGold(starToTurnGold);
          }
        } else {
          // only turn first star gold
          turnStarsGold(this);
        }
      } else {
        // if star is already gold;
        chooseStarsToTurnWhite();
      }
    });
  }
}

function chooseStarsToTurnWhite() {
  let lastGoldStarIndex;
  let lastGoldStar;
  let starToCheck;
  // go through all the stars in this row and check if they are gold.
  for (i = 0; i < 5; i++) {
    starToCheck = document.getElementById(`star${clickedStarRow}.${i}`);
    if (!starToCheck.classList.contains("gold")) {
      // if starToCheck is not gold
      lastGoldStarIndex = i - 1;
      break;
    } else {
      if (i == 4) {
        lastGoldStarIndex = i;
      }
    }
  }

  if (clickedStarIndex == lastGoldStarIndex) {
    // only turn lastGoldStar white.
    lastGoldStar = document.getElementById(
      `star${clickedStarRow}.${lastGoldStarIndex}`
    );
    turnStarsWhite(lastGoldStar);
  } else if (clickedStarIndex < lastGoldStarIndex) {
    // turn all those AFTER clickedStarIndex white, including lastGoldStar.
    for (i = 0; i <= lastGoldStarIndex; i++) {
      if (i > clickedStarIndex) {
        starToTurnWhite = document.getElementById(`star${clickedStarRow}.${i}`);
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

populateStarsDivs();
