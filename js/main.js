document.addEventListener("DOMContentLoaded", function () {
  let currentStep = 1;
  let selectedStaff = null;
  let selectedService = null;


  const steps = document.querySelectorAll(".step");
  const staffCards = document.querySelectorAll(".staff-card");
  const nextButtons = document.querySelectorAll(".next-btn");
  const prevButtons = document.querySelectorAll(".prev-btn");
  const servicesContainer = document.querySelector(".services-container");
  const completedState = document.querySelector("#completed-state");

  const stepsValidation = [
    {
      validation: () => selectedStaff !== null,
    },
    {
      validation: () => selectedService !== null,
    },
  ];


  staffCards.forEach((card) => {
    card.addEventListener("click", function () {
      const warningCard = document.querySelector(
        `.form-step[data-step="${currentStep}"] .warning-card`
      );
      if (card.classList.contains("selected")) {
        card.classList.remove("selected");
        selectedStaff = null;
      } else {
        staffCards.forEach((c) => c.classList.remove("selected"));
        card.classList.add("selected");
        selectedStaff = card.getAttribute("data-staff");
      }
      warningCard.style.display = "none"; // Hide warning when a staff is selected
    });
  });

  // Populate the services
  services.forEach((service) => {
    const serviceCard = document.createElement("div");
    serviceCard.classList.add("service-card");
    serviceCard.dataset.serviceId = service.id;


    serviceCard.innerHTML = `
    <div class="card_item_header">
    <div class="card_item_image">
    <img src="./images/${service.image}" alt="${service.name}">
    </div>
    <div class="card_item_content">
    <h4>${service.name}</h4>
        <p>${service.duration}</p>
    </div>
    </div>
    <p>$${service.price.toFixed(2)}</p> 
    `;

    serviceCard.addEventListener("click", function () {
      const warningCard = document.querySelector(
        `.form-step[data-step="${currentStep}"] .warning-card`
      );

      if (serviceCard.classList.contains("selected")) {
        serviceCard.classList.remove("selected");
        selectedService = null;
      } else {

        document
          .querySelectorAll(".service-card")
          .forEach((c) => c.classList.remove("selected"));
        serviceCard.classList.add("selected");
        selectedService = service.id;
      }
      warningCard.style.display = "none";

    });

    servicesContainer.appendChild(serviceCard);
  });


  nextButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const warningCard = document.querySelector(
        `.form-step[data-step="${currentStep}"] .warning-card`
      );

      if (currentStep <= stepsValidation.length && !stepsValidation[currentStep - 1].validation()) {
        warningCard.style.display = "block";
        return;
      }
      warningCard.style.display = "none";

      goToStep(currentStep + 1);
      updateSummary();
    });
  });


  prevButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      goToStep(currentStep - 1);
      updateSummary();
    });
  });

  function goToStep(step) {
    document.querySelector(
      `.form-step[data-step="${currentStep}"]`
    ).style.display = "none";
    document
      .querySelector(`.step[data-step="${currentStep}"]`)
      .classList.remove("active");

    // Mark previous steps as completed
    for (let i = 1; i < step; i++) {
      const stepItem = document.querySelector(`.step[data-step="${i}"]`);
      stepItem.querySelector(".step-check").style.display = "inline";
      stepItem.querySelector(".step-number").style.display = "none"; // Hide the step number
    }

    if (step <= steps.length) {
      currentStep = step;

      document.querySelector(
        `.form-step[data-step="${currentStep}"]`
      ).style.display = "block";
      document
        .querySelector(`.step[data-step="${currentStep}"]`)
        .classList.add("active");


      const currentStepItem = document.querySelector(
        `.step[data-step="${step}"]`
      );
      currentStepItem.querySelector(".step-check").style.display = "none";
      currentStepItem.querySelector(".step-number").style.display = "inline"; // Show the step number


      for (let i = step + 1; i <= steps.length; i++) {
        const stepItem = document.querySelector(`.step[data-step="${i}"]`);
        stepItem.querySelector(".step-check").style.display = "none";
        stepItem.querySelector(".step-number").style.display = "inline"; // Show the step number
      }
    } else {
      completedState.style.display = "block";
      completedState.style.color = "green";
      const findSelectedService = services.find(
        (service) => service.id === selectedService
      )?.name;
      console.log("Final selected DATAS: ", {
        selectedStaff,
        selectedService: findSelectedService,
      });
    }
  }

  function updateSummary() {
    const findSelectedService = services.find(
      (service) => service.id === selectedService
    )?.name;
    const findSelectedPrice = services.find(
      (service) => service.id === selectedService
    )?.price;

    document.querySelector("#selectedStaff").textContent = selectedStaff;
    document.querySelector("#selectedService").textContent =
      findSelectedService;
    document.querySelector("#selectedPrice").textContent = `$${findSelectedPrice.toFixed(2)}`;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("myForm");
  const submitButton = document.getElementById("submitBtn");
  const completedState = document.getElementById("completed-state");

  submitButton.addEventListener("click", function (event) {


    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const telephone = document.getElementById("telephone").value;
    const email = document.getElementById("email").value;


    const formData = {
      firstname: firstname,
      lastname: lastname,
      telephone: telephone,
      email: email
    };

    const combinedData = {
      ...formData,
      selectedTime: selectedTime
    };
    console.log(combinedData)

    completedState.style.display = "block";




    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("telephone").value = "";
    document.getElementById("email").value = "";
    event.preventDefault();
  
  });
});



const monthYearElement = document.getElementById("month-year");
const calendarBody = document.getElementById("calendar-body");
const prev = document.getElementById("prev__btn");
const next = document.getElementById("next__btn");

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let currentDate = new Date();

function updateCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  monthYearElement.textContent = `${months[month]} ${year}`;

  let day = new Date(firstDay);
  day.setDate(day.getDate() - day.getDay());

  calendarBody.innerHTML = "";

  while (day <= lastDay) {
    const dayElement = document.createElement("div");
    dayElement.textContent = day.getDate();
    dayElement.classList.add("day");

    if (day.getMonth() !== month) {
      dayElement.classList.add("empty");
    }

    if (
      day.toDateString() === new Date().toDateString()
    ) {
      dayElement.classList.add("today");
    }
    dayElement.addEventListener("click", () => {
      const selectedDay = document.querySelector(".selected");
      if (selectedDay) {
        selectedDay.classList.remove("selected");
      }
      dayElement.classList.add("selected");
    });

    calendarBody.appendChild(dayElement);

    day.setDate(day.getDate() + 1);
  }
}

prev.addEventListener("click", () => {
  event.preventDefault();
  currentDate.setMonth(currentDate.getMonth() - 1);
  updateCalendar();
});

next.addEventListener("click", () => {
  event.preventDefault();
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateCalendar();
});

updateCalendar();

const timeSlotsContainer = document.querySelector('.time'); // "time-slots" sınıfını seçtiğinizden emin olun

const selectedTime = {};

timeData.forEach(timeSlot => {
  const timeSlotDiv = document.createElement('div');
  timeSlotDiv.classList.add('time-slot');
  timeSlotDiv.textContent = `${timeSlot.start_time} - ${timeSlot.end_time}`;

  timeSlotDiv.addEventListener('click', () => {
    const selectedSlots = document.querySelectorAll('.time-slot.selected');
    selectedSlots.forEach(slot => {
      slot.classList.remove('selected');
    });


    timeSlotDiv.classList.add('selected');


    selectedTime.start_time = timeSlot.start_time;
    selectedTime.end_time = timeSlot.end_time;


  });

  timeSlotsContainer.appendChild(timeSlotDiv);
});













