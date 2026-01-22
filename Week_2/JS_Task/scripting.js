const conutrySelect = document.getElementById("country");
const stateSelect = document.getElementById("State");
const citySelect = document.getElementById("city");
const errorDiv = document.getElementById("error");

async function loadCountries() {
    const res = await fetch(
        "https://countriesnow.space/api/v0.1/countries/positions"
    );
    const data = await res.json();

    localStorage.setItem("countries", JSON.stringify(data.data));

    data.data.forEach(c => {
        const option = document.createElement("option");
        option.value = c.name;
        option.textContent = c.name;
        conutrySelect.appendChild(option);
    });
}

async function loadStates() {
    const country = conutrySelect.value;
    stateSelect.innerHTML = `<option value="">-- Select State --</option>`;
    citySelect.innerHTML = `<option value="">-- Select City --</option>`;
    stateSelect.disabled = true;
    citySelect.disabled = true;

    if (!country) return;

    const res = await fetch(
        "https://countriesnow.space/api/v0.1/countries/states",
        {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({country})
        }
    );

    const data = await res.json();
    localStorage.setItem(`states_${country}`, JSON.stringify(data.data.states));

    data.data.states.forEach(s => {
        const option = document.createElement("option");
        option.value = s.name;
        option.textContent = s.name;
        stateSelect.appendChild(option);
    });

    stateSelect.disabled = false;
}

async function loadCities() {
    const country = conutrySelect.value;
    const state = stateSelect.value;
    citySelect.innerHTML = `<option value="">-- Select City --</option>`;
    citySelect.disabled = true;

    if (!state) return;

    const res = await fetch(
        "https://countriesnow.space/api/v0.1/countries/state/cities",
        {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({country, state})
        }
    );

    const data = await res.json();
    localStorage.setItem(`cities_${country}_${state}`, JSON.stringify(data.data));

    data.data.forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });

    citySelect.disabled = false;
}

function validateForm(user) {
    if (!user.name || !user.email || !user.country || !user.state || !user.city) {
        errorDiv.textContent = "All fields are required";
        return false;
    }

    return true;
}

function isDuplicateUser(email) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.some(u => u.email === email);
}

function saveUser(user) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    conutrySelect.value = "";
    stateSelect.innerHTML = `<option value="">-- Select State --</option>`;
    citySelect.innerHTML = `<option value="">-- Select City --</option>`;
    stateSelect.disabled = true;
    citySelect.disabled = true;
}

function renderTable() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const tbody = document.querySelector("#userTable tbody");
    tbody.innerHTML = "";
}
    
