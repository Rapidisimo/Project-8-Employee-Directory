let employeeList = [];
const apiURL =`https://randomuser.me/api/?inc=picture,name,email,location,&results=12`;
const gridElement = document.querySelector("main");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal");
const modalClose = document.querySelector(".modal-close");

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
fetch(apiURL)
  .then(response => response.json())
  .then(res => res.results)
  .then(displayEmployees)
  .catch(err => console.log(err))




// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
function displayEmployees (employeeData) {
    // To access outside of this function
    employeeList = employeeData;
    // store the HTML as it's created
    let employeeHTML = '';
    // loop through each emplyee and create html
    employeeList.forEach( (employee, index) => {
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
    gridElement.innerHTML = employeeHTML;
};


// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------



// ------------------------------------------
//  POST DATA
// ------------------------------------------

