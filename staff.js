document.getElementById('saveStaff').addEventListener("click",function (){
    console.log("clicked")
    const id=document.getElementById("staffId").value;
    const first_name=document.getElementById("firstName").value;
    const last_name=document.getElementById("lastName").value;
    const designation=document.getElementById("designation").value;
    const gender=document.getElementById("gender").value;
    const joined_date=document.getElementById("joinedDate").value;
    const dob=document.getElementById("dob").value;
    const contact_no=document.getElementById("contact").value;
    const email=document.getElementById("email").value;
    const address=document.getElementById("line01").value;
    const role=document.getElementById("role").value;

    if(!id || !first_name || !last_name || !designation || !gender || !joined_date || !dob || !contact_no || !email || !address || !role){
            alert("Please fill in all required fields")
    }


    const staffData = {
        id: id,
        first_name: first_name,
        last_name: last_name,
        designation: designation,
        gender: gender,
        joined_date: joined_date,
        dob: dob,
        contact_no: contact_no,
        email: email,
        address: address,
        role: role
    };

    fetch("http://localhost:5050/cropManagement/api/v1/staff", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(staffData)
    })
        .then(response => {
            if (response.ok) {
                alert("Staff saved successfully!");
                // Optionally, you can refresh the staff list or clear the form
            } else {
                throw new Error("Error saving staff: " + response.statusText);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while saving the staff.");
        });
    console.log(id,first_name,last_name,designation,gender,joined_date,dob,contact_no,email,address,role)
})






//------------load for table--------------------------------------------------
function loadAllStaff(){
    fetch("http://localhost:5050/cropManagement/api/v1/staff", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response=>{
            if(response.ok){
                return response.json()
            }else{
                throw new Error("Failed to fetch staff :"+response.statusText)
            }
        })
        .then(staffs=>{
            const  staffTableBody=document.getElementById("staffTable").querySelector("tbody");
            staffTableBody.innerHTML="";
            staffs.forEach(staff=>{
                let row = staffTableBody.insertRow();
                row.insertCell(0).innerText=staff.id;
                row.insertCell(1).innerText=staff.first_name;
                row.insertCell(2).innerText=staff.last_name;
                row.insertCell(3).innerText=staff.designation;
                row.insertCell(4).innerText=staff.gender;
                row.insertCell(5).innerText=staff.joined_date;
                row.insertCell(6).innerText=staff.dob;
                row.insertCell(7).innerText=staff.contact_no;
                row.insertCell(8).innerText=staff.email;
                row.insertCell(9).innerText=staff.address;
                row.insertCell(10).innerText=staff.role;

                let actionsCell = row.insertCell(11);
                actionsCell.innerHTML = `
                    <button class="btn btn-primary btn-sm edit-btn" data-id="${staff.id}">Edit</button>
                    <button class="btn btn-danger btn-sm delete-btn" data-id="${staff.id}" id="deletebtn">Delete</button>
                `;
            });

            console.log("staff table updated!");
        })
        .catch(error => {
           console.error("Error loading staff:", error);
           alert("Failed to load staff. Please try again.");
        });

}
document.addEventListener("DOMContentLoaded",loadAllStaff);



//----------------------------------search by id-----------------------
document.getElementById("searchStaff").addEventListener("click",function (){
    const id = document.getElementById("staffCode").value;
    if(!id){
        alert("Please enter the Staff ID");
        return;
    }
    fetch(`http://localhost:5050/cropManagement/api/v1/staff/${id}`,{
        method:"GET"
    })
        .then(response=>{
            if(!response.ok){
                if (response.status===404){
                    throw new Error("Staff not found .");
                }
                throw new Error("Failed to fetch staff .");
            }
            return response.json();
        })
        .then(staff=>{
            showStaffForm();
            document.getElementById("staffId").value=staff.id;
            document.getElementById("firstName").value=staff.first_name;
            document.getElementById("lastName").value=staff.last_name;
            document.getElementById("designation").value=staff.designation;
            document.getElementById("gender").value=staff.gender;
            document.getElementById("joinedDate").value=staff.joined_date;
            document.getElementById("dob").value=staff.dob;
            document.getElementById("contact").value=staff.contact_no;
            document.getElementById("email").value=staff.email;
            document.getElementById("line01").value=staff.address;
            document.getElementById("role").value=staff.role;

            console.log("Staff detail loaded successfully .")
        })
        .catch(error => {
            console.error("Error fetching staff:", error);
            alert(error.message);
        });
})