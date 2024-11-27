//------------------------save Field -----------------------------------
document.getElementById('saveField').addEventListener("click",function (){
     // const field_code=document.getElementById('fieldCode').value;
    const field_name=document.getElementById('fieldName').value;
    const location=document.getElementById('fieldLocation').value;
    const extent_size=document.getElementById('fieldSize').value;
    const field_image1=document.getElementById('fieldImage01').files[0];
    const field_image2=document.getElementById('fieldImage02').files[0];

    if( !field_name || !location || !extent_size || !field_image1 ){
        alert("Please fill in all required fields ! ");
        return;
    }
    const formData = new FormData();
    // formData.append("fieldCode",field_code);
    formData.append("fieldName",field_name);
    formData.append("extentSize",extent_size);
    formData.append("location",location);
    formData.append("fieldImage_01",field_image1);
   formData.append("fieldImage_02",field_image2);

    fetch("http://localhost:5050/cropManagement/api/v1/field" ,{
        method:"POST",
        body:formData,
        headers:{

        }
    })
        .then(response => {
            if (response.ok) {
                alert("field saved successfully!");
            } else {
                alert("Error saving field: " + response.statusText);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while saving the field.");
        });

    console.log(field_name,location,extent_size,field_image1,field_image2);
    console.log(formData)

})


//------------------------- search by id -------------------
document.getElementById("fieldSearch").addEventListener("click",function (){
    const fieldCode = document.getElementById("fieldCode").value;
    if(!fieldCode){
        alert("Please enter the field ID")
        return;
    }
    fetch(`http://localhost:5050/cropManagement/api/v1/field/${fieldCode}`, {
        method: "GET"
    })

        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("Field not found.");
                }
                throw new Error("Failed to fetch field.");
            }
            return response.json();
        })
        .then(field => {
            // Populate the form with fetched crop details
            showFieldForm();
            document.getElementById("fieldName").value = field.field_code;
            document.getElementById("fieldLocation").value = field.location;
            document.getElementById("fieldSize").value = field.extent_size;
            document.getElementById("fieldImage01").files[0]= field.field_image1;
            document.getElementById("fieldImage02").files[0] = field.field_image2;

            console.log("field details loaded successfully.");

        })
        .catch(error => {
            console.error("Error fetching field:", error);
            alert(error.message);
        });
})
































function loadAllFields() {
    fetch("http://localhost:5050/cropManagement/api/v1/field", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => {
            if (response.ok) {
                return response.json(); // Parse the response as JSON
            } else {
                throw new Error("Failed to fetch fields: " + response.statusText);
            }
        })
        .then(fields => {
            const fieldsTableBody = document.getElementById("fieldsTable").querySelector("tbody");
            fieldsTableBody.innerHTML = ""; // Clear existing table rows

            fields.forEach(field => {
                const row = fieldsTableBody.insertRow();
                row.insertCell(0).innerText = field.fieldCode; // Ensure these match backend response fields
                row.insertCell(1).innerText = field.fieldName;
                row.insertCell(2).innerText = field.location;
                row.insertCell(3).innerText = field.extentSize;

                // Image preview
                // const imgCell1 = row.insertCell(4);
                // const img1 = document.createElement("img");
                // img1.src = `data:image/jpeg;base64,${field.fieldImage_01}`;
                // img1.alt = "Field Image 01";
                // img1.style.maxWidth = "100px";
                // img1.style.maxHeight = "100px";
                // img1.style.objectFit = "cover";
                // imgCell1.appendChild(img1);

                // const imgCell2 = row.insertCell(5);
                // const img2 = document.createElement("img");
                // img2.src = `data:image/jpeg;base64,${field.fieldImage_02}`;
                // img2.alt = "Field Image 02";
                // img2.style.maxWidth = "100px";
                // img2.style.maxHeight = "100px";
                // img2.style.objectFit = "cover";
                // imgCell2.appendChild(img2);

                // Action buttons
                const actionsCell = row.insertCell(6);
                actionsCell.innerHTML = `
                    <button class="btn btn-primary btn-sm edit-btn" data-id="${field.fieldCode}">Edit</button>
                    <button class="btn btn-danger btn-sm delete-btn" data-id="${field.fieldCode}">Delete</button>
                `;
            });

            attachDeleteEventListeners();

            console.log("Fields table updated!");
        })
        .catch(error => {
            console.error("Error loading fields:", error);
            alert("Failed to load fields. Please try again.");
        });
}
// document.addEventListener("DOMContentLoaded",loadAllFields)