

window.onload == updateTable();

async function updateTable() {

    try {
        // Fetch the data from Flask's '/get-data' route
        const response = await fetch('/get-data');
        const data = await response.json();

        // Get the table body element
        //const thead = document.getElementById("info-thead");
        const tbody = document.getElementById("info-tbody");

        //thead.innerHTML = '';
        tbody.innerHTML = '';
        // Loop through the data and create table rows

        data.forEach(row => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${row[0]}</td>
                <td>${row[1]}</td>
                <td>${row[2]}</td>
            `;
            tbody.appendChild(newRow);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    thead.innerHTML = "This is the new content!";
}



    <script>
        // Function to fetch data from Flask and update the table
        async function updateTable() {
            
        }

        // Automatically fetch and update table on page load
        window.onload = updateTable;
    </script>

