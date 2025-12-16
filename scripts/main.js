console.log("main.js loaded successfully!");

/* This JavaScript was generated with help from GitHub Copilot
	 in response to the prompt "make it so white snow particles fall from the top of the screen to the bottom" - 12/16/2025 */

document.addEventListener('DOMContentLoaded', () => {
	// Create and insert the canvas used for snow particles
	const canvas = document.createElement('canvas');
	canvas.className = 'snow-canvas';
	document.body.appendChild(canvas);
	const ctx = canvas.getContext('2d');

	// Handle HiDPI screens — use setTransform to avoid cumulative scaling
	let dpr = window.devicePixelRatio || 1;
	function resize() {
		dpr = window.devicePixelRatio || 1;
		canvas.width = Math.ceil(window.innerWidth * dpr);
		canvas.height = Math.ceil(window.innerHeight * dpr);
		canvas.style.width = window.innerWidth + 'px';
		canvas.style.height = window.innerHeight + 'px';
		// Set transform explicitly to map CSS pixels to device pixels
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
	}

	window.addEventListener('resize', () => {
		resize();
	});
	resize();

	// Particle setup
	const particles = [];
	const maxParticles = 120; // adjust density

	function rand(min, max) {
		return Math.random() * (max - min) + min;
	}

	for (let i = 0; i < maxParticles; i++) {
		particles.push({
			x: rand(0, window.innerWidth),
			y: rand(-window.innerHeight, window.innerHeight),
			r: rand(0.6, 3.2),
			speed: rand(0.3, 1.6),
			drift: rand(-0.5, 0.5),
			sway: rand(0.01, 0.03),
			phase: rand(0, Math.PI * 2),
			alpha: rand(0.6, 1)
		});
	}

	let lastTime = performance.now();

	function update(dt) {
		for (const p of particles) {
			p.phase += p.sway * dt * 0.06;
			p.x += p.drift + Math.sin(p.phase) * 0.3;
			p.y += p.speed * dt * 0.06;
			if (p.y - p.r > window.innerHeight) {
				p.y = -p.r;
				p.x = rand(0, window.innerWidth);
			}
			if (p.x < -50) p.x = window.innerWidth + 50;
			if (p.x > window.innerWidth + 50) p.x = -50;
		}
	}

	function draw() {
		// Clear using CSS-pixel dimensions so the previous frame is fully removed
		ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
		ctx.save();
		ctx.fillStyle = '#fff';
		for (const p of particles) {
			ctx.globalAlpha = p.alpha;
			ctx.beginPath();
			ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
			ctx.fill();
		}
		ctx.restore();
	}

	function frame(now) {
		const dt = Math.min(60, now - lastTime);
		lastTime = now;
		update(dt);
		draw();
		requestAnimationFrame(frame);
	}

	requestAnimationFrame(frame);
});


// select items in the redgreen class
// and add a span around each character
// so we can color them individually
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.redgreen');
  elements.forEach(el => {
    const text = el.textContent;
    const newHTML = Array.from(text).map((char) => {
      // Only wrap letters in spans, skip spaces, punctuation, etc.
      if (/[a-zA-Z]/.test(char)) {
      return `<span>${char}</span>`;
      }
      return char;
    }).join('');
    el.innerHTML = newHTML;
  });
});