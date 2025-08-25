// Shranjene rezervacije (datum -> array rezerviranih ur)
const reservations = {};

// Funkcija za generiranje ur
function generateTimes(start, end, containerId, dateKey) {
    const container = document.getElementById(containerId) || document.getElementById("time-container");

    for (let hour = start; hour <= end; hour++) {
        const time = hour + ":00";

        // Če je ura že rezervirana, jo preskočimo
        if (reservations[dateKey] && reservations[dateKey].includes(time)) {
            continue;
        }

        const label = document.createElement("label");
        const input = document.createElement("input");

        input.type = "checkbox";
        input.value = time;

        label.appendChild(input);
        label.append(" " + time);

        container.appendChild(label);
    }
}

// Funkcija, ki pokaže proste ure glede na izbran datum
function showAvailableTimes() {
    const dateInput = document.getElementById("date").value;
    if (!dateInput) return;

    const date = new Date(dateInput);
    const day = date.getDay(); // 0 = nedelja, 6 = sobota

    const container = document.getElementById("time-container");
    container.innerHTML = ""; // počisti prejšnji seznam

    if (day === 6) { 
        // Sobota
        const title = document.createElement("h2");
        title.textContent = "Proste ure za soboto (8:00–20:00):";
        container.appendChild(title);
        generateTimes(8, 20, "time-container", dateInput);
    } else if (day === 0) { 
        // Nedelja
        const title = document.createElement("h2");
        title.textContent = "Proste ure za nedeljo (12:00–17:00):";
        container.appendChild(title);
        generateTimes(12, 17, "time-container", dateInput);
    } else {
        // Delovni dnevi
        container.textContent = "Na ta dan ni prostih terminov.";
    }
}

// Rezervacija
function submitBooking() {
    const dateInput = document.getElementById("date").value;
    if (!dateInput) {
        alert("Najprej izberite datum!");
        return;
    }

    const selectedTimes = [];
    const timeList = document.querySelectorAll('#time-container input:checked');

    timeList.forEach(time => {
        selectedTimes.push(time.value);
    });

    if (selectedTimes.length > 0) {
        // Dodamo v seznam rezervacij
        if (!reservations[dateInput]) {
            reservations[dateInput] = [];
        }
        reservations[dateInput] = reservations[dateInput].concat(selectedTimes);

        alert("Uspešno ste rezervirali naslednje ure: " + selectedTimes.join(", "));

        // Ponovno osvežimo prikaz, da skrijemo rezervirane ure
        showAvailableTimes();
    } else {
        alert("Prosimo, izberite vsaj eno prosto uro.");
    }
}