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
        title: "Kekacauan di Force!",
        text: "Isi semua field terlebih dahulu, Padawan.",
        icon: "warning",
        customClass: {
          popup: "swal2-starwars",
        },
        confirmButtonText: "Baik, Master.",
      });
      return;
    }

    submitButton.disabled = true;

    emailjs
      .sendForm("service_m1s0aee", "template_2dqg7x5", form)
      .then(() => {
        Swal.fire({
          title: "Berhasil",
          text: "Pesanmu berhasil dikirim",
          icon: "success",
          customClass: {
            popup: "swal2-starwars",
          },
          confirmButtonText: "Lanjutkan",
        }).then(() => {
          form.reset();
          updateURL();
        });
      })
      .catch((error) => {
        console.error("Gagal mengirim pesan:", error);
        Swal.fire({
          title: "Kegagalan Sistem Galaksi!",
          text: "Pesan gagal dikirim. Sith kecewa padamu.",
          icon: "error",
          customClass: {
            popup: "swal2-starwars",
          },
          confirmButtonText: "Coba lagi, Stormtrooper.",
        });
      })
      .finally(() => {
        submitButton.disabled = false;
      });
  });
});
