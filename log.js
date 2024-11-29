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
                loadAllLogs();

            } else {
                alert("Error saving log: " + response.statusText);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while saving the log.");
        });
})

//------------------load all logs ----------------------
function loadAllLogs(){
    fetch("http://localhost:5050/cropManagement/api/v1/logs", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => {
            if (response.ok) {
                return response.json(); // Parse the response as JSON
            } else {
                throw new Error("Failed to fetch logs: " + response.statusText);
            }
        })
        .then(logs => {
            // Clear the existing table rows
            const cropsTableBody = document.getElementById("logsTable").querySelector("tbody");
            cropsTableBody.innerHTML = "";

            // Populate the table with new data
            logs.forEach(log => {
                let row = cropsTableBody.insertRow();
                row.insertCell(0).innerText = log.log_code; // Ensure these match your backend response fields
                row.insertCell(1).innerText = log.log_date;
                row.insertCell(2).innerText = log.log_details;


                // Create an <img> tag for the crop image
                const imgCell = row.insertCell(3);
                const imgElement = document.createElement("img");
                imgElement.src = `data:image/jpeg;base64,${log.observed_image}`; // Set Base64 string as source
                imgElement.alt = "log Image";
                imgElement.style.maxWidth = "100px"; // Limit image size
                imgElement.style.maxHeight = "100px";
                imgElement.style.objectFit = "cover"; // Ensure the image fits well
                imgCell.appendChild(imgElement);

                // Add action buttons
                let actionsCell = row.insertCell(4);
                actionsCell.innerHTML = `
                    <button class="btn btn-primary btn-sm edit-btn" data-id="${log.log_code}">Edit</button>
                    <button class="btn btn-danger btn-sm delete-btn" data-id="${log.log_code}" id="deletebtn">Delete</button>
                `;
            })

            DeleteLogById();
            console.log("Logs table updated!");
        })
        .catch(error => {
            console.error("Error loading Logs:", error);
            alert("Failed to load logs. Please try again.");
        });
}
document.addEventListener("DOMContentLoaded",loadAllLogs);

//------------------------ search by ID -------------------------------------------------
document.getElementById('searchLog').addEventListener('click',function (){
    const log_code = document.getElementById('searchLogCode').value;
    if(!log_code){
        alert("Please enter the log code");
        return''
    }
    fetch(`http://localhost:5050/cropManagement/api/v1/logs/${log_code}`,{
        method:"GET"
    })
        .then(response=>{
            if(!response.ok){
                if (response.status===404){
                    throw new Error("Monitoring log not found .");
                }
                throw new Error("Failed to fetch monitoring log .");
            }
            return response.json();
        })
        .then(log=>{
            showLogForm();
            document.getElementById("logDate").value=log.log_date;
            document.getElementById("logDetails").value=log.log_details;
            // document.getElementById("logImage").value=log.observed_image;
            console.log("logs detail loaded successfully .")
        })
        .catch(error => {
            console.error("Error fetching log:", error);
            alert(error.message);
        });
    console.log(log_code)

})

//-----------------------delete monitoring log ------------------------------------------

function DeleteLogById() {
    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            const log_code = button.dataset.id; // Get the crop ID from the button's data-id attribute

            if (confirm(`Are you sure you want to delete log ${log_code}?`)) {
                fetch(`http://localhost:5050/cropManagement/api/v1/logs/${log_code}`, {
                    method: "DELETE",
                })
                    .then(response => {
                        if (response.ok) {
                            alert("log deleted successfully!");
                            loadAllLogs(); // Reload the table after successful deletion
                        } else {
                            alert("Failed to delete log. It may not exist.");
                        }
                    })
                    .catch(error => {
                        console.error("Error:", error);
                        alert("An error occurred while deleting the log.");
                    });
            }
        });
    });
}
