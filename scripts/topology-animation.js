/**
 * Topology canvas animation (p5.js sketch).
 * Runs only on pages that have #topologyCanvas and #personal.
 */
function initTopologyAnimation() {
	const canvas = document.getElementById('topologyCanvas');
	const personal = document.getElementById('personal');
	if (!canvas || !personal) return;

	const script = document.createElement('script');
	script.onload = runTopologySketch;
	script.src = 'assets/three.min.js';
	document.head.appendChild(script);
}

function runTopologySketch() {
	const canvas = document.getElementById('topologyCanvas');
	const personal = document.getElementById('personal');
	if (!canvas || !personal) return;

	const sketch = function(p) {
		let width = canvas.offsetWidth;
		let height = personal.offsetHeight;
		canvas.style.marginTop = (-height + 60) + 'px';
		let offset = 100;

		let flow_cell_size = 10;
		let noise_size = 0.003;
		let noise_radius = 0.05;
		let flow_width = (width + offset * 2) / flow_cell_size;
		let flow_height = (height + offset * 2) / flow_cell_size;
		let flow_grid = [];
		let number_of_particles = 2500;
		let particles = [];

		let num_angles = 100;
		let cos_vals = [];
		let sin_vals = [];
		for (let i = 0; i < num_angles; i++) {
			let angle = (i / num_angles) * p.TAU;
			cos_vals[i] = p.cos(angle);
			sin_vals[i] = p.sin(angle);
		}

		p.setup = function() {
			const seed = p.random([189, 2876, 1811, 3206, 846, 3906, 8933, 3381, 7279]);
			p.noiseSeed(seed);
			p.createCanvas(width, height, canvas);
			p.background('#fbf7f0');
			p.smooth();
			p.noStroke();
			p.frameRate(60);
			init_particles();
			init_flow();
		};

		let tick = 0;
		p.draw = function() {
			p.translate(-offset, -offset);
			update_particles();
			display_particles();
			tick += 1;
			if (tick >= 1000) p.noLoop();
		};

		function init_particles() {
			for (var i = 0; i < number_of_particles; i++) {
				let r = p.random(p.width + 2 * offset);
				let q = p.random(p.height + 2 * offset);
				particles.push({
					prev: p.createVector(r, q),
					pos: p.createVector(r, q),
					vel: p.createVector(0, 0),
					acc: p.createVector(0, 0),
					seed: i
				});
			}
		}

		function update_particles() {
			for (var i = 0; i < number_of_particles; i++) {
				let prt = particles[i];
				let flow = get_flow(prt.pos.x, prt.pos.y);

				prt.prev.x = prt.pos.x;
				prt.prev.y = prt.pos.y;

				prt.pos.x = mod(prt.pos.x + prt.vel.x, p.width + 2 * offset);
				prt.pos.y = mod(prt.pos.y + prt.vel.y, p.height + 2 * offset);

				prt.vel.add(prt.acc).normalize().mult(2.2);

				prt.acc.set(0, 0);
				prt.acc.add(flow).mult(3);
			}
		}

		function init_flow() {
			for (let i = 0; i < flow_height; i++) {
				let row = [];
				for (let j = 0; j < flow_width; j++) {
					row.push(calculate_flow(j * noise_size, i * noise_size, noise_radius));
				}
				flow_grid.push(row);
			}
		}

		function calculate_flow(x, y, r) {
			let high_val = 0;
			let low_val = 1;
			let high_pos = p.createVector(0, 0);
			let low_pos = p.createVector(0, 0);
			let pos = p.createVector(0, 0);
			for (var i = 0; i < num_angles; i++) {
				pos.set(x + cos_vals[i] * r, y + sin_vals[i] * r);
				let val = p.noise(pos.x, pos.y);
				if (val > high_val) {
					high_val = val;
					high_pos.x = pos.x;
					high_pos.y = pos.y;
				}
				if (val < low_val) {
					low_val = val;
					low_pos.x = pos.x;
					low_pos.y = pos.y;
				}
			}

			let flow_angle = p.createVector(low_pos.x - high_pos.x, low_pos.y - high_pos.y);
			flow_angle.normalize().mult(high_val - low_val);

			return flow_angle;
		}

		function get_flow(xpos, ypos) {
			xpos = p.constrain(xpos, 0, p.width + offset * 2);
			ypos = p.constrain(ypos, 0, p.height + offset * 2);
			return flow_grid[p.floor(ypos / flow_cell_size)][p.floor(xpos / flow_cell_size)];
		}

		function display_particles() {
			p.strokeWeight(1);
			p.stroke(0, 0, 0, 5);
			for (let i = 0; i < particles.length; i++) {
				if (p5.Vector.dist(particles[i].prev, particles[i].pos) < 10)
					p.line(particles[i].prev.x, particles[i].prev.y, particles[i].pos.x, particles[i].pos.y);
			}
		}

		function mod(x, n) {
			return x % n;
		}
	};

	new p5(sketch);
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initTopologyAnimation);
} else {
	initTopologyAnimation();
}
