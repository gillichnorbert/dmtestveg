// itemList inicializálása üres tömbként
let itemList = [];

// Az itemList inicializálásának helye a többi változóval együtt
const summaryBody = document.getElementById('summeryBody');
const total = document.getElementById('total');
const clearListBtn = document.getElementById('clearListBtn');
const backButton = document.getElementById('backButton');

function openCashoutPage() {
    window.open('cashout.html', "_self");
    updateListAndTotal(); // Lista és végösszeg frissítése
}

function backToDrinks() {
    updateListAndTotal(); // Lista és végösszeg frissítése
    saveItemListToSessionStorage(); // Mentjük az üres itemList-et a sessionStorage-be
    window.open('index.html', "_self");
}

// Vissza gomb eseménykezelője
backButton.addEventListener('click', function() {
    displayItems(items); // Minden termék megjelenítése
    
});




// Lista és végösszeg frissítése
function updateListAndTotal() {
    // Tartalom frissítése az összes termék megjelenítéséhez
    displayItems(items);

    updateTotal();
}

// Az oldal betöltésekor ellenőrizzük, hogy van-e mentett adat a sessionStorage-ben
window.addEventListener('DOMContentLoaded', function() {
    const savedItemList = sessionStorage.getItem('itemList');
    if (savedItemList) {
        itemList = JSON.parse(savedItemList);
        updateListAndTotal(); // Lista és végösszeg frissítése a mentett adatok alapján
    }
});



// Tétel hozzáadása a listához vagy darabszám növelése
function addItemToList(name, price) {
    let existingItem = itemList.find(item => item.name === name);

    if (existingItem) {
        existingItem.piece++;
    } else {
        itemList.push({ name, price, piece: 1 });
    }

    updateListAndTotal();
    saveItemListToSessionStorage(); // Mentjük az itemList-et a sessionStorage-be
}

// Lista és végösszeg frissítése
function updateListAndTotal() {
    summaryBody.innerHTML = ""; // Lista tartalmának törlése
    itemList.forEach((item, index) => { // Az indexet is átadjuk
        var row =`
            <tr>
                <td>${item.name}</td>
                <td>${item.piece}</td>
                <td>${item.price}</td>
                <td><img src="img/trash.svg" class="trashbin" data-index="${index}"></td> <!-- Az indexet adatattribútumként tároljuk -->
            </tr>
        `;
        summaryBody.innerHTML += row;
    });

    updateTotal();

    // Trashbin (kukás) ikonokhoz eseményfigyelők hozzáadása
    const trashbins = document.querySelectorAll('.trashbin');
    trashbins.forEach(trashbin => {
        trashbin.addEventListener('click', function(event) {
            const index = event.target.dataset.index; // Az index kinyerése az adatattribútumból
            deleteItem(index);
        });
    });
    loadCSS('style.css');
}

// Tétel törlése az index alapján
function deleteItem(index) {
    itemList.splice(index, 1); // Az adott indexű elem törlése a listából
    updateListAndTotal(); // Lista és végösszeg frissítése
    saveItemListToSessionStorage(); // Mentjük az üres itemList-et a sessionStorage-be
}


// Végösszeg frissítése
function updateTotal() {
    var sum = 0;
    itemList.forEach(item => {
        sum += item.price * item.piece; // Darabszámot is figyelembe vesszük
    });
    total.innerText = ` ${sum} Ft`;
}



// Lista törlése gomb eseménykezelője
clearListBtn.addEventListener('click', function() {
    itemList.length = 0; // Törlés az itemList tömbből
    updateListAndTotal(); // Lista és végösszeg frissítése
    saveItemListToSessionStorage(); // Mentjük az üres itemList-et a sessionStorage-be
});

// Az itemList-et elmentjük a sessionStorage-be
function saveItemListToSessionStorage() {
    sessionStorage.setItem('itemList', JSON.stringify(itemList));
}

// 1. Kategóriák meghatározása
const categories = [...new Set(items.map(item => item.category))];

// 2. Felhasználói felület kialakítása
const categoryFilter = document.getElementById('categoryFilter');


//KATEGÓRIA NEVEK

const categoryTranslations = {
  "Soda": "Üdítő",
  "Shot": "Rövidital",
  "Longdrink": "Longdrink",
  "Water":"Víz",
  "Cocktail":"Koktél",
  "Cup":"Pohár",
  "Other":"Egyéb",
  "Beer":"Sör",
  "Energydrink":"Energiaital",
  "Spritz":"Fröccs",
  "Wine":"Bor",
  "Champagne":"Pezsgő"
  // további kategóriák és fordításaik
};

categories.forEach(category => {
    const button = document.createElement('button');
    button.textContent = categoryTranslations[category]; // Magyar fordítás használata
    button.classList.add('btn', 'btn-primary', 'mx-2');
    button.addEventListener('click', function() {
        filterItemsByCategory(category);
    });
    categoryFilter.appendChild(button);
  });
  
  
  // 3. Szűrés a kategóriák alapján
  function filterItemsByCategory(category) {
      const filteredItems = items.filter(item => item.category === category);
  
    displayItems(filteredItems);
  }
  
  // 4. Eseménykezelés
  function displayItems(itemsToDisplay) {
      const filteredItemsContainer = document.getElementById('itemPlace');
      filteredItemsContainer.innerHTML = ''; // Töröljük az előző termékeket
  
      itemsToDisplay.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card-item';
    card.innerHTML = `
    <div id="itemButton" class="${item.category}">
    <div class="card-body">
      <h5 class="card-title" id="itemName">${item.name}</h5>
      <h6 class="card-subtitle" id="itemAmount">${item.amount}</h6>
      <p class="card-text" id="itemPrice">${item.price} Ft</p>
    </div>
    </div>
    `;
  
          filteredItemsContainer.appendChild(card);
          // Eseményfigyelő hozzáadása a kártyákhoz
          card.addEventListener('click', function() {
              addItemToList(item.name, item.price);
          });
      });

    // Új CSS fájl dinamikus betöltése

}
  
  // 5. Az oldal betöltésekor ellenőrizzük, hogy van-e mentett adat a sessionStorage-ben
  window.addEventListener('DOMContentLoaded', function() {
      const savedItemList = sessionStorage.getItem('itemList');
      if (savedItemList) {
          itemList = JSON.parse(savedItemList);
          updateListAndTotal(); // Lista és végösszeg frissítése a mentett adatok alapján
      }
  });
  
  // 6. Tétel hozzáadása a listához vagy darabszám növelése
  function addItemToList(name, price) {
      let existingItem = itemList.find(item => item.name === name);
  
      if (existingItem) {
          existingItem.piece++;
      } else {
          itemList.push({ name, price, piece: 1 });
      }
  
      updateListAndTotal();
      saveItemListToSessionStorage(); // Mentjük az itemList-et a sessionStorage-be
  }