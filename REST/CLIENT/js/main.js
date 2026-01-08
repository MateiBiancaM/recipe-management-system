const API_BASE_URL = 'http://localhost:8080'

const recipesContainer = document.getElementById('recipes');

function displayData(data){
    const dataElement = document.createElement('pre') 
    dataElement.textContent = JSON.stringify(data, null, 2) 
    recipesContainer.appendChild(dataElement)
}

async function getItems(){
    console.log('Fetching all recipes...');
    try{
        const response = await fetch(`${API_BASE_URL}/recipes`) 
        console.log('Response status:', response.status);
        const data = await response.json();
        displayData(data); 
    }
    catch(err){
        console.error('Error:', err)
    }
}

getItems()