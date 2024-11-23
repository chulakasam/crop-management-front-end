
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
                loadAllVehicle();
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



//-----------------------------load all vehicle-------------------

function loadAllVehicle(){
    fetch("http://localhost:5050/cropManagement/api/v1/vehicles", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response=>{
            if(response.ok){
                return response.json()
            }else{
                throw new Error("Failed to fetch vehicle :"+response.statusText)
            }
        })
        .then(vehicles=>{
            const  staffTableBody=document.getElementById("vehiclesTable").querySelector("tbody");
            staffTableBody.innerHTML="";
            vehicles.forEach(vehicle=>{
                let row = staffTableBody.insertRow();
                row.insertCell(0).innerText=vehicle.vehicle_code;
                row.insertCell(1).innerText=vehicle.licensePlateNumber;
                row.insertCell(2).innerText=vehicle.fuelType;
                row.insertCell(3).innerText=vehicle.vehicleCategory;
                row.insertCell(4).innerText=vehicle.remarks;
                row.insertCell(5).innerText=vehicle.status;
                row.insertCell(6).innerText=vehicle.assigned_staff.id;


                let actionsCell = row.insertCell(7);
                actionsCell.innerHTML = `
                    <button class="btn btn-primary btn-sm edit-btn" data-id="${vehicle.id}">Edit</button>
                    <button class="btn btn-danger btn-sm delete-btn" data-id="${vehicle.vehicle_code}" id="deletebtn">Delete</button>
                `;
            });
            deleteVehicleById();
            console.log("vehicle table updated!");
        })
        .catch(error => {
            console.error("Error loading vehicle:", error);
            alert("Failed to load vehicle. Please try again.");
        });

}
document.addEventListener("DOMContentLoaded",loadAllVehicle);



//------------------------- delete vehicle by Id ---------------------
function deleteVehicleById() {
    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            const vehicle_code = button.dataset.id; // Get the crop ID from the button's data-id attribute

            if (confirm(`Are you sure you want to delete vehicle ${vehicle_code}?`)) {
                fetch(`http://localhost:5050/cropManagement/api/v1/vehicles/${vehicle_code}`, {
                    method: "DELETE",
                })
                    .then(response => {
                        if (response.ok) {
                            alert("vehicle deleted successfully!");
                            loadAllVehicle(); // Reload the table after successful deletion
                        } else {
                            alert("Failed to delete vehicle. It may not exist.");
                        }
                    })
                    .catch(error => {
                        console.error("Error:", error);
                        alert("An error occurred while deleting the vehicle.");
                    });
            }
        });
    });
}
document.addEventListener("DOMContentLoaded",loadAllVehicle);






//--------------------------search by id -----------------------------
document.getElementById("searchVehicle").addEventListener("click",function (){
     const vehicle_code = document.getElementById("searchVehicleCode").value;
     if(!vehicle_code){
         alert("Please enter the Vehicle ID");
         return;
     }
     fetch(`http://localhost:5050/cropManagement/api/v1/vehicles/${vehicle_code}`,{
         method:"GET"
     })
        .then(response=>{
            if(!response.ok){
                if (response.status===404){
                    throw new Error("vehicle not found .");
                }
                throw new Error("Failed to fetch vehicle .");
            }
            return response.json();
        })
        .then(vehicle=>{
            showVehicleForm();
            document.getElementById("vehicleCode").value=vehicle.vehicle_code;
            document.getElementById("licenseNo").value=vehicle.licensePlateNumber;
            document.getElementById("fuelType").value=vehicle.fuelType;
            document.getElementById("vCategory").value=vehicle.vehicleCategory;
            document.getElementById("remark").value=vehicle.remarks;
            document.getElementById("status").value=vehicle.status;
            document.getElementById("staffComboBox").value=vehicle.assigned_staff.id;

            console.log("vehicle detail loaded successfully .")
        })
        .catch(error => {
            console.error("Error fetching vehicle:", error);
            alert(error.message);
        });
    console.log(vehicle_code)

})
