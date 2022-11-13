// -- Access the elements from the index.html --
let form = document.getElementById("form");
let input = document.getElementById("input");
let msg = document.getElementById("msg");
let posts = document.getElementById("posts");

// -- Event listener that will trigger when the button is clicked --
form.addEventListener("submit", (e) => {
    // stops the page from refreshing on itself
    e.preventDefault();
    console.log("button clicked");
    formValidation();
});

// function to validate the form textarea
let formValidation = () => {
    if (input.value === "") {
        // -- Failure State --
        msg.innerHTML = "Post cannot be blank";
        console.log("failure");
    } else {
        // -- Success State --
        msg.innerHTML = "";
        console.log("success");
        // this needs to be invoked on the success state otherwise it will always be called regardless of state in eventlistener
        acceptData();
    }
};

// -- Empty object that will receive the data from the acceptData function --
let data = {};

// -- Collect the data from the textarea --
let acceptData = () => {
    // text validation to make sure it is working
    data["text"] = input.value;
    console.log(data);
    // invoke the function here for when the data is received and pushed
    createPost();
};

let createPost = () => {
    // using the += will add this data along with the already posted data, without it will remove previous data
    // adding the below HTML code, means we use it as a template and how we structure new posts that are added.
    posts.innerHTML += 
    `
    <div>
        <p>${data.text}</p>
        <span class="options">
            <i onClick="editPost(this)" class="fas fa-edit"></i>
            <i onClick="deletePost(this)" class="fas fa-trash-alt"></i>
        </span>
    </div>
    `;
    // this will make the textarea on the form blank, allowing the user to write a new post without needing to remove old text
    input.value = "";
};

let deletePost = (e) => {
    // e.remove() - this will only remove the icon fa-trash-alt
    // e.parentElement.remove() - this will remove the span which holds both icons
    // BELOW - this will remove the div that holds this post
    e.parentElement.parentElement.remove();
};

let editPost = (e) => {
    // this will pull the text in the post and add it to the textarea when we click on the edit icon
    input.value = e.parentElement.previousElementSibling.innerHTML;
    // using this will remove the post when we click on the edit icon
    e.parentElement.parentElement.remove();
};