"use strict" ;

// Variabler
const toggleBtn = document.querySelector('.toggle-btn');
const toggleBtnIcon = document.querySelector('.toggle-btn i');
const dropDownMenu = document.querySelector('.dropdown-menu');

const url = "https://dahlgren.miun.se/ramschema_ht23.php";
const codeEl = document.getElementById("code");
const nameEl = document.getElementById("name");
const progressionEl = document.getElementById("progression");

//Händelsehanterare
codeEl.addEventListener("click", sortByCode, false);
nameEl.addEventListener("click", sortByName, false);
progressionEl.addEventListener("click", sortByProgression, false);

window.onload = init;

// Funktion för att öppna och stänga menyn i mobilläge
toggleBtn.onclick = function() {
    dropDownMenu.classList.toggle('open');
    const isOpen = dropDownMenu.classList.contains('open');

    if (isOpen) {
        toggleBtnIcon.classList = 'fa-solid fa-xmark';
    } else {
        toggleBtnIcon.classList = 'fa-solid fa-bars';
    }
};


async function init() {
    try {
        //Fetch-anrop
        const response = await fetch(url);
        const courses = await response.json();

    displayCourses(courses);
    
    } catch {
        document.getElementById("error").innerHTML = "<p>Något gick fel, prova igen senare!</p>";
    }
};

function displayCourses(courses) {
    const coursesEl = document.getElementById("courses-list");

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

function sortByCode() {
    courses.sort((a, b) => (a.code > b.code) ? 1 : -1);
}

function sortByName() {
    courses.sort((a, b) => (a.coursename > b.coursename) ? 1 : -1);
}

function sortByProgression() {
    courses.sort((a, b) => (a.progression > b.progression) ? 1 : -1);
}