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
