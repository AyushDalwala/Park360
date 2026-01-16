const data = {
    countries: [
        {name: "India", states: [
            {name: "Maharashtra", cities: ["Mumbai", "Pune"]},
            {name: "Gujarat", cities: ["Ahemdabad", "Surat"]}
        ]},
        {name: "USA", states: [
            {name: "California", cities: ["Los Angeles", "San Francisco"]},
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
}

countrySelect.addEventListener("change", () => {
    stateSelect.innerHTML = '<option value="">---Select State---</option>';
    citySelect.innerHTML = '<option value="">---Select City---</option>';

    const country = data.countries.find(c => c.name === countrySelect.value);

    if (country) {
        country.states.forEach(s => {
            const option = document.createElement("option");
            option.value = s.name;
            option.textContent = s.name;
            stateSelect.appendChild(option);
        });
    }
});

stateSelect.addEventListener("change", () => {
    citySelect.innerHTML = '<option value="">---Select City---</option>';

    const country = data.countries.find(c => c.name === countrySelect.value);

    if (country) {
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
    const state = stateSelect.value;
    const city = citySelect.value;

    if (!name || !email || !country || !state || !city) {
        alert("Please fill all fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "[]");

    const duplicate = users.find(u => u.email === email);
    if (duplicate) {
        alert("User with this email already exists");
        return;
    }

    const user = {name, email, country, state, city};
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert("User registered successfully");

    userForm.reset();
    stateSelect.innerHTML = '<option value="">---Select State---</option>';
    citySelect.innerHTML = '<option value="">---Select City---</option>';

    displayUsers();
});

function displayUsers() {
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    userList.innerHTML = "";
    users.forEach(u => {
        const li = document.createElement("li");
        li.textContent = `${u.name} (${u.email}) - ${u.city}, ${u.state}, ${u.country}`;
        userList.appendChild(li);
    });
}