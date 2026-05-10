/* ============================================================
   ARRIVING TRAVELS — Main JavaScript
   Author: Elite Web Agency | Version: 1.0.0
   ============================================================ */

'use strict';

/* ── Page Loader ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('page-loader');
    if (loader) loader.classList.add('hidden');
  }, 1400);
});

/* ── Sticky Navbar ── */
const navbar = document.getElementById('navbar');
const handleScroll = () => {
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  // Scroll-to-top
  const btn = document.getElementById('scroll-top');
  if (btn) btn.classList.toggle('visible', window.scrollY > 400);
};
window.addEventListener('scroll', handleScroll, { passive: true });

/* ── Active Nav Link ── */
const setActiveNavLink = () => {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    a.classList.toggle('active', href === current);
  });
};
setActiveNavLink();

/* ── Hamburger / Mobile Menu ── */
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ── AOS (Animate On Scroll) ── */
const initAOS = () => {
  const elements = document.querySelectorAll('[data-aos]');
  if (!elements.length) return;

  const delays = {};
  elements.forEach(el => {
    delays[el] = parseInt(el.dataset.aosDelay || '0', 10);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.aosDelay || '0', 10);
        setTimeout(() => el.classList.add('aos-animate'), delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
};
initAOS();

/* ── Counter Animation ── */
const animateCounters = () => {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      let current = 0;
      const increment = Math.ceil(target / 60);
      const timer = setInterval(() => {
        current = Math.min(current + increment, target);
        el.textContent = prefix + current.toLocaleString() + suffix;
        if (current >= target) clearInterval(timer);
      }, 25);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => obs.observe(c));
};
animateCounters();

/* ── FAQ Accordion ── */
const initFAQ = () => {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      // Toggle clicked
      if (!isOpen) item.classList.add('open');
    });
  });
};
initFAQ();

/* ── Testimonials Drag-to-Scroll ── */
const initTestimonialSlider = () => {
  const track = document.querySelector('.testimonials-track');
  if (!track) return;

  let isDown = false, startX, scrollLeft;

  track.addEventListener('mousedown', e => {
    isDown = true;
    track.classList.add('dragging');
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });
  track.addEventListener('mouseleave', () => { isDown = false; track.classList.remove('dragging'); });
  track.addEventListener('mouseup', () => { isDown = false; track.classList.remove('dragging'); });
  track.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    track.scrollLeft = scrollLeft - (x - startX) * 1.5;
    updateDots();
  });

  // Touch support
  let touchStart;
  track.addEventListener('touchstart', e => { touchStart = e.touches[0].clientX; scrollLeft = track.scrollLeft; }, { passive: true });
  track.addEventListener('touchmove', e => {
    const diff = touchStart - e.touches[0].clientX;
    track.scrollLeft = scrollLeft + diff;
    updateDots();
  }, { passive: true });

  // Dots
  const dots = document.querySelectorAll('.t-dot');
  const cards = track.querySelectorAll('.testimonial-card');
  const updateDots = () => {
    const idx = Math.round(track.scrollLeft / (cards[0]?.offsetWidth + 24 || 404));
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  };
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      track.scrollTo({ left: i * ((cards[0]?.offsetWidth || 380) + 24), behavior: 'smooth' });
      dots.forEach((d, j) => d.classList.toggle('active', i === j));
    });
  });
};
initTestimonialSlider();

/* ── Contact Form ── */
const initContactForm = () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    // Simulate async send
  
const templateParams = {
  full_name: document.getElementById('full-name').value,
  phone: document.getElementById('phone').value,
  email: document.getElementById('email').value,
  service: document.getElementById('service').value,
  travel_date: document.getElementById('travel-date').value,
  travel_time: document.getElementById('travel-time').value,
  pickup: document.getElementById('pickup').value,
  drop: document.getElementById('drop').value,
  passengers: document.getElementById('passengers').value,
  luggage: document.getElementById('luggage').value,
  vehicle: document.querySelector('input[name="vehicle"]:checked')?.value || "",
  message: document.getElementById('message').value,
  source: document.getElementById('source').value
};

emailjs.send(
  "service_mrlblt8",
  "template_curnbsi",
  templateParams
)
.then(() => {
  form.style.display = 'none';

  const success = document.getElementById('form-success');

  if (success) {
    success.style.display = 'block';
  }
})
.catch((error) => {
  console.error("EmailJS Error:", error);
  alert("Failed to send enquiry.");
});

  });
};
initContactForm();

/* ── Scroll-to-Top ── */
const scrollTopBtn = document.getElementById('scroll-top');
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── Smooth Page Transitions ── */
document.querySelectorAll('a[href$=".html"], a[href=""]').forEach(link => {
  if (link.hostname !== window.location.hostname) return;
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('https://wa.me')) return;
    e.preventDefault();
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    setTimeout(() => window.location.href = href, 300);
  });
});
window.addEventListener('pageshow', () => {
  document.body.style.opacity = '1';
});

/* ── Parallax Hero ── */
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroBg.style.transform = `scale(1) translateY(${scrolled * 0.3}px)`;
    }
  }, { passive: true });
}

/* ── Image Gallery Lightbox ── */
const initGallery = () => {
  const items = document.querySelectorAll('[data-lightbox]');
  if (!items.length) return;

  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,0.95);z-index:9000;
    display:none;align-items:center;justify-content:center;cursor:zoom-out;
  `;
  lightbox.innerHTML = `
    <img id="lb-img" style="max-width:90vw;max-height:90vh;object-fit:contain;border:1px solid rgba(212,175,55,0.3);">
    <button id="lb-close" style="position:absolute;top:20px;right:30px;color:#D4AF37;font-size:2rem;background:none;border:none;cursor:pointer;">✕</button>
  `;
  document.body.appendChild(lightbox);

  items.forEach(item => {
    item.style.cursor = 'zoom-in';
    item.addEventListener('click', () => {
      document.getElementById('lb-img').src = item.src || item.dataset.lightbox;
      lightbox.style.display = 'flex';
    });
  });

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox || e.target.id === 'lb-close') lightbox.style.display = 'none';
  });
};
initGallery();