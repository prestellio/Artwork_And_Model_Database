

window.onload == updateTable();

async function updateTable() {

    try {
        // Fetch the data from Flask's '/prices' route
        const response = await fetch('/prices');
        const jsonData = await response.json();

        // Get the table body element
        const thead = document.getElementById("info-thead");
        const tbody = document.getElementById("info-tbody");

        thead.innerHTML = '';
        tbody.innerHTML = '';

        // Loop through the data and create table rows
        const headerRow = document.createElement('tr');
        //Loop through table headers
        jsonData.headers.forEach( header => {
            const th = document.createElement('th');
            th.innerHTML = header;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow)


        //Loop through table data
        let i = 0;
        jsonData.data.forEach( row => {
            const newRow = document.createElement('tr');
            row.forEach(cell => {
                const td = document.createElement('td');
                td.innerHTML = cell;
                newRow.appendChild(td);
            });
            tbody.appendChild(newRow);
        });
        console.log('Prices table loaded.')

    } catch (error) {
        console.error('Error fetching data:', error);
    }

}


