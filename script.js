document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('formAlert').classList.remove('d-none');
    setTimeout(function() {
        document.getElementById('formAlert').classList.add('d-none');
        document.getElementById('contactForm').reset();
    }, 3000);
});
