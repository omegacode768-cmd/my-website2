const output = document.getElementById("output");
const buttons = document.querySelectorAll(".actionBtn");
const statusEl = document.getElementById("status");
const analysisEl = document.getElementById("analysis");
const btnSound = document.getElementById("btnSound");

// Tombol interaktif
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const msg = btn.getAttribute("data-msg");
        typeEffect(msg, output);

        // Update mini dashboard
        statusEl.textContent = "Online";
        analysisEl.textContent = "Aktif";

        // Mainkan suara klik
        btnSound.currentTime = 0;
        btnSound.play();

        // Reset dashboard setelah beberapa detik
        setTimeout(() => {
            statusEl.textContent = "Online";
            analysisEl.textContent = "Idle";
        }, 3000);
    });
});

// Efek typing
function typeEffect(text, element) {
    element.innerHTML = "";
    let i = 0;
    const interval = setInterval(() => {
        if(i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
        }
    }, 50);
}

// Background canvas futuristik
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const particleCount = 100;

function initParticles() {
    particles = [];
    for(let i=0; i<particleCount; i++){
        particles.push({
            x: Math.random()*canvas.width,
            y: Math.random()*canvas.height,
            r: Math.random()*3 + 1,
            dx: (Math.random()-0.5)*1.5,
            dy: (Math.random()-0.5)*1.5
        });
    }
}
initParticles();

function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = "#00ffea";
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if(p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if(p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});