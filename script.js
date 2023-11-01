const junctionsData = [
    { name: 'Anna Junction', status: 'Free', color: 'green' },
    { name: 'Round Ana', status: 'Congested', color: 'red' },
    { name: 'Example Junction', status: 'Free', color: 'green' },
    
];


function displayJunctions() {
    const junctionsContainer = document.getElementById('junctions');

    junctionsData.forEach((junction, index) => {
        const junctionDiv = document.createElement('div');
        junctionDiv.className = 'junction';
        junctionDiv.innerHTML = `
            <h3>${junction.name}</h3>
            <p>Status: <span id="status${index}" style="color: ${junction.color}">${junction.status}</span></p>
        `;
        junctionsContainer.appendChild(junctionDiv);
    });
}


function updateJunctionStatuses() {
    junctionsData.forEach((junction, index) => {

        const newStatus = Math.random() < 0.5 ? 'Free' : 'Congested';
        const statusSpan = document.getElementById(`status${index}`);


        statusSpan.style.opacity = 0;
        setTimeout(() => {
            statusSpan.textContent = newStatus;
            statusSpan.style.color = newStatus === 'Free' ? 'green' : 'red';
            statusSpan.style.opacity = 1;
        }, 500);

        junction.status = newStatus;
        junction.color = newStatus === 'Free' ? 'green' : 'red';
    });

    setTimeout(updateJunctionStatuses, 5000);
}

function updateTrafficStatus() {
    const trafficLight1 = document.getElementById('traffic-light-1');
    const trafficLight2 = document.getElementById('traffic-light-2');
    const sensor1 = document.getElementById('sensor-1');
    const sensor2 = document.getElementById('sensor-2');
    const camera1 = document.getElementById('camera-1');


    trafficLight1.addEventListener('change', updateStatusBasedOnTrafficLights);
    trafficLight2.addEventListener('change', updateStatusBasedOnTrafficLights);
    sensor1.addEventListener('change', updateStatusBasedOnSensors);
    sensor2.addEventListener('change', updateStatusBasedOnSensors);
    camera1.addEventListener('change', updateStatusBasedOnCameras);

    function updateStatusBasedOnTrafficLights() {

        const selectedStatus1 = trafficLight1.value;
        const selectedStatus2 = trafficLight2.value;

        const newTrafficStatus = determineOverallStatus(selectedStatus1, selectedStatus2);


        const junctionToUpdate = junctionsData[0]; // Assuming you want to update a specific junction
        junctionToUpdate.status = newTrafficStatus;
        const statusSpan = document.getElementById('status0');
        statusSpan.textContent = junctionToUpdate.status;
        statusSpan.style.color = junctionToUpdate.status === 'Free' ? 'green' : 'red';
    }

    function updateStatusBasedOnSensors() {

    
        const sensor1 = document.getElementById('sensor-1');
        const sensor2 = document.getElementById('sensor-2');
    
        if (sensor1.checked || sensor2.checked) {

            updateTrafficStatus('Congested');
        } else {

            updateTrafficStatus('Free');
        }
    }
    
    function updateStatusBasedOnCameras() {
    
        const camera1 = document.getElementById('camera-1');
    
        if (camera1.value === 'on') {

            updateTrafficStatus('Congested');
        } else {

            updateTrafficStatus('Free');
        }
    }
    

    function updateTrafficStatus(newStatus) {
     
        const junctionToUpdate = junctionsData[0];
        junctionToUpdate.status = newStatus;
        const statusSpan = document.getElementById('status0');
        statusSpan.textContent = junctionToUpdate.status;
        statusSpan.style.color = junctionToUpdate.status === 'Free' ? 'green' : 'red';
    }
    

    function determineOverallStatus(status1, status2) {

        if (status1 === 'red' || status2 === 'red') {
            return 'Congested';
        } else {
            return 'Free';
        }
    }
}


displayJunctions();

// Call the function to update junction statuses with smoother animation
updateJunctionStatuses();

// Call the function to update traffic status based on control panel inputs
updateTrafficStatus();
