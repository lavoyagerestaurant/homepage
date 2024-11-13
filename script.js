let _playCarousel = false;
let _carouselIndex = 0;

stopGifTimeout = () => {
  setTimeout(() => {
    document.querySelector("#animated-logo").classList.toggle("hidden");
    document.querySelector("#static-logo").classList.toggle("hidden");
  }, 5000);

  setupFixedCardHandler();
};

setupFixedCardHandler = () => {
  let trademarkElement = document.querySelector(".trademark-card");
  let fixedCard = document.querySelector(".fixed-card");

  let ticking = false;

  changeCardsTransparency = () => {
    trademarkYPos = trademarkElement.getBoundingClientRect().y;
    if (trademarkYPos <= window.innerHeight * -1) {
      fixedCard.classList.add("transparent");
      document.querySelectorAll("div.content").forEach((element) => {
        element.classList.add("visible");
      });
    } else {
      fixedCard.classList.remove("transparent");
      document.querySelectorAll("div.content").forEach((element) => {
        element.classList.remove("visible");
      });
    }

    if (trademarkYPos <= window.innerHeight * -4) {
      fixedCard.classList.add("out");
      _playCarousel = true;
    } else {
      fixedCard.classList.remove("out");
      _playCarousel = false;
    }
  };

  document.body.addEventListener("scroll", (event) => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        changeCardsTransparency(event);
        ticking = false;
      });

      ticking = true;
    }
  });
};

sendReservation = () => {
  let reservationForm = document.querySelector(".reservation-form");

  let valid = true;
  reservationForm.querySelectorAll("input").forEach((input) => {
    if (input.type != "button" && input.value.length == 0) {
      valid = false;
    }
  });

  if (valid) {
    let successMessage = document.querySelector("#success-message");
    reservationForm.classList.toggle("out");
    setTimeout(() => {
      reservationForm.classList.toggle("hidden");
      successMessage.classList.toggle("hidden");
      successMessage.classList.toggle("in");
    }, 300);
  }
};

openGitHubDev = () => {
  window.open("https://github.com/joaov-t", "_blank");
};

openGitHub = () => {
  window.open("https://github.com/lavoyagerestaurant/homepage/", "_blank");
};

setInterval(() => {
  let carouselImgs = document.querySelectorAll(".items-carousel img");
  if (_playCarousel) {
    _carouselIndex =
      _carouselIndex == carouselImgs.length - 1 ? 0 : _carouselIndex + 1;
    carouselImgs[_carouselIndex].scrollIntoView({ inline: "center" });
  }
}, 3000);
