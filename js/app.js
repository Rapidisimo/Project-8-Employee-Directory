let employees = [];
const urlAPI =`https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

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
    console.log('displayModal-index')
}

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
gridContainer.addEventListener('click', e => {
    if (e.target !== gridContainer) {
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');
        displayModal(index);
        console.log('gridContainer-Click');
    }
});

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});

// ------------------------------------------
//  POST DATA
// ------------------------------------------

