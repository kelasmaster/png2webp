document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("fileInput");
  const uploadedImage = document.getElementById("uploadedImage");
  const convertBtn = document.getElementById("convertBtn");
  const downloadLink = document.getElementById("downloadLink");

  // Handle file selection
  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadedImage.src = e.target.result;
        uploadedImage.style.display = "block";
        convertBtn.disabled = false;
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid PNG or JPG file.");
      fileInput.value = ""; // Clear the input
    }
  });

  // Handle conversion to WebP
  convertBtn.addEventListener("click", () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = uploadedImage.src;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Convert to WebP
      canvas.toBlob(
        (blob) => {
          const url = URL.createObjectURL(blob);
          downloadLink.href = url;
          downloadLink.download = "converted-image.webp";
          downloadLink.textContent = "Download WebP";
          downloadLink.style.display = "inline-block";
        },
        "image/webp",
        0.8 // Quality (0 to 1)
      );
    };
  });
});
