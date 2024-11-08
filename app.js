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

// Load the home page initially
navigateTo('home');


function showFieldForm() {
    $('#fieldFormModal').modal('show');
}

function showCropForm() {
    $('#cropFormModal').modal('show');
}








function addField() {
    const fieldCode = document.getElementById('fieldCode').value;
    const fieldName = document.getElementById('fieldName').value;
    const fieldLocation = document.getElementById('fieldLocation').value;
    const fieldSize = document.getElementById('fieldSize').value;
    const fieldImage01 = document.getElementById('fieldImage01').value;
    const fieldImage02 = document.getElementById('fieldImage02').value;

    // Here you would normally save the crop data to a database
    console.log('Crop Added:', { fieldCode, fieldName, fieldLocation, fieldSize, fieldImage01,fieldImage02 });

    // Close the modal and reset form
    $('#fieldFormModal').modal('hide');
    document.getElementById('cropForm').reset();
}

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