document.addEventListener("DOMContentLoaded", function () {
    // Inisialisasi EmailJS setelah DOM siap
    emailjs.init("okyksMBrSIxlG56cy");

    const form = document.getElementById("contactForm");

    if (form) {
        // Fungsi untuk update URL berdasarkan input
        function updateURL() {
            const formData = new FormData(form);
            const params = new URLSearchParams(formData).toString();
            history.replaceState(null, "", "?" + params);
        }

        // Event listener untuk update URL secara real-time saat user mengetik
        form.querySelectorAll("input, textarea").forEach((input) => {
            input.addEventListener("input", updateURL);
        });

        // Jika ada data di URL, isi formulir secara otomatis
        const params = new URLSearchParams(window.location.search);
        params.forEach((value, key) => {
            if (form[key]) form[key].value = value;
        });

        // Event submit untuk mengirim formulir
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Cegah reload

            const submitButton = form.querySelector("button[type='submit']");
            submitButton.disabled = true; // Cegah klik ganda

            emailjs.sendForm("service_m1s0aee", "template_2dqg7x5", form)
                .then(response => {
                    Swal.fire({
                        title: "Berhasil!",
                        text: "Pesan berhasil dikirim!",
                        icon: "success",
                        confirmButtonText: "OK"
                    }).then(() => {
                        form.reset(); // Reset form
                        updateURL(); // Hapus query dari URL setelah submit
                        submitButton.disabled = false;
                    });
                })
                .catch(error => {
                    Swal.fire({
                        title: "Gagal!",
                        text: "Gagal mengirim pesan, coba lagi nanti.",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                    console.error("Gagal mengirim pesan:", error);
                    submitButton.disabled = false;
                });
        });
    } else {
        console.error("Formulir tidak ditemukan. Pastikan ID 'contactForm' ada di HTML.");
    }
});
