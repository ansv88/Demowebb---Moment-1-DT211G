"use strict" ;

// Variabler
const toggleBtn = document.querySelector('.toggle-btn');
const toggleBtnIcon = document.querySelector('.toggle-btn i');
const dropDownMenu = document.querySelector('.dropdown-menu');

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