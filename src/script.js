// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

getData();

const tpl = document.querySelector("#tpl-hero");
const target = document.querySelector("#target");

async function getData(){
    try {
        const hero = await fetch("https://character-database.becode.xyz/characters");
        const object = await hero.json();

        heroes.forEach(({description, id, image, name, shortDescription}) => {
            const elt = tpl.cloneNode(true).content;

            elt.querySelector(".name").innerText = name;
            elt.querySelector(".descri").innerText = shortDescription;
            elt.querySelector(".img").setAttribute("src", `data:image/gif;base64,${element.image}`);

            target.appendChild(elt);
        });
        console.log(object);
    } catch(err){
        console.error(err);
    }
}

// const resp = await fetch ("https://character-database.becode.xyz/characters", {
//     method : "POST",
//     headers : {
//         "Content-Type" : "application/json",
//     },
//     body : JSON.stringify({
//         name,
//         shortDescription,
//         description,
//         image,
//     })
// })