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