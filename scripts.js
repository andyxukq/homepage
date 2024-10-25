document.addEventListener('DOMContentLoaded', function() {
    // insert all style-linked a tags with a span
    document.querySelectorAll('.styled-link').forEach(function(link) {
        link.innerHTML = '<span data-content="'+link.innerHTML+'">' + link.innerHTML + '</span>';
    });
    //append utm_source to all links
    document.querySelectorAll('a').forEach(function(link) {
        if (link.href.indexOf('http') === 0 && link.href.indexOf('kqxu.com') < 0 && link.href.indexOf('127.0.0.1') < 0 && link.href.indexOf('/') > 0) {
            link.href += (link.href.indexOf('?') > 0 ? '&' : '?') + 'utm_source=kqxu.com';
            link.setAttribute('target', '_blank');
        }
    });
    window.addEventListener('scroll', function() {
        var script = document.createElement('script');
        script.onload = TopologyFinale;
        script.src = "assets/three.min.js";
        document.head.appendChild(script);
        window.removeEventListener('scroll', arguments.callee);
    });

    const scrollThreshold = document.getElementById("scrollMenuThreshold").getBoundingClientRect().top + window.scrollY;
    const scrollMenu = document.getElementById("scrollMenu");

    window.addEventListener("scroll", () => {
        if (window.scrollY > scrollThreshold) {
            scrollMenu.style.transform = "translateY(0)"; // Slide menu in
        } else {
            scrollMenu.style.transform = "translateY(-100%)"; // Slide menu out
        }
    });
});
function TopologyFinale() {
    const canvas = document.getElementById("topologyCanvas");
    const sketch = function(p) {
        let width = canvas.offsetWidth;
        let height = canvas.offsetHeight;
        let offset = 100;

        let flow_cell_size = 8;
        let noise_size = 0.003; // noise_size controls the overall scale of the noise field across the canvas. It affects how quickly the flow directions change from one point to another.
        let noise_radius = 0.1; // noise_radius controls the local gradient by determining how far around each grid point the noise is sampled to compute flow vectors. It influences the sharpness of changes in flow direction around each point.
        let flow_width = (width + offset * 2) / flow_cell_size;
        let flow_height = (height + offset * 2) / flow_cell_size;
        let flow_grid = [];
        let number_of_particles = 2500;
        let particles = [];

        let num_angles = 100;
        let cos_vals = [];
        let sin_vals = [];
        for (let i = 0; i < num_angles; i++) {
            let angle = i / num_angles * p.TAU; // p.TAU = 2 * PI
            cos_vals[i] = p.cos(angle);
            sin_vals[i] = p.sin(angle);
        }

        p.setup = function() {
            p.createCanvas(width, height, canvas);
            p.background('#fff');
            p.smooth();
            p.noStroke();
            //p.blendMode(p.OVERLAY);
            p.frameRate(60);
            init_particles();
            init_flow();
        };

        let tick = 0;
        p.draw = function() {
            p.translate(-offset, -offset);
            //if (tick < 10) {display_flow()};
            update_particles();
            display_particles();
            tick += 1;
            if (tick >= 2000) {p.noLoop(); }
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

                prt.vel
                    .add(prt.acc)
                    .normalize()
                    .mult(2.2);

                //prt.acc = p5.Vector.fromAngle(p.noise(prt.seed * 10, tick) * p.TAU).mult(0.01);
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

        function calculate_flow(x, y, r) {; 
            let high_val = 0;
            let low_val = 1;
            let high_pos = p.createVector(0, 0);
            let low_pos = p.createVector(0, 0);
            let pos = p.createVector(0, 0);  // Create 'pos' once and reuse it
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
            p.stroke(137, 150, 78, 5);
            for (let i = 0; i < particles.length; i++) {
                if (p5.Vector.dist(particles[i].prev, particles[i].pos) < 10)
                    p.line(particles[i].prev.x, particles[i].prev.y, particles[i].pos.x, particles[i].pos.y);
            }
        }

        function display_flow() {
            for (let i = 0; i < flow_grid.length; i++) {
              for (let j = 0; j < flow_grid[i].length; j++) {
                p.strokeWeight(1)
                p.stroke(100, 100, 100, 5)
                p.noFill()
                p.ellipse(j * flow_cell_size, i * flow_cell_size, 7, 7)
                p.line(
                  j * flow_cell_size,
                  i * flow_cell_size,
                  j * flow_cell_size + flow_grid[i][j].x * 50,
                  i * flow_cell_size + flow_grid[i][j].y * 50
                )
              }
            }
          }

        function mod(x, n) {
            return x % n;
        }
    };
    new p5(sketch);
}
