
console.log("hej")


// get products from json

async function getProducts(){
    const response = await fetch("products.json");
    const data = await response.json();
    return data;
}

getProducts().then(data => {
    console.log(data);
})

// check if local storage exists

let productsArray = [];

const locallyStoredItems = JSON.parse(localStorage.getItem("products"));
if (locallyStoredItems){
    productsArray = [...locallyStoredItems];
}

// display local storage

const mainListContainer = document.querySelector("#list-container");
const vegetables = document.querySelector("#gront");
const bread = document.querySelector("#brod-och-bak");
const conserves = document.querySelector("#konserver");
const oils = document.querySelector("#olja");
const carbs = document.querySelector("#kolhydrater");
const dairy = document.querySelector("#mejeri");
const cheese = document.querySelector("#ost");
const frozen = document.querySelector("#fryst");
const snacks = document.querySelector("#snacks");
const nonFood = document.querySelector("#icke-mat")

function displayLocalStorage(){

    const itemsInList = JSON.parse(localStorage.getItem("products"));

    itemsInList.forEach(item => {

        const newListItem = document.createElement("div");
        newListItem.classList.add("list-item");
        const itemName = document.createElement("p");
        const deleteBtn = document.createElement("button");

        itemName.innerText = item.namn;
        deleteBtn.innerHTML = 'remove';

        newListItem.append(itemName, deleteBtn);

        if (item.kategori == "bröd och bak"){
            newListItem.classList.add("brod-och-bak")
            bread.prepend(newListItem)
        } else if (item.kategori == "grönt"){
            newListItem.classList.add("gront")
            vegetables.prepend(newListItem);
        } else if (item.kategori == "konserver"){
            newListItem.classList.add("konserver")
            conserves.prepend(newListItem);
        } else if (item.kategori == "olja mm"){
            newListItem.classList.add("olja-mm")
            oils.prepend(newListItem)
        } else if (item.kategori == "kolhydrater"){
            newListItem.classList.add("kolhydrater")
            carbs.prepend(newListItem)
        } else if (item.kategori == "mejeri"){
            newListItem.classList.add("mejeri")
            dairy.prepend(newListItem)
        } else if (item.kategori == "ost"){
            newListItem.classList.add("ost")
            cheese.prepend(newListItem)
        } else if (item.kategori == "fryst"){
            newListItem.classList.add("fryst")
            frozen.prepend(newListItem)
        } else if (item.kategori == "godis och snacks"){
            newListItem.classList.add("snacks")
            snacks.prepend(newListItem)
        } else if (item.kategori == "icke-mat"){
            newListItem.classList.add("icke-mat")
            nonFood.prepend(newListItem)
        } 

        // remove item from list and array on button click

        deleteBtn.addEventListener("click", (x)=>{
            let parentElement = x.target.parentElement;
            let nameOfItem = parentElement.children[0];

            let indexOfListItem = productsArray.findIndex(object => {
                return object.namn == nameOfItem.innerText;
            })

            productsArray.splice(indexOfListItem, 1);
            localStorage.setItem("products", JSON.stringify(productsArray));
            parentElement.remove();
        })

    })
}

displayLocalStorage();

// autocomplete during input

const itemInput = document.querySelector("#item-input");
const autocompleteContainer = document.querySelector("#autocomplete ul");

getProducts().then(data => {
    let productList = data.varor;
    
    itemInput.addEventListener("keyup", (x)=>{
        x.preventDefault();
        autocompleteContainer.innerHTML = "";
        
        productList.forEach(product => {
            let productName = product.namn;
            if (x.target.value != ""){
                if (productName.includes(x.target.value)){
                    let newListItem = document.createElement("li");
                    newListItem.innerText = product.namn;
                    autocompleteContainer.append(newListItem);

                    // lägg vara i local storage vid knapptryck

                    newListItem.addEventListener("click", ()=>{
                        vegetables.innerHTML = "";
                        bread.innerHTML = "";
                        conserves.innerHTML = "";
                        oils.innerHTML = "";
                        carbs.innerHTML = "";
                        dairy.innerHTML = "";
                        cheese.innerHTML = "";
                        frozen.innerHTML = "";
                        snacks.innerHTML = "";
                        nonFood.innerHTML = "";

                        itemInput.value = "";
                        autocompleteContainer.innerHTML = "";
                        productsArray.push({
                            namn: product.namn,
                            kategori: product.kategori
                        })

                        localStorage.setItem("products", JSON.stringify(productsArray))
                        displayLocalStorage();
                    })
                }
            }
        });

    
    })
})
