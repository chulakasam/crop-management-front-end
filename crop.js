

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
                loadAllCrops();

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



// Function to load all crops and populate the table
function loadAllCrops() {
    fetch("http://localhost:5050/cropManagement/api/v1/crop", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => {
            if (response.ok) {
                return response.json(); // Parse the response as JSON
            } else {
                throw new Error("Failed to fetch crops: " + response.statusText);
            }
        })
        .then(crops => {
            // Clear the existing table rows
            const cropsTableBody = document.getElementById("cropsTable").querySelector("tbody");
            cropsTableBody.innerHTML = "";

            // Populate the table with new data
            crops.forEach(crop => {
                let row = cropsTableBody.insertRow();
                row.insertCell(0).innerText = crop.crop_code; // Ensure these match your backend response fields
                row.insertCell(1).innerText = crop.common_name;
                row.insertCell(2).innerText = crop.scientific_name;
                row.insertCell(3).innerText=  crop.season;
                row.insertCell(4).innerText = crop.category;

                // Create an <img> tag for the crop image
                const imgCell = row.insertCell(5);
                const imgElement = document.createElement("img");
                imgElement.src = `data:image/jpeg;base64,${crop.crop_image}`; // Set Base64 string as source
                imgElement.alt = "Crop Image";
                imgElement.style.maxWidth = "100px"; // Limit image size
                imgElement.style.maxHeight = "100px";
                imgElement.style.objectFit = "cover"; // Ensure the image fits well
                imgCell.appendChild(imgElement);



                // Add action buttons
                let actionsCell = row.insertCell(6);
                actionsCell.innerHTML = `
                    <button class="btn btn-primary btn-sm edit-btn" data-id="${crop.cropCode}">Edit</button>
                    <button class="btn btn-danger btn-sm delete-btn" data-id="${crop.cropCode}">Delete</button>
                `;
            });

            console.log("Crops table updated!");
        })
        .catch(error => {
            console.error("Error loading crops:", error);
            alert("Failed to load crops. Please try again.");
        });
}

document.addEventListener("DOMContentLoaded",loadAllCrops)






















































document.getElementById("updateButton").addEventListener("click", function () {
    console.log("update clicked")
});
document.getElementById("searchCrop").addEventListener("click", function () {
    const cropId = document.getElementById("cropId").value; // Input field for Crop ID

    if (!cropId) {
        alert("Please enter a Crop ID to search!");
        return;
    }

    fetch(`http://localhost:5050/cropManagement/api/v1/crop/${cropId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json(); // Parse the response JSON
            } else {
                alert("Crop not found! Error: " + response.statusText);
                throw new Error("Crop not found");
            }
        })
        .then(data => {
            // Populate the form fields with the crop data
            document.getElementById("cropCode").value = data.cropCode;
            document.getElementById("cropName").value = data.cropName;
            document.getElementById("scientificName").value = data.scientificName;
            document.getElementById("category").value = data.category;
            document.getElementById("season").value = data.season;

            // Optionally log the data or display a success message
            console.log("Crop data loaded:", data);
            alert("Crop data loaded successfully!");
        })
        .catch(error => {
            console.error("Error:", error);
        });
});






