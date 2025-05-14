// side menu
const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");


menuBtn.addEventListener('click', () => {
  sideMenu.style.display = 'block';
})

closeBtn.addEventListener('click', () => {
  sideMenu.style.display = 'none';
})



// theme changer
const themeToggler = document.querySelector(".theme_toggler");
themeToggler.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme-variables');

  themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
  themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
})




function loadPage(page) {
  fetch(`pages/${page}.html`)
    .then(response => response.text())
    .then(html => {
      document.getElementById('body-content').innerHTML = html;
      // Pages where header should be hidden
      const headerHiddenPages = ["message"];

      // Toggle header visibility
      const header = document.getElementById("header_con");
      if (headerHiddenPages.includes(page)) {
        header.style.display = "none";
      } else {
        header.style.display = "flex";
      }

      const container = document.querySelector('.container');
      if (page === "message") {
        container.style.gap = "0"; // remove gap
      } else {
        container.style.gap = "1.8rem"; // default gap
      }

      setActiveLink(page);
      initPageScripts();
    })
    .catch(err => {
      document.getElementById('body-content').innerHTML = "<p>Error loading content.</p>";
    });
}


function setActiveLink(page) {
  document.querySelectorAll("aside a").forEach(link => {
    if (link.getAttribute("data-page") === page) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadPage("overview"); // Load default page

  document.querySelectorAll("aside a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const page = link.getAttribute("data-page");
      loadPage(page);
    });
  });
});


function initPageScripts() {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      // Remove active class from all
      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));

      // Add to selected
      tab.classList.add("active");
      const target = tab.getAttribute("data-tab");
      document.getElementById(target).classList.add("active");
    });
  });

  // === Donut Chart ===
  const canvas = document.getElementById("donutChart");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const data = [
      { label: "Male", value: 45, color: "#5d449f" },
      { label: "Female", value: 30, color: "#765eb8" },
      { label: "Child", value: 25, color: "#e4daff" }
    ];
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let startAngle = -0.5 * Math.PI;

    data.forEach(item => {
      const sliceAngle = (item.value / total) * 2 * Math.PI;
      ctx.beginPath();
      ctx.arc(100, 100, 80, startAngle, startAngle + sliceAngle);
      ctx.lineWidth = 30;
      ctx.strokeStyle = item.color;
      ctx.stroke();
      startAngle += sliceAngle;
    });

    ctx.beginPath();
    ctx.arc(100, 100, 50, 0, 2 * Math.PI);
    ctx.fillStyle = "transparent";
    ctx.fill();
  }

  // === Calendar ===
  let currentDate = new Date();
  let selectedDate = new Date();

  function getWeekDates(date) {
    const dayOfWeek = date.getDay();
    const weekStart = new Date(date);
    weekStart.setDate(weekStart.getDate() - dayOfWeek);
    const week = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStart);
      d.setDate(weekStart.getDate() + i);
      week.push(d);
    }
    return week;
  }

  function updateCalendar() {
    const week = getWeekDates(currentDate);
    const weekRange = document.getElementById("weekRange");
    const weekDays = document.getElementById("weekDays");
    if (!weekRange || !weekDays) return;

    const start = week[0];
    const end = week[6];
    const startDay = String(start.getDate()).padStart(2, "0");
    const endDay = String(end.getDate()).padStart(2, "0");
    const startMonth = start.toLocaleString('default', { month: 'short' });
    const endMonth = end.toLocaleString('default', { month: 'short' });
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();

    let rangeText = "";
    if (startMonth === endMonth && startYear === endYear) {
      rangeText = `${startDay} – ${endDay} ${startMonth}, ${startYear}`;
    } else if (startYear === endYear) {
      rangeText = `${startDay} ${startMonth} – ${endDay} ${endMonth}, ${startYear}`;
    } else {
      rangeText = `${startDay} ${startMonth}, ${startYear} – ${endDay} ${endMonth}, ${endYear}`;
    }

    weekRange.textContent = rangeText;
    weekDays.innerHTML = "";
    week.forEach((day) => {
      const span = document.createElement("span");
      span.textContent = day.getDate();
      if (selectedDate && day.toDateString() === selectedDate.toDateString()) {
        span.classList.add("selected");
      }
      span.addEventListener("click", () => {
        selectedDate = new Date(day);
        updateCalendar();
      });
      weekDays.appendChild(span);
    });
  }

  const prevBtn = document.getElementById("prevWeek");
  const nextBtn = document.getElementById("nextWeek");
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      currentDate.setDate(currentDate.getDate() - 7);
      selectedDate = null;
      updateCalendar();
    });

    nextBtn.addEventListener("click", () => {
      currentDate.setDate(currentDate.getDate() + 7);
      selectedDate = null;
      updateCalendar();
    });

    updateCalendar();



  }
}