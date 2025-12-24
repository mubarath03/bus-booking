const buses = [
  { name: "Sith Travels", from: "chennai", to: "madurai", type: "AC Sleeper", price: 899 },
  { name: "Sara Travels", from: "chennai", to: "madurai", type: "Non-AC Seater", price: 499 },
  { name: "SRM Travels", from: "chennai", to: "madurai", type: "AC Seater", price: 699 },
  { name: "Resh Travels", from: "chennai", to: "madurai", type: "AC Sleeper", price: 799 },
  { name: "SPS Travels", from: "chennai", to: "madurai", type: "AC Sleeper", price: 799 },
  { name: "Arthi Travels", from: "chennai", to: "madurai", type: "AC Sleeper", price: 799 },

  { name: "Sith Travels", from: "tirunelveli", to: "coimbatore", type: "AC Sleeper", price: 899 },
  { name: "Sara Travels", from: "tirunelveli", to: "coimbatore", type: "Non-AC Seater", price: 499 },
  { name: "SRM Travels", from: "tirunelveli", to: "coimbatore", type: "AC Seater", price: 699 },
  { name: "Resh Travels", from: "tirunelveli", to: "coimbatore", type: "AC Sleeper", price: 799 },
  { name: "SPS Travels", from: "tirunelveli", to: "coimbatore", type: "AC Sleeper", price: 799 },
  { name: "Arthi Travels", from: "tirunelveli", to: "coimbatore", type: "AC Sleeper", price: 799 },


  { name: "Sith Travels", from: "chennai", to: "trichy", type: "AC Sleeper", price: 899 },
  { name: "Sara Travels", from: "chennai", to: "trichy", type: "Non-AC Seater", price: 499 },
  { name: "SRM Travels", from: "chennai", to: "trichy", type: "AC Seater", price: 699 },
  { name: "Resh Travels", from: "chennai", to: "trichy", type: "AC Sleeper", price: 799 },
  { name: "SPS Travels", from: "chennai", to: "trichy", type: "AC Sleeper", price: 799 },
  { name: "Arthi Travels", from: "chennai", to: "trichy", type: "AC Sleeper", price: 799 },

  { name: "Sith Travels", from: "chennai", to: "coimbatore", type: "AC Sleeper", price: 899 },
  { name: "Sara Travels", from: "chennai", to: "coimbatore", type: "Non-AC Seater", price: 499 },
  { name: "SRM Travels", from: "chennai", to: "coimbatore", type: "AC Seater", price: 699 },
  { name: "Resh Travels", from: "chennai", to: "coimbatore", type: "AC Sleeper", price: 799 },
  { name: "SPS Travels", from: "chennai", to: "coimbatore", type: "AC Sleeper", price: 799 },
  { name: "Arthi Travels", from: "chennai", to: "coimbatore", type: "AC Sleeper", price: 799 }
];

/* SEARCH PAGE */
function searchBus() {
  const from = document.getElementById("from").value.trim().toLowerCase();
  const to = document.getElementById("to").value.trim().toLowerCase();

  if (!from || !to) {
    alert("Enter From and To locations");
    return;
  }

  localStorage.setItem("from", from);
  localStorage.setItem("to", to);

  // GO TO NEXT PAGE
  window.location.href = "buslist.html";
}

/* BUS LIST PAGE */
document.addEventListener("DOMContentLoaded", function () {
  const busList = document.getElementById("busList");
  if (!busList) return;

  const from = localStorage.getItem("from")?.toLowerCase();
  const to = localStorage.getItem("to")?.toLowerCase();

  const result = buses.filter(
    b => b.from === from && b.to === to
  );

  if (result.length === 0) {
    busList.innerHTML = "<h3>No buses found</h3>";
    return;
  }

  result.forEach(bus => {
    busList.innerHTML += `
      <div class="bus-card">
        <h3>${bus.name}</h3>
        <p>${bus.type}</p>
        <p>₹${bus.price}</p>
        <a href="seat.html">
          <button class="view-seat-btn">View Seats</button>
        </a>
      </div>
      `;
    });
});




let selectedSeats = [];
let totalAmount = 0;

const countEl = document.getElementById("count");
const totalEl = document.getElementById("total");


const allSeats = document.querySelectorAll(".seat, .sleeper-seat");

allSeats.forEach((seat, index) => {

  
  if (seat.classList.contains("booked")) return;

  seat.addEventListener("click", () => {

    // get price
    const priceText =
      seat.dataset.price ||
      seat.innerText.replace("₹", "").trim();

    const price = parseInt(priceText);
    const seatId = `S${index + 1}`;

    if (seat.classList.contains("selected")) {
      // remove seat
      seat.classList.remove("selected");
      selectedSeats = selectedSeats.filter(s => s.id !== seatId);
      totalAmount -= price;
    } else {
      // add seat
      seat.classList.add("selected");
      selectedSeats.push({ id: seatId, price });
      totalAmount += price;
    }

    // update UI
    countEl.innerText = selectedSeats.length;
    totalEl.innerText = totalAmount;
  });
});


function goPassenger() {
  if (selectedSeats.length === 0) {
    alert("Please select at least one seat");
    return;
  }

  localStorage.setItem("seats", JSON.stringify(selectedSeats));
  localStorage.setItem("amount", totalAmount);

  window.location.href = "passenger.html";
}



function savePassenger() {
  const name = document.getElementById("pname").value.trim();
  const age = document.getElementById("page").value.trim();
  const gender = document.getElementById("pgender").value;
  const mobile = document.getElementById("pmobile").value.trim();

  if (!name || !age || !gender || !mobile) {
    alert("Please fill all passenger details");
    return;
  }


  const seats = JSON.parse(localStorage.getItem("seats"));

  if (!seats || seats.length === 0) {
    alert("Seat data missing. Please select seat again.");
    return;
  }

  const passengers = [
    {
      name,
      age,
      gender,
      mobile,
      seats   
    }
  ];

  localStorage.setItem("passengers", JSON.stringify(passengers));

  window.location.href = "payment.html";
}


function payNow() {
  const upi = document.getElementById("upi").value.trim();

  if (!upi) {
    alert("Please enter payment details");
    return;
  }

  alert(" Bus Booked Successfully!");
  window.location.href = "ticket.html";
}


