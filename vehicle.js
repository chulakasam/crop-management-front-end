
// ---------------------------------------save vehicle ------------------------------------------------
document.getElementById('saveVehicle').addEventListener("click",function (){
    const vehicle_code=document.getElementById("vehicleCode").value;
    const licensePlateNumber=document.getElementById("licenseNo").value;
    const fuelType=document.getElementById("fuelType").value;
    const vehicleCategory=document.getElementById("vCategory").value;
    const remarks=document.getElementById("remark").value;
    const status=document.getElementById("status").value;
    const assigned_staff=document.getElementById("staffComboBox").value;

    if(!vehicle_code || !licensePlateNumber || !fuelType || !vehicleCategory || !remarks || !status || !assigned_staff){
        alert("Please fill in all required fields");
    }

    const vehicleData={

        vehicle_code:vehicle_code,
        licensePlateNumber:licensePlateNumber,
        fuelType:fuelType,
        vehicleCategory:vehicleCategory,
        remarks:remarks,
        status:status,
        assigned_staff:{
            id:assigned_staff}
    };
    fetch("http://localhost:5050/cropManagement/api/v1/vehicles", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(vehicleData)
    })
        .then(response => {
            if (response.ok) {
                alert("Vehicle saved successfully!");
            } else {
                throw new Error("Error saving vehicle: " + response.statusText);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while saving the vehicle.");
        });
    //console.log(vehicle_code,license_plate_number,fuel_type,vehicle_category,remark,status,id)

})

// -------------------------------------------load all staff id---------------------------------------------------------


function loadStaffIDs() {
    const comboBox = document.getElementById("staffComboBox");

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


// Load staff IDs when the page is fully loaded
document.addEventListener("DOMContentLoaded", loadStaffIDs);
