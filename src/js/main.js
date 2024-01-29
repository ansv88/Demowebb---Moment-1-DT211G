"use strict";

//Variabler
const toggleBtn = document.querySelector('.toggle-btn');
const toggleBtnIcon = document.querySelector('.toggle-btn i');
const dropDownMenu = document.querySelector('.dropdown-menu');
const url = "https://dahlgren.miun.se/ramschema_ht23.php";
const codeEl = document.getElementById("code");
const nameEl = document.getElementById("name");
const progressionEl = document.getElementById("progression");
const queryEl = document.getElementById("query");
let courses = [];

// Händelsehanterare
toggleBtn.addEventListener("click", toggleMenu, false);
codeEl.addEventListener("click", function () { sortCourses("code"); }, false);
nameEl.addEventListener("click", function () { sortCourses("coursename"); }, false);
progressionEl.addEventListener("click", function () { sortCourses("progression"); }, false);
queryEl.addEventListener("input", searchCourses, false);

window.onload = getCourses();

// Funktion för att öppna och stänga menyn i mobilläge
function toggleMenu() {
    dropDownMenu.classList.toggle('open');
    const isOpen = dropDownMenu.classList.contains('open');

    toggleBtnIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
}

// Funktion för att hämta information om kurser
async function getCourses() {
    try {
        // Fetch-anrop
        const response = await fetch(url);
        courses = await response.json();

        // Anropa funktion för att skriva ut kurserna till DOM
        displayCourses(courses);

    } catch (error) {
        document.getElementById("error").innerHTML = "<p>Något gick fel, prova igen senare!</p>";
    }
}

// Funktion som skriver ut information om kurserna till DOM
function displayCourses(courses) {
    const coursesEl = document.getElementById("courses-list");
    coursesEl.replaceChildren();

    //Loopa igenom arrayen och skriv ut till DOM
    courses.forEach((course) => {
        coursesEl.innerHTML += `
        <tr>
        <td>${course.code}</td>
        <td>${course.coursename}</td>
        <td>${course.progression}</td>
        </tr>
        `;
    });
}

// Funktion för att sortera kurserna
function sortCourses(sortType) {
    courses.sort((a, b) => (a[sortType] > b[sortType]) ? 1 : -1);
    displayCourses(courses);
}

// Filtrera kurser baserat på kurskod eller kursnamn
function searchCourses() {
    const query = queryEl.value.toLowerCase();
    const filteredCourses = courses.filter((course) => {
        return course.code.toLowerCase().includes(query) || course.coursename.toLowerCase().includes(query);
    });

    displayCourses(filteredCourses);
}