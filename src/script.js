

const inputs = Array.from(document.querySelectorAll("input"));
console.log(inputs);

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

// Characters retriever 
getData();
const tpl = document.querySelector("#tpl-hero");
const target = document.querySelector("#target");

async function getData() {
    try {
        const hero = await fetch("https://character-database.becode.xyz/characters");
        const object = await hero.json();

        object.forEach(({ description, id, image, name, shortDescription }) => {
            const elt = tpl.cloneNode(true).content;

            elt.querySelector(".card-title").innerText = name;
            elt.querySelector(".card-text").innerText = shortDescription;
            elt.querySelector(".img-card").src = `data:image/*;base64,${image}`;

            target.appendChild(elt);
        });
        console.log(object);
    } catch (err) {
        console.error(err);
    }

    document.querySelector("#del").addEventListener("click", () => {
        const conf = confirm("Are you sure you want to delete this character ? ");
        if(conf){
            fetch("https://character-database.becode.xyz/characters", {
                method: "DELETE",
                headers: new Headers({
                    "Content-type": "application/json",
                }),
            })
        }
        document.location.reload();
    });

    document.querySelector("#edit").addEventListener("click", () => {
        
    })
}

document.querySelector("#run").addEventListener("click", async function () {

    const values = inputs.map(({ value }) => value.trim());
    const [name, shortDescription, description] = values;
    const resp = await fetch("https://character-database.becode.xyz/characters", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            shortDescription,
            description,
            image,
        })

    })
    document.location.reload();
});

let image = ""
document.querySelector('#hero-image').addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        image = reader.result.replace('data:', '').replace(/^.+,/, '');
    };
    reader.readAsDataURL(file);
});

