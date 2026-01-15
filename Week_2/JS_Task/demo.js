const data = {
    countries: [
        {name: "India", states: [
            {name: "Maharashtra", cities: ["Mumbai", "Pune"]},
            {name: "Karnataka", cities: ["Bengaluru", "Mysore"]}
        ]},
        {name: "USA", states: [
            {name: "California", cities: ["Los Angeles","San Francisco"]},
            {name: "Texas", cities: ["Houston", "Dallas"]}
        ]}
    ]
};

const countrySelect = document.getElementById("country");
const stateSelect = document.getElementById("state");
const citySelect = document.getElementById("city");
const userForm = document.getElementById("userForm");
const userList = document.getElementById("userList");

window.onload = () => {
    data.countries.forEach(c => {
        const option = document.createElement("option");
        option.value = c.name;
        option.textContent = c.name;
        countrySelect.appendChild(option);
    });

    displayUsers();
};

countrySelect.addEventListener("change", () => {
    stateSelect.innerHTML = '<option value="">Select State</option>';
    citySelect.innerHTML = '<option valur="">Select City</option>';

    const country = data.countries.find(c => c.name === countrySelect.value);

    if (country) {
        country.states.forEach(s => {
            const option =  document.createElement("option");
            option.value = s.name;
            option.textContent = s.name;
            stateSelect.appendChild(option);
        });
    }
});

stateSelect.addEventListener("change", () => {
    citySelect.innerHTML = '<option value="">Select City</option>';

    const country = data.countries.find(c => c.name === countrySelect.value);

    if(country) {
        const state = country.states.find(s => s.name === stateSelect.value);
        if (state) {
            state.cities.forEach(city => {
                const option = document.createElement("option");
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });         
        }
    }
});

userForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const country = countrySelect.value;
    const state = countrySelect.value;
    const city = countrySelect.value;

    if (!name || !email )
});
