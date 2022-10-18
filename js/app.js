let employees = [];
const urlAPI =`https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const search = document.getElementById('searchbox');
const leftArrow = document.querySelector(".l-arrow");
const rightArrow = document.querySelector(".r-arrow");
let cardIndex = 0;

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
fetch(urlAPI)
  .then(response => response.json())
  .then(res => res.results)
  .then(displayEmployees)
  .catch(err => console.log(err))

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
function displayEmployees (employeeData) {
    // To access outside of this function
    employees = employeeData;
    // store the HTML as it's created
    let employeeHTML = '';
    // loop through each emplyee and create html
    employees.forEach( (employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
    
        employeeHTML += `
            <div class="card" data-index="${index}">
            <img class="profile-photo" src="${picture.large}" alt="profile-photo">
                <div class="profile-data">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>
            `    
    })
    gridContainer.innerHTML = employeeHTML;
};

function displayModal(index) {
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];

    let date = new Date(dob.date);

    const modalHTML = `
    <img src="${picture.large}" alt="profile-photo" class="profile-photo">
    <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        <hr />
        <p>${phone}</p>
        <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
        <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    `;
    
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
    // Fix for blank modals because of search functionality
    modalContainer.style.display = null;
}

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

// Modal Window with correct data
gridContainer.addEventListener('click', e => {
    if (e.target !== gridContainer) {
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');
        cardIndex = index;
        displayModal(index);
    }
});
// Close modal window
modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});

// Search functionality
search.addEventListener('keyup', e => {
    let currentValue = e.target.value.toLowerCase();
    let employeeNames = document.querySelectorAll('.name');
    employeeNames.forEach(employeeCard => {
        if(employeeCard.textContent.toLocaleLowerCase().includes(currentValue)) {
            employeeCard.parentNode.parentNode.style.display = 'grid';
        } else {
            employeeCard.parentNode.parentNode.style.display = 'none';
        }
    })
});

// Modal left arrow to cycle through employees
leftArrow.addEventListener('click', e => {
    cardIndex = parseInt(cardIndex);
    if(cardIndex !== 0) {
        cardIndex -= 1;
    } else {cardIndex = 11}
    displayModal(cardIndex);
});

// Modal right arrow to cycle through employees
rightArrow.addEventListener('click', e => {
    cardIndex = parseInt(cardIndex);
    if(cardIndex !== 11) {
        cardIndex += 1;
    } else {cardIndex = 0}
    displayModal(cardIndex);
});