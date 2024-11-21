

document.getElementById("saveCrop").addEventListener("click", function () {
    const cropCode = document.getElementById("cropCode").value;
    const commonName = document.getElementById("cropName").value;
    const scienceName = document.getElementById("scientificName").value;
    const category = document.getElementById("category").value;
    const season = document.getElementById("season").value;
    const cropImage = document.getElementById("image").files[0];
   // Validate inputs (optional)
    if (!cropCode || !commonName || !scienceName || !cropImage) {
        alert("Please fill in all required fields!");
        return;
    }

    const formData = new FormData();
    formData.append("cropCode", cropCode);
    formData.append("cropName", commonName);
    formData.append("scientificName", scienceName);
    formData.append("category", category);
    formData.append("season", season);
    formData.append("image", cropImage);

    fetch("http://localhost:5050/cropManagement/api/v1/crop", {
        method: "POST",
        body: formData,
        headers: {

        }
    })
        .then(response => {
            if (response.ok) {
                alert("Crop saved successfully!");

            } else {
                alert("Error saving crop: " + response.statusText);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while saving the crop.");
        });
    console.log("clicked");
});
