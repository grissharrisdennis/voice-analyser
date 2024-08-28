<template>
    <div id="particles-container">
      <web-particles id="tsparticles" :options="particleOptions"></web-particles>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Particles',
    data() {
      return {
        particleOptions: {
          fps_limit: 60,
          interactivity: {
            detectsOn: "canvas",
            events: {
              onClick: { enable: true, mode: "push" },
              onHover: { enable: true, mode: "repulse" },
              resize: true
            },
            modes: {
              push: { particles_nb: 4 },
              repulse: { distance: 200, duration: 0.4 }
            }
          },
          particles: {
            color: { value: "#ffffff" },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.4,
              width: 1
            },
            move: {
              bounce: false,
              direction: "none",
              enable: true,
              outMode: "out",
              random: false,
              speed: 2,
              straight: false
            },
            number: {
              density: { enable: true, area: 800 },
              value: 80
            },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { random: true, value: 5 }
          },
          detectRetina: true
        }
      };
    },
    mounted() {
      // Ensure the custom elements are loaded
      if (!window.customElements.get('web-particles')) {
        import('https://cdn.jsdelivr.net/npm/web-particles@1.1.0/dist/web-particles.min.js');
      }
    }
  }
  </script>
  
  <style scoped>
  #particles-container {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
  
  #tsparticles {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  </style>
  