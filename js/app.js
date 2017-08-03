

particlesJS('particles-js',
  
  {
    "particles": {
      "number": {
        "value": 110,
        "density": {
          "enable": true,
          "value_area": 400
        }
      },
      "color": {
        "value": "#000000"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 5,
          "color": "#F57F17"
        },
        "polygon": {
          "nb_sides": 9
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 2,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 0.5,
          "opacity_min": 1,
          "sync": true
        }
      },
      "size": {
        "value": 1,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 3,
          "size_min": 0.5,
          "sync": true
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 100,
        "color": "#ffffff",
        "opacity": 0.3,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 0.4,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": true,
          "rotateX": 250,
          "rotateY": 250
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 100,
          "line_linked": {
            "opacity": 2
          }
        },
        "bubble": {
          "distance": 100,
          "size": 30,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 100
        },
        "push": {
          "particles_nb": 1
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    "config_demo": {
      "hide_card": true,
      "background_color": " #4caf50",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
  }

);