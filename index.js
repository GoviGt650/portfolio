 // Preloader Script
 $(window).on("load", function () {
    // Hide the preloader after the page is fully loaded
    $(".preloader").fadeOut("slow", function () {
        // Show the main content
        $(".container-fluid").fadeIn("slow");
    });
});

// Cursor Script
let innerCursor = document.querySelector(".inner-cursor");
let outerCursor = document.querySelector(".outer-cursor");

document.addEventListener("mousemove", moveCursor);

function moveCursor(e) {
    let x = e.clientX;
    let y = e.clientY;

    innerCursor.style.left = `${x}px`;
    innerCursor.style.top = `${y}px`;
    outerCursor.style.left = `${x}px`;
    outerCursor.style.top = `${y}px`;
}

// Preloader Animation Script
$(document).ready(function () {
    var counter = 0;

    // Start the changing images
    setInterval(function () {
        if (counter == 9) {
            counter = 0;
        }
        changeImage(counter);
        counter++;
    }, 5000); // Change images every 3 seconds

    // Set the percentage off
    loading();
});

function changeImage(counter) {
    var images = [
        '<i class="fa-solid fa-jet-fighter" style="color: #000000;"></i>',
        '<i class="fa-solid fa-gamepad" style="color: #000000;"></i>',
        '<i class="fa-solid fa-headphones" style="color: #000000;"></i>',
        '<i class="fa-solid fa-cubes" style="color: #000000;"></i>',
        '<i class="fa-solid fa-paw"></i>',
        '<i class="fa-solid fa-rocket" style="color: #000000;"></i>',
        '<i class="fa-solid fa-ticket"></i>',
        '<i class="fa-solid fa-pie-chart"></i>',
        '<i class="fa-solid fa-codepen"></i>'
    ];

    $(".loader .image").html("" + images[counter] + "");
}

function loading() {
    var num = 0;

    for (i = 0; i <= 100; i++) {
        setTimeout(function () {
            $('.loader span').html(num + '%');
            num++;
        }, i * 10); // Reduced delay for faster loading
    }
}





const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

const texts = [
    "Welcome",
    "I am",
    "GOVIND JADAPALLI",
    "a passionate",
     "Web Developer",
    ":)"
   
];

const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}

function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }

        doMorph();
    } else {
        doCooldown();
    }
}

animate();




const toggleButton = document.querySelector('.toggle-button');
const navLinks = document.querySelector('.nav-links');

toggleButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});




var typing=new Typed(".text", {
    strings: ["OVIND JADAPALLI"],
    typeSpeed: 100,
    backSpeed: 40,
    loop: true,
});
