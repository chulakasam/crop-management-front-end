function loadStaffID() {
    const comboBox = document.getElementById("s_id");

    fetch("http://localhost:5050/cropManagement/api/v1/staff", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch staff IDs: " + response.statusText);
            }
            return response.text(); // Get raw text response
        })
        .then(data => {
            console.log("Raw response data:", data);

            // Parse JSON after verifying the response
            const staffs = JSON.parse(data);

            // Clear existing options
            comboBox.innerHTML = '<option value="" disabled selected>Select Staff ID</option>';

            // Append staff IDs as options to the combo box
            staffs.forEach(staff => {
                const option = document.createElement("option");
                option.value = staff.id; // Use the staff ID as the value
                option.textContent = staff.id; // Display the staff ID
                comboBox.appendChild(option);
            });
            console.log("Staff IDs loaded successfully!");
        })
        .catch(error => {
            console.error("Error loading staff IDs:", error);
            comboBox.innerHTML = '<option value="" disabled>Error loading data</option>';
        });
}
document.addEventListener("DOMContentLoaded", loadStaffID);
document.addEventListener("DOMContentLoaded", loadCropID);
document.addEventListener("DOMContentLoaded", loadVehicle);

function loadCropID() {
    const comboBox = document.getElementById("c_id");

    fetch("http://localhost:5050/cropManagement/api/v1/crop", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch crop IDs: " + response.statusText);
            }
            return response.text(); // Get raw text response
        })
        .then(data => {
            console.log("Raw response data:", data);

            // Parse JSON after verifying the response
            const crops = JSON.parse(data);

            // Clear existing options
            comboBox.innerHTML = '<option value="" disabled selected>Select Crop ID</option>';

            // Append staff IDs as options to the combo box
            crops.forEach(crop => {
                const option = document.createElement("option");
                option.value = crop.crop_code; // Use the staff ID as the value
                option.textContent = crop.crop_code; // Display the staff ID
                comboBox.appendChild(option);
            });
            console.log("Crop IDs loaded successfully!");
        })
        .catch(error => {
            console.error("Error loading Crop IDs:", error);
            comboBox.innerHTML = '<option value="" disabled>Error loading data</option>';
        });
}

function loadVehicle() {
    const comboBox = document.getElementById("v_id");

    fetch("http://localhost:5050/cropManagement/api/v1/vehicles", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch Vehicle IDs: " + response.statusText);
            }
            return response.text(); // Get raw text response
        })
        .then(data => {
            console.log("Raw response data:", data);

            // Parse JSON after verifying the response
            const vehicles = JSON.parse(data);

            // Clear existing options
            comboBox.innerHTML = '<option value="" disabled selected>Select Vehicle ID</option>';

            // Append staff IDs as options to the combo box
            vehicles.forEach(vehicle => {
                const option = document.createElement("option");
                option.value = vehicle.vehicle_code; // Use the staff ID as the value
                option.textContent = vehicle.vehicle_code; // Display the staff ID
                comboBox.appendChild(option);
            });
            console.log("Vehicle IDs loaded successfully!");
        })
        .catch(error => {
            console.error("Error loading Vehicle IDs:", error);
            comboBox.innerHTML = '<option value="" disabled>Error loading data</option>';
        });
}


//------------------save monitoring log ------------------------------------------
document.getElementById('saveLogs').addEventListener('click',function (){
    const logDate=document.getElementById('logDate').value;
    const logDetails=document.getElementById('logDetails').value;
   const logImage=document.getElementById('logImage').files[0];

   if(!logDetails || !logImage || !logDate){
       alert("Please fill in all fields required")
       return
   }
   const formData = new FormData();
   formData.append("logDate",logDate);
   formData.append("logDetails",logDetails);
   formData.append("observedImage",logImage);


    fetch("http://localhost:5050/cropManagement/api/v1/logs", {
        method: "POST",
        body: formData,
        headers: {

        }
    })
        .then(response => {
            if (response.ok) {
                alert("Log saved successfully!");
                loadAllCrops();

            } else {
                alert("Error saving log: " + response.statusText);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while saving the log.");
        });
})