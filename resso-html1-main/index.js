// Obtém referências aos elementos relevantes
const openModalButton = document.getElementById("open-modal-button");
const modal = document.getElementById("modal");
const closeModal = modal.querySelector(".close");
const postForm = document.getElementById("post-form");
const photoInput = document.getElementById("photo-input");
const titleInput = document.getElementById("title-input");
const captionInput = document.getElementById("caption-input");
const postInfoDiv = document.getElementById("post-info");
const localStorage = window.localStorage;

document.addEventListener("DOMContentLoaded", () => {
  console.log(localStorage.getItem("posts"));
  const posts = JSON.parse(localStorage.getItem("posts") || "[]");

  const postSection = document.querySelector(".post-section");

  posts.forEach((item) => {
    const postContainer = document.createElement("div");
    const imageElement = document.createElement("img");
    const postInfo = document.createElement("div");
    const titleElement = document.createElement("h3");
    const captionElement = document.createElement("p");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    imageElement.src = item.photoURL;
    imageElement.alt = item.title;
    titleElement.textContent = item.title;
    captionElement.textContent = item.caption;
    editButton.textContent = "Editar";
    deleteButton.textContent = "Excluir";

    postContainer.classList.add("post-info");
    postInfo.classList.add("post-info-content");
    postInfo.classList.add("post-info-buttons");

    postInfo.appendChild(editButton);
    postInfo.appendChild(deleteButton);

    postContainer.appendChild(imageElement);
    postContainer.appendChild(titleElement);
    postContainer.appendChild(captionElement);
    postContainer.appendChild(postInfo);

    postInfoDiv.appendChild(postContainer);

    editButton.addEventListener("click", function () {
      // Entra no modo de edição
      currentPost = postContainer;
      currentPost.classList.add("edit-mode");
      isEditMode = true;

      const postTitle = currentPost.querySelector("h3").textContent;
      const postCaption = currentPost.querySelector("p").textContent;

      titleInput.value = postTitle;
      captionInput.value = postCaption;
      modal.style.display = "block";
    });

    deleteButton.addEventListener("click", function () {
      // Remove a postagem
      postContainer.remove();
    });
  });
});

// localStorage.clear();
// localStorage.setItem('posts', "");

let isEditMode = false;
let currentPost;

// Função para abrir o modal
openModalButton.addEventListener("click", function () {
  modal.style.display = "block";
  isEditMode = false;
  currentPost = null;
});

// Função para fechar o modal
closeModal.addEventListener("click", function () {
  modal.style.display = "none";
});

// Função para lidar com o envio do formulário
postForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const photoURL = URL.createObjectURL(photoInput.files[0]);
  const title = titleInput.value;
  const caption = captionInput.value;

  // Limpa os campos do formulário
  photoInput.value = "";
  titleInput.value = "";
  captionInput.value = "";

  if (isEditMode && currentPost) {
    // Modo de edição
    const imageElement = currentPost.querySelector("img");
    const titleElement = currentPost.querySelector("h3");
    const captionElement = currentPost.querySelector("p");

    imageElement.src = photoURL;
    imageElement.alt = title;
    titleElement.textContent = title;
    captionElement.textContent = caption;

    currentPost.classList.remove("edit-mode");
    isEditMode = false;
    currentPost = null;
  } else {
    // Modo de adição

    const localStorageLength =
      localStorage.getItem("posts") === null
        ? 1
        : localStorage.getItem("posts").length;
    const postId = localStorageLength * 1024 + Math.random(200);

    const newPost = {
      postId: postId,
      title: title,
      caption: caption,
      photoURL: photoURL,
    };

    if (localStorage.getItem("posts") !== null) {
      const currentStorage = JSON.parse(localStorage.getItem("posts"));
      currentStorage.push(newPost);
      localStorage.setItem("posts", JSON.stringify(currentStorage));
    } else {
      const newArr = new Array(newPost);
      localStorage.setItem("posts", JSON.stringify(newArr));
    }

    const postContainer = document.createElement("div");
    const imageElement = document.createElement("img");
    const postInfo = document.createElement("div");
    const titleElement = document.createElement("h3");
    const captionElement = document.createElement("p");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    imageElement.src = photoURL;
    imageElement.alt = title;
    titleElement.textContent = title;
    captionElement.textContent = caption;
    editButton.textContent = "Editar";
    deleteButton.textContent = "Excluir";

    postContainer.classList.add("post-info");
    postInfo.classList.add("post-info-content");
    postInfo.classList.add("post-info-buttons");

    postInfo.appendChild(editButton);
    postInfo.appendChild(deleteButton);

    postContainer.appendChild(imageElement);
    postContainer.appendChild(titleElement);
    postContainer.appendChild(captionElement);
    postContainer.appendChild(postInfo);

    postInfoDiv.appendChild(postContainer);

    editButton.addEventListener("click", function () {
      // Entra no modo de edição
      currentPost = postContainer;
      currentPost.classList.add("edit-mode");
      isEditMode = true;

      const postTitle = currentPost.querySelector("h3").textContent;
      const postCaption = currentPost.querySelector("p").textContent;

      titleInput.value = postTitle;
      captionInput.value = postCaption;
      modal.style.display = "block";
    });

    deleteButton.addEventListener("click", function () {
      // Remove a postagem
      postContainer.remove();
    });
  }

  modal.style.display = "none";
});
