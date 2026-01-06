function updateCountdown() {
    const targetDate = new Date("January 1, 2025 00:00:00").getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference < 0) return;

        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = String(d).padStart(2, '0');
        document.getElementById("hours").innerText = String(h).padStart(2, '0');
        document.getElementById("minutes").innerText = String(m).padStart(2, '0');
        document.getElementById("seconds").innerText = String(s).padStart(2, '0');
        
    }
    setInterval(updateCountdown, 1000);
    updateCountdown();

    const canvas = document.getElementById("fireworksCanvas");
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            const angle = Math.random() * Math.PI * 2;
            const force = Math.random() * 5 + 2;
            this.velocity = { x: Math.cos(angle) * force, y: Math.sin(angle) * force };
            this.alpha = 1;
            this.decay = Math.random() * 0.15 + 0.15;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
        update() {
            this.velocity.y += 0.05; 
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.alpha -= this.decay;
        }
    }

    function createFirework(x, y) {
        const colors = ['#ff0040', '#ff8000', '#ffff00', '#00ff40'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        for (let i = 0; i < 30; i++) {
            particles.push(new Particle(x, y, color));
        }
    }

    function animate() {
        ctx.fillStyle = "rgba(10, 10, 10, 0.2)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        particles = particles.filter(p => p.alpha > 0);
        particles.forEach(p => { p.update(); p.draw(); });
        if (Math.random() < 0.05) {
            createFirework(Math.random() * canvas.width, Math.random() * canvas.height * 0.5);
        }
        requestAnimationFrame(animate);
    }
    animate();
