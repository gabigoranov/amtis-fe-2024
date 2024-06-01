import {Post} from '../js/post.js'

const desserts_url = "http://localhost:4000/desserts";
const post_url = "http://localhost:4000/form_submissions/";
const form = document.querySelector('form');



window.onload = function() {
    loadAPIdata();
    form.onsubmit = postData;
};


function postData(e){
    e.preventDefault();

    let names = document.getElementById("names-input").value;
    let phone = document.getElementById("phone-input").value;
    let email = document.getElementById("email-input").value;
    let question = document.getElementById("question-input").value;

    let post = new Post(names, phone, email, question);
    console.log(post);
    let method = {method: 'POST', body: JSON.stringify(post)};
    fetch(post_url, method)
        .then((res) => console.log(res));
}

function loadAPIdata() {
    fetch(desserts_url)
        .then((res) => res.json())
        .then((data) => {
            let values = Object.values(data);
            //console.log(values);
            let horizontalCards = document.getElementsByClassName("horizontal-card");
            let verticalCards = document.getElementsByClassName("card");
            for(let i = 0; i < values.length; i++){
                let currentValue = values[i];
                let currentCard = verticalCards[i];

                //image
                currentCard.children[0].outerHTML = `<img src="/images/${currentValue.image}" width="100%" alt="">`
                //name
                currentCard.children[2].children[0].innerHTML = currentValue.name;
                //short description
                currentCard.children[2].children[1].innerHTML = currentValue.description_short;
            }
            for(let i = 0; i < values.length; i++){
                let currentValue = values[i];
                let currentCard = horizontalCards[i];
                console.log(currentValue);
                //image
                currentCard.children[0].outerHTML = `<img src="/images/${currentValue.image}" alt="">`
                //name
                currentCard.children[1].children[0].innerHTML = currentValue.name;
                //long description
                currentCard.children[1].children[1].innerHTML = currentValue.description_long;
                //ingredients
                currentCard.children[1].children[2].innerHTML = `<strong>Основни съставки:</strong>${currentValue.ingredients_text}.`
                //nutrition left
                let nutrition = currentValue.nutrition;
                //calories
                currentCard.children[2].children[0].children[0].children[1].innerHTML = nutrition.calories;
                //saturated fats
                currentCard.children[2].children[0].children[1].children[1].innerHTML = nutrition.saturatedFat + 'g';
                //protein
                currentCard.children[2].children[0].children[2].children[1].innerHTML = nutrition.protein + 'g';
                //sodium
                currentCard.children[2].children[0].children[3].children[1].innerHTML = nutrition.sodium + ' mg';
                
                //nutrition right
                //total fats
                currentCard.children[2].children[1].children[0].children[1].innerHTML = nutrition.totalFat + 'g';
                //total carbs
                currentCard.children[2].children[1].children[1].children[1].innerHTML = nutrition.totalCarbs + 'g';
                //sugars
                currentCard.children[2].children[1].children[2].children[1].innerHTML = nutrition.sugars + 'g';
                //cholesterol
                currentCard.children[2].children[1].children[3].children[1].innerHTML = nutrition.cholesterol + ' mg';


                


            }
        });
}

