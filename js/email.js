document.addEventListener("DOMContentLoaded", () => {
  // Inisialisasi EmailJS
  emailjs.init("okyksMBrSIxlG56cy");

  const form = document.getElementById("contactForm");

  if (!form) {
    console.error("Formulir dengan ID 'contactForm' tidak ditemukan.");
    return;
  }

  const submitButton = form.querySelector("button[type='submit']");

  // Fungsi update URL dari form
  const updateURL = () => {
    const formData = new FormData(form);
    const params = new URLSearchParams(formData).toString();
    history.replaceState(null, "", "?" + params);
  };

  // Isi form otomatis dari URL jika ada
  const params = new URLSearchParams(window.location.search);
  for (const [key, value] of params.entries()) {
    const field = form.elements[key];
    if (field) field.value = value;
  }

  // Update URL setiap input berubah
  form.querySelectorAll("input, textarea").forEach((el) => {
    el.addEventListener("input", updateURL);
  });

  // Validasi ringan
  const validateForm = () => {
    const requiredFields = form.querySelectorAll("[required]");
    for (const field of requiredFields) {
      if (!field.value.trim()) {
        field.focus();
        return false;
      }
    }
    return true;
  };

  // Submit form
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        title: "Form tidak lengkap",
        text: "Silakan isi semua field yang wajib diisi.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    submitButton.disabled = true;

    emailjs
      .sendForm("service_m1s0aee", "template_2dqg7x5", form)
      .then(() => {
        Swal.fire({
          title: "Pesan Terkirim",
          text: "Terima kasih, pesan Anda berhasil dikirim.",
          icon: "success",
          confirmButtonText: "Tutup",
        }).then(() => {
          form.reset();
          updateURL();
        });
      })
      .catch((error) => {
        console.error("Gagal mengirim pesan:", error);
        Swal.fire({
          title: "Gagal Mengirim",
          text: "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.",
          icon: "error",
          confirmButtonText: "Tutup",
        });
      })
      .finally(() => {
        submitButton.disabled = false;
      });
  });
});
