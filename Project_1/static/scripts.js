

window.onload == loadTable();

async function loadTable() {

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
        console.log('Table loaded.')

    } catch (error) {
        console.error('Error fetching data:', error);
    }

}



async function updateTable() {

    try {
        // Fetch the data from Flask's '/tableUpdate' route after sending input data
        let tableName = document.getElementById('table-select').value;

        const response = await fetch(`/tableUpdate?table=${tableName}`);
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
        console.log('Table loaded.')

        //Add labels and inputs depending on amount of columns
        form = document.getElementById('insertValues');
        form.innerHTML = '';

        //Creates hidden input with table name
        let tableValue = document.createElement('input');
        tableValue.setAttribute("type", "hidden");
        tableValue.setAttribute("id", "form_name");
        tableValue.setAttribute("value", tableName);

        form.appendChild(tableValue);

        //Starts to loop through column names and adding input and labels
        let count = 1;

        jsonData.headers.forEach( column => {
            let label = document.createElement('label');
            let input = document.createElement('input');
            let br1 = document.createElement('br');
            let br2 = document.createElement('br');
            let br3 = document.createElement('br');

            label.setAttribute("for", `input${count}`);
            label.innerHTML = `${column}:`;

            input.setAttribute("type", "text");
            input.setAttribute("id", `input${count}`);
            input.setAttribute("name", `input${count}`);
            input.setAttribute("placeholder", `${column}`);

            form.appendChild(label);
            form.appendChild(br1);

            form.appendChild(input);
            form.appendChild(br2);
            form.appendChild(br3);

            count += 1;
        });

        // Form button appened
        let button = document.createElement('button');
        button.setAttribute("type", "submit");
        button.setAttribute("id", "insert-submit");
        button.innerHTML = "Insert Row";

        form.appendChild(button);

    } catch (error) {
        console.error('Error fetching data:', error);
    }

}

async function updateTableWithQuery() {

    try {
        // Fetch the data from Flask's '/prices' route
        let readID = document.getElementById('read').value;

        const response = await fetch(`/read?read=${readID}`);
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

function changeOperation() {
    let operation = document.getElementById("operation-select").value;
    let forms = ["insertValues", "deleteValues", "updateValues", "readValues"];

    for (let i = 0; i < forms.length; i++) {
        let itemElement = document.getElementById(forms[i]);

        if(forms[i] == operation){itemElement.classList.remove("hidden");}
        else{itemElement.classList.add("hidden");}
    }
}



// document.addEventListener("DOMContentLoaded", function() {

//     document.getElementById("read-submit").addEventListener("click", updateTableWithQuery());

// });

