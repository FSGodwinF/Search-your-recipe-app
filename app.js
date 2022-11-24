const searchForm = document.querySelector('form');
const searchResult = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = '3ae9fca5';
const APP_key = 'f1341adfe827f3eb0fd14274b9d1a790';



searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;

    fetchData();

});

async function fetchData(){
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=33`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
}
function generateHTML(results){
    let generatedHTML = '';
    results.map(result=>{
        generatedHTML+=  `
                            <div class="item">
                            <img src="${result.recipe.image}" alt="${result.recipe.label}"/>
                            <div class="flex-container">
                                <h1 class="title">${result.recipe.label}</h1>
                                <a href="${result.recipe.url}" target="_blank">Recipe</a>
                            </div>
                            <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)} cal</p>
                            <p class="item-data">Health labels: ${result.recipe.healthLabels.slice(0, 3)}</p>
                            </div>
                            
                            `
    });

    searchResult.innerHTML = generatedHTML;
    
    
}



