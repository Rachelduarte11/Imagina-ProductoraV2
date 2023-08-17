//CONTADOR DE TRIUNFOS
// Función para animar el contador
function animateCounter(target, startValue, endValue, duration) {
    const range = endValue - startValue;
    const increment = range / duration;
    let current = startValue;
  
    const counterInterval = setInterval(() => {
      current += increment;
      target.textContent = Math.round(current);
  
      if (current >= endValue) {
        target.textContent = endValue;
        clearInterval(counterInterval);
      }
    }, 1);
  }
// Función para comprobar si el contador está en la pantalla
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  function handleCounterAnimation(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetValue = parseInt(entry.target.textContent);
        animateCounter(entry.target, 0, targetValue, 650); 
        observer.unobserve(entry.target); // Dejar de observar el elemento después de animarlo
      }
    });
  }
  
  // Crear un IntersectionObserver para los elementos con clase 'counter'
  const counters = document.querySelectorAll('#counter');
  const counterObserver = new IntersectionObserver(handleCounterAnimation, {
    threshold: 0.2 // Umbral de intersección: 0.2 (20% del elemento visible en la pantalla)
  });
  
  // Observar los elementos con clase 'counter'
  counters.forEach(counter => counterObserver.observe(counter));

  