/* ====================================================================
   ANGEL EARTHWORKS WEBSITE — JS
   Minimal, no dependencies, no tracking.
   ==================================================================== */

// Submit quote form — opens user's email client with details pre-filled
function submitQuoteForm(e) {
    e.preventDefault();
    var form = e.target;
    var get = function(id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : '';
    };

    var name = get('qf-name');
    var phone = get('qf-phone');
    var email = get('qf-email');
    var location = get('qf-location');
    var service = get('qf-service');
    var timing = get('qf-timing');
    var details = get('qf-details');

    var subject = 'Quote Request — ' + (name || 'Website') + (location ? ' (' + location + ')' : '');

    var body =
        'Name: ' + name + '\n' +
        'Phone: ' + phone + '\n' +
        (email ? 'Email: ' + email + '\n' : '') +
        (location ? 'Location: ' + location + '\n' : '') +
        'Service: ' + service + '\n' +
        'Timing: ' + timing + '\n\n' +
        '--- Job Details ---\n' + details + '\n\n' +
        '(Sent via angelearthworksandcivil.com.au quote form)';

    var mailto = 'mailto:info@angelearthworksandcivil.com.au' +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

    window.location.href = mailto;

    // Show a thank you state on the form
    setTimeout(function() {
        form.innerHTML = '<div style="text-align:center;padding:60px 20px">' +
            '<div style="font-family:var(--font-display);font-size:48px;color:var(--color-orange);line-height:1;margin-bottom:16px">✓</div>' +
            '<h2 style="font-family:var(--font-display);font-size:32px;text-transform:uppercase;line-height:1;margin-bottom:16px;color:var(--color-text)">Sent!</h2>' +
            '<p style="color:var(--color-text-dim);font-size:15px;max-width:300px;margin:0 auto 24px">' +
            'Your email app should have opened. Just hit send and we&apos;ll come back to you within 24 hours.</p>' +
            '<p style="font-family:var(--font-mono);font-size:11px;color:var(--color-text-mute);text-transform:uppercase;letter-spacing:0.15em">' +
            'Or call us · 0447 099 712</p>' +
            '</div>';
    }, 500);

    return false;
}

// Close mobile drawer when clicking a nav link
document.addEventListener('DOMContentLoaded', function() {
    var drawer = document.getElementById('drawer');
    if (drawer) {
        var links = drawer.querySelectorAll('a');
        links.forEach(function(link) {
            link.addEventListener('click', function() {
                drawer.classList.remove('open');
            });
        });
    }

    // Header scroll effect
    var header = document.querySelector('.site-header');
    if (header) {
        var lastScroll = 0;
        window.addEventListener('scroll', function() {
            var s = window.pageYOffset;
            if (s > 50) {
                header.style.borderBottomColor = 'var(--color-orange)';
            } else {
                header.style.borderBottomColor = 'var(--color-border)';
            }
            lastScroll = s;
        }, { passive: true });
    }

    // Animate stats counting up on scroll
    var stats = document.querySelectorAll('.stat__num');
    if (stats.length && 'IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(20px)';
                    setTimeout(function() {
                        el.style.transition = 'all 0.8s';
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, 50);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.2 });
        stats.forEach(function(s) { observer.observe(s); });
    }
});

// Escape key closes drawer
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        var drawer = document.getElementById('drawer');
        if (drawer) drawer.classList.remove('open');
    }
});
