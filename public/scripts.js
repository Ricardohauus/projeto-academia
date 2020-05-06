const modalOverlay = document.querySelector(".modal-overlay");
const cards = document.querySelectorAll(".card");
const closeModal = document.querySelector(".close-modal");
const modalContent = modalOverlay.querySelector(".modal-content");
const cardContent = modalOverlay.querySelector(".card__content");
const cardInfo = modalOverlay.querySelector(".card__info");

for (let card of cards) {
  card.addEventListener("click", function () {
    const cardId = card.getAttribute("id");
    modalOverlay.classList.add('active');
    modalContent.querySelector("img").src = card.querySelector("img").getAttribute("src");
    modalContent.querySelector("img").alt = card.querySelector("img").getAttribute("alt");
    cardContent.querySelector("p").innerText = card.getElementsByClassName("card__content")[0].querySelector("p").textContent
    cardInfo.getElementsByClassName("main__tecnology")[0].innerText = card.getElementsByClassName("main__tecnology")[0].textContent;
    cardInfo.getElementsByClassName("main__quest")[0].innerText = card.getElementsByClassName("main__quest")[0].textContent;
  })
  console.log(modalOverlay.querySelector(".card__info"));

}

closeModal.addEventListener("click", function () {
  modalOverlay.classList.remove('active')
  modalOverlay.querySelector("img").src = "";
})



