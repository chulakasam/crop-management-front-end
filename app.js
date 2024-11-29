// Navigation Function
function navigateTo(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach((page) => {
        page.classList.remove('active');
    });

    // Show the selected page
    document.getElementById(pageId).classList.add('active');

    // Load data based on the page
    if (pageId === 'fields') loadFields();
    else if (pageId === 'crops') loadCrops();
    else if (pageId === 'staff') loadStaff();
    else if (pageId === 'vehicles') loadVehicles();
    else if (pageId === 'equipment') loadEquipment();
    else if (pageId === 'logs') loadMonitoringLog();
}

// Sample data loading function for each section
function loadFields() {
    document.getElementById('field-list').innerHTML = `
    <p>Loading field data...</p>
  `;
    // Simulating an API call
    setTimeout(() => {
        document.getElementById('field-list').innerHTML = `
      <ul>
        <li>Field 1 - Location: North Plot, Size: 1000 sqm</li>
        <li>Field 2 - Location: East Plot, Size: 1500 sqm</li>
      </ul>
    `;
    }, 500);
}

function loadCrops() {
    document.getElementById('crop-list').innerHTML = `
    <p>Loading crop data...</p>
  `;
    // Simulating an API call
    setTimeout(() => {
        document.getElementById('crop-list').innerHTML = `
      <ul>
        <li>Crop: Wheat - Growth Stage: Early</li>
        <li>Crop: Corn - Growth Stage: Mid</li>
      </ul>
    `;
    }, 500);
}

function loadStaff() {
    document.getElementById('staff-list').innerHTML = `
    <p>Loading staff data...</p>
  `;
    // Simulating an API call
    setTimeout(() => {
        document.getElementById('staff-list').innerHTML = `
      <ul>
        <li>John Doe - Role: Field Manager</li>
        <li>Jane Smith - Role: Crop Specialist</li>
      </ul>
    `;
    }, 500);
}

function loadVehicles() {
    document.getElementById('vehicle-list').innerHTML = `
    <p>Loading vehicle data...</p>
  `;
    // Simulating an API call
    setTimeout(() => {
        document.getElementById('vehicle-list').innerHTML = `
      <ul>
        <li>Vehicle 1 - Type: Tractor</li>
        <li>Vehicle 2 - Type: Harvester</li>
      </ul>
    `;
    }, 500);
}

function loadEquipment() {
    document.getElementById('equipment-list').innerHTML = `
    <p>Loading equipment data...</p>
  `;
    // Simulating an API call
    setTimeout(() => {
        document.getElementById('equipment-list').innerHTML = `
      <ul>
        <li>Plow - Usage: Field Preparation</li>
        <li>Seeder - Usage: Sowing Seeds</li>
      </ul>
    `;
    }, 500);
}
function loadMonitoringLog() {
    document.getElementById('log-list').innerHTML = `
    <p>Loading monitoring log data...</p>
  `;
    // Simulating an API call
    setTimeout(() => {
        document.getElementById('log-list').innerHTML = `
      <ul>
        <li> Usage: Logs Preparation</li>
        <li> Usage: monitoring details</li>
      </ul>
    `;
    }, 500);
}

// Load the home page initially
navigateTo('home');


function showFieldForm() {
    $('#fieldFormModal').modal('show');
}

function showCropForm() {
    $('#cropFormModal').modal('show');
}

function showStaffForm() {
    $('#staffFormModal').modal('show');
}
function showVehicleForm() {
    $('#vehicleFormModal').modal('show');
}
function showEquipmentForm() {
    $('#equipmentFormModal').modal('show');
}
function showLogForm() {
    $('#logFormModal').modal('show');
}







// function addField() {
//     const fieldCode = document.getElementById('fieldCode').value;
//     const fieldName = document.getElementById('fieldName').value;
//     const fieldLocation = document.getElementById('fieldLocation').value;
//     const fieldSize = document.getElementById('fieldSize').value;
//     const fieldImage01 = document.getElementById('fieldImage01').value;
//     const fieldImage02 = document.getElementById('fieldImage02').value;
//
//     // Here you would normally save the crop data to a database
//     console.log('Field Added:', { fieldCode, fieldName, fieldLocation, fieldSize, fieldImage01,fieldImage02 });
//
//     // Close the modal and reset form
//     $('#fieldFormModal').modal('hide');
//     document.getElementById('fieldForm').reset();
// }

function addCrop() {
    const cropCode = document.getElementById('cropCode').value;
    const cropName = document.getElementById('cropName').value;
    const scientificName = document.getElementById('scientificName').value;
    const season = document.getElementById('season').value;
    const category = document.getElementById('category').value;
    const image = document.getElementById('image').value;
    const field_code = document.getElementById('field_code').value;

    // Here you would normally save the crop data to a database
    console.log('Crop Added:', { cropCode,cropName, scientificName, season, category, image,field_code });

    // Close the modal and reset form
    $('#cropFormModal').modal('hide');
    document.getElementById('cropForm').reset();
}

function addStaff() {
    const staffId = document.getElementById('staffId').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const designation = document.getElementById('designation').value;
    const gender = document.getElementById('gender').value;
    const joinedDate = document.getElementById('joinedDate').value;
    const dob = document.getElementById('dob').value;
    const contact = document.getElementById('contact').value;
    const email = document.getElementById('email').value;
    const line01 = document.getElementById('line01').value;
    const line02 = document.getElementById('line02').value;
    const line03 = document.getElementById('line03').value;
    const line04 = document.getElementById('line04').value;

    // Here you would normally save the crop data to a database
    console.log('Staff Added:', { staffId,firstName, lastName, designation, gender, joinedDate,dob,contact,email,line01,line02,line03,line04 });

    // Close the modal and reset form
    $('#cropFormModal').modal('hide');
    document.getElementById('staffForm').reset();
}

function addVehicle() {
    const vehicleCode = document.getElementById('vehicleCode').value;
    const licenseNo = document.getElementById('licenseNo').value;
    const fuelType = document.getElementById('fuelType').value;
    const vCategory = document.getElementById('vCategory').value;
    const remark = document.getElementById('remark').value;
    const status = document.getElementById('status').value;

    // Here you would normally save the crop data to a database
    console.log('Vehicle Added:', { vehicleCode,licenseNo, fuelType, vCategory, remark,status });

    // Close the modal and reset form
    $('#vehicleFormModal').modal('hide');
    document.getElementById('vehicleForm').reset();
}
function addEquipment() {
    const equipmentId = document.getElementById('equipmentId').value;
    const name = document.getElementById('name').value;
    const type = document.getElementById('type').value;
    const equipmentStatus = document.getElementById('equipmentStatus').value;
    const code = document.getElementById('code').value;
    const staff_id = document.getElementById('staff_id').value;

    // Here you would normally save the crop data to a database
    console.log('Equipment Added:', { equipmentId,name, type, equipmentStatus,code,staff_id});

    // Close the modal and reset form
    $('#vehicleFormModal').modal('hide');
    document.getElementById('equipmentForm').reset();
}

function addLog() {
    const logId = document.getElementById('logId').value;
    const observation = document.getElementById('observation').value;
    const logImage = document.getElementById('logImage').value;
    const logDate = document.getElementById('logDate').value;
    const f_Code = document.getElementById('f_Code').value;
    const s_id = document.getElementById('s_id').value;
    const c_id= document.getElementById('c_id').value;
    const v_id = document.getElementById('v_id').value;

    // Here you would normally save the crop data to a database
    console.log('Monitoring Log Added:', { logId,observation, logImage, logDate,f_Code,s_id,c_id,v_id});

    // Close the modal and reset form
    $('#logFormModal').modal('hide');
    document.getElementById('logForm').reset();
}




// Data and configurations for charts

// Bar Chart - Field Data
const barCtx = document.getElementById('barChart').getContext('2d');
const barChart = new Chart(barCtx, {
    type: 'bar',
    data: {
        labels: ['Field 1', 'Field 2', 'Field 3', 'Field 4'],
        datasets: [{
            label: 'Field Size (acres)',
            data: [10, 15, 20, 25],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }],
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
});

// Line Chart - Crop Growth Trends
const lineCtx = document.getElementById('lineChart').getContext('2d');
const lineChart = new Chart(lineCtx, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [{
            label: 'Crop Growth (%)',
            data: [10, 20, 30, 40, 50],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            fill: true,
        }],
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
});

// Pie Chart - Equipment Usage
const pieCtx = document.getElementById('pieChart').getContext('2d');
const pieChart = new Chart(pieCtx, {
    type: 'pie',
    data: {
        labels: ['Plows', 'Tractors', 'Seeders', 'Harvesters'],
        datasets: [{
            data: [25, 20, 30, 25],
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
            ],
        }],
    },
    options: {
        responsive: true,
    },
});

// Function to update data dynamically
function updateChartData(chart, data) {
    chart.data.datasets[0].data = data;
    chart.update();
}

// Example: Updating data after 3 seconds
setTimeout(() => {
    updateChartData(barChart, [12, 18, 22, 28]);
    updateChartData(lineChart, [15, 25, 35, 45, 55]);
    updateChartData(pieChart, [20, 25, 25, 30]);
}, 3000);





document.addEventListener("DOMContentLoaded", function() {
    populateTables();
});

function populateTables() {



    const staff = [
        { id: "S001", firstName: "John", lastName: "Doe", designation: "Manager", role: "MANAGER" },
        { id: "S002", firstName: "Jane", lastName: "Smith", designation: "Scientist", role: "SCIENTIST" },
    ];

    // Populate Fields Table
    // const fieldsTable = document.getElementById("fieldsTable").querySelector("tbody");
    // fields.forEach(field => {
    //     let row = fieldsTable.insertRow();
    //     row.insertCell(0).innerText = field.code;
    //     row.insertCell(1).innerText = field.name;
    //     row.insertCell(2).innerText = field.location;
    //     row.insertCell(3).innerText = field.fieldSize;
    //     row.insertCell(4).innerText = field.staff;
    // });

    // // Populate Crops Table
    // const cropsTable = document.getElementById("cropsTable").querySelector("tbody");
    // crops.forEach(crop => {
    //     let row = cropsTable.insertRow();
    //     row.insertCell(0).innerText = crop.code;
    //     row.insertCell(1).innerText = crop.commonName;
    //     row.insertCell(2).innerText = crop.scientificName;
    //     row.insertCell(3).innerText = crop.category;
    //     row.insertCell(4).innerText = crop.season;
    //     row.insertCell(5).innerText = crop.action;
    // });
    //
    // const crops = [
    //
    // ];








    // Populate Staff Table
    const staffTable = document.getElementById("staffTable").querySelector("tbody");
    staff.forEach(person => {
        let row = staffTable.insertRow();
        row.insertCell(0).innerText = person.id;
        row.insertCell(1).innerText = person.firstName;
        row.insertCell(2).innerText = person.lastName;
        row.insertCell(3).innerText = person.designation;
        row.insertCell(4).innerText = person.role;
    });
}
