const currentPage = location.pathname;
const menuItems = document.querySelectorAll("header .links a")

for (menuItem of menuItems) {
  if (currentPage == menuItem.getAttribute("href")) {
    menuItem.classList.add("active")
    break;
  }
}





