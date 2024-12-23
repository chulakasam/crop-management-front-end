document.getElementById('addEquipment').addEventListener('click',function (){
    const equipment_id = document.getElementById('equipmentId').value;
    const name=document.getElementById('name').value;
    const type=document.getElementById('type').value
    const status=document.getElementById('equipmentStatus').value;
    const assigned_field=document.getElementById('code').value;
    const assigned_staff=document.getElementById('staff_id').value;

    if(!equipment_id || !name || !type || !status || !assigned_field || !assigned_staff){
        alert("Please fill in all required fields")
    }
    const equipmentData={
        equipment_id:equipment_id,
        name:name,
        type:type,
        status:status,
        assigned_field:{field_code:assigned_field},
        assigned_staff:{id:assigned_staff}
    }
    fetch("http://localhost:5050/cropManagement/api/v1/equipment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(equipmentData)
    })
        .then(response => {
            if (response.ok) {
                alert("Equipment saved successfully!");
                loadAllEquipments();

            } else {
                throw new Error("Error saving equipment: " + response.statusText);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while saving the equipment.");
        });
    console.log("click")
})

//---------------------------------search equipment by ID ------------------------------------
function loadAllEquipments() {
    fetch("http://localhost:5050/cropManagement/api/v1/equipment", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to fetch equipment: " + response.statusText);
            }
        })
        .then(equipments => {
            const equipmentTableBody = document.getElementById("equipmentTable").querySelector("tbody");
            equipmentTableBody.innerHTML = ""; // Clear the table before adding new rows

            equipments.forEach(equipment => {
                let row = equipmentTableBody.insertRow();

                row.insertCell(0).innerText = equipment.equipment_id;
                row.insertCell(1).innerText = equipment.name;
                row.insertCell(2).innerText = equipment.type;
                row.insertCell(3).innerText = equipment.status;

                // Extract field_id and display
                const fieldId = equipment.assigned_field ? equipment.assigned_field.field_code : "N/A";
                row.insertCell(4).innerText = fieldId;

                // Extract staff_ids and display as a comma-separated list
                const staffIds = equipment.assigned_staff ?equipment.assigned_staff.id:"N/A"

                row.insertCell(5).innerText = staffIds;


                let actionsCell = row.insertCell(6);
                actionsCell.innerHTML = `
                    <button class="btn btn-primary btn-sm edit-btn" data-id="${equipment.equipment_id}">Edit</button>
                    <button class="btn btn-danger btn-sm delete-btn" data-id="${equipment.equipment_id}" id="deletebtn">Delete</button>
                `;
            });
            deleteEquipmentById();
            console.log("Equipment table updated!");
        })
        .catch(error => {
            console.error("Error loading equipment:", error);
            alert("Failed to load equipment. Please try again.");
        });
}



document.addEventListener("DOMContentLoaded",loadAllEquipments);

//----------------------search by ID -----------------------------

document.getElementById("searchEquipment").addEventListener("click",function (){
    const equipment_id = document.getElementById("searchEquId").value;
    if(!equipment_id){
        alert("Please enter the Equipment ID");
        return;
    }
    fetch(`http://localhost:5050/cropManagement/api/v1/equipment/${equipment_id}`,{
        method:"GET"
    })
        .then(response=>{
            if(!response.ok){
                if (response.status===404){
                    throw new Error("equipment not found .");
                }
                throw new Error("Failed to fetch equipment .");
            }
            return response.json();
        })
        .then(equipment=>{
            showEquipmentForm();
            document.getElementById("equipmentId").value=equipment.equipment_id;
            document.getElementById("name").value=equipment.name;
            document.getElementById("type").value=equipment.type;
            document.getElementById("equipmentStatus").value=equipment.status;
            document.getElementById("code").value=equipment.assigned_field.field_code;
           document.getElementById("staff_id").value=equipment.assigned_staff.id;

            console.log("equipment detail loaded successfully .")
        })
        .catch(error => {
            console.error("Error fetching equipment:", error);
            alert(error.message);
        });
    console.log(equipment_code)

})

// --------------- delete equipment --------------------------

function deleteEquipmentById() {
    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            const equipment_code = button.dataset.id; // Get the crop ID from the button's data-id attribute

            if (confirm(`Are you sure you want to delete vehicle ${equipment_code}?`)) {
                fetch(`http://localhost:5050/cropManagement/api/v1/equipment/${equipment_code}`, {
                    method: "DELETE",
                })
                    .then(response => {
                        if (response.ok) {
                            alert("equipment deleted successfully!");
                            loadAllVehicle(); // Reload the table after successful deletion
                        } else {
                            alert("Failed to delete equipment. It may not exist.");
                        }
                    })
                    .catch(error => {
                        console.error("Error:", error);
                        alert("An error occurred while deleting the equipment.");
                    });
            }
        });
    });
}