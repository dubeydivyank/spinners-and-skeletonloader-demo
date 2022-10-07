function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

const showSpinner = (e) => {
  const loaderContainer = document.querySelector(".loader-container");
  const loader = document.querySelector(`.${e.target.id}`);
  const content = document.querySelector(`#content`);
  loader.style.display = "inline-block";
  loaderContainer.style.display = "flex";
  content.style.display = "none";
  setTimeout(() => {
    loaderContainer.style.display = "none";
    loader.style.display = "none";
    content.style.display = "block";
  }, 3000);
};

let spinners = document.querySelectorAll(".spinner-button");
spinners.forEach((spinner) => {
  spinner.addEventListener("click", showSpinner);
});

/********************************************
 *************SKELETON LOADER****************
 ********************************************/
const openSkeletonLoader = () => {
  const grid = document.querySelector(".grid");
  const cardTemplate = document.getElementById("card-template");
  for (let i = 0; i < 10; i++) {
    grid.append(cardTemplate.content.cloneNode(true));
  }
  setTimeout(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((posts) => {
        grid.innerHTML = "";
        posts.forEach((post) => {
          const div = cardTemplate.content.cloneNode(true);
          div.querySelector("[data-title]").textContent = post.title;
          div.querySelector("[data-body]").textContent = post.body;
          grid.append(div);
        });
      });
  }, 3000);
};

document
  .getElementById("skeleton-tab")
  .addEventListener("click", openSkeletonLoader);

document.getElementById("spinner-tab").addEventListener("click", () => {
  const grid = document.querySelector(".grid");
  grid.innerHTML = "";
});
