

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

        jsonHeaders = jsonData.headers;
        jsonBody = jsonData.data

        // Loop through the data and create table rows
        const headerRow = document.createElement('tr');
        //Loop through table headers
        jsonHeaders.forEach( header => {
            const th = document.createElement('th');
            th.innerHTML = header;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow)


        //Loop through table data
        let i = 0;
        jsonBody.forEach( row => {
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
        tableValue.setAttribute("name", "form_name");
        tableValue.setAttribute("value", tableName);

        form.appendChild(tableValue);

        //Starts to loop through column names and adding input and labels
        let count = 1;

        jsonHeaders.forEach( column => {
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


        // Delete Inputs
        form = document.getElementById('deleteValues');
        form.innerHTML = '';

        //Creates hidden input with table name
        tableValue = document.createElement('input');
        tableValue.setAttribute("type", "hidden");
        tableValue.setAttribute("id", "form_name");
        tableValue.setAttribute("name", "form_name");
        tableValue.setAttribute("value", tableName);

        form.appendChild(tableValue);

        //Starts to loop through column names and adding input and labels
        count = 1;

        jsonHeaders.forEach( column => {
            let label = document.createElement('label');
            let input = document.createElement('input');
            let br1 = document.createElement('br');
            let br2 = document.createElement('br');
            let br3 = document.createElement('br');

            label.setAttribute("for", `delete${count}`);
            label.innerHTML = `${column}:`;

            input.setAttribute("type", "text");
            input.setAttribute("id", `delete${count}`);
            input.setAttribute("name", `delete${count}`);
            input.setAttribute("placeholder", `${column}`);

            form.appendChild(label);
            form.appendChild(br1);

            form.appendChild(input);
            form.appendChild(br2);
            form.appendChild(br3);

            count += 1;
        });

        // Form button appened
        button = document.createElement('button');
        button.setAttribute("type", "submit");
        button.setAttribute("id", "delete-submit");
        button.innerHTML = "Delete Row(s)";

        form.appendChild(button);


        // Update Inputs
        UpdateUpdateSection(jsonHeaders, tableName)

        // Read Inputs (form in this case is a div)
        UpdateReadSection(jsonHeaders, tableName)


    } catch (error) {
        console.error('Error fetching data:', error);
    }

}

// END UpdateTable() --------------------------------------------------

function UpdateUpdateSection(jsonHeaders, tableName) {
    let form = document.getElementById('updateValues');
    form.innerHTML = '';

    //Creates hidden input with table name
    let hiddenInput = document.createElement('input');
    hiddenInput.setAttribute("type", "hidden");
    hiddenInput.setAttribute("id", "form_name");
    hiddenInput.setAttribute("name", "form_name");
    hiddenInput.setAttribute("value", tableName);

    form.appendChild(hiddenInput);

    //Creates Selection
    let selectLabel = document.createElement('label');
    let brElem1 = document.createElement('br');
    let brElem2 = document.createElement('br');
    let brElem3 = document.createElement('br');
    let select = document.createElement('select');

    selectLabel.setAttribute("for", "field-select");
    selectLabel.innerHTML = "Update Field:";

    select.setAttribute("name", "field-select");
    select.setAttribute("id", "field-select");


    jsonHeaders.forEach( column => {
        let option = document.createElement('option');
        option.setAttribute("value", column);
        option.innerHTML = column;
        select.appendChild(option);
    });

    form.appendChild(selectLabel);
    form.appendChild(brElem1);
    form.appendChild(select);
    form.appendChild(brElem2);
    form.appendChild(brElem3);


    //Adds the input for the value that will be used in the update
    let newValueLabel = document.createElement('label');
    brElem1 = document.createElement('br');
    brElem2 = document.createElement('br');
    brElem3 = document.createElement('br');
    let newValueInput = document.createElement('input');

    newValueLabel.setAttribute("for", "updateValue");
    newValueLabel.innerHTML = "With Value:";

    newValueInput.setAttribute("type", "text");
    newValueInput.setAttribute("for", "updateValue");
    newValueInput.setAttribute("name", "updateValue");


    form.appendChild(newValueLabel);
    form.appendChild(brElem1);
    form.appendChild(newValueInput);
    form.appendChild(brElem2);
    form.appendChild(brElem3);

    let para = document.createElement('p');
    brElem1 = document.createElement('br');

    para.textContent = "Where columns are:";

    form.appendChild(para);
    form.appendChild(brElem1);

    let count = 1;

    //Starts to loop through column names and adding input and labels for WHERE clause
    jsonHeaders.forEach( head => {
        let label = document.createElement('label');
        let input = document.createElement('input');
        let br1 = document.createElement('br');
        let br2 = document.createElement('br');
        let br3 = document.createElement('br');

        label.setAttribute("for", `update${count}`);
        label.innerHTML = `${head}:`;

        input.setAttribute("type", "text");
        input.setAttribute("id", `update${count}`);
        input.setAttribute("name", `update${count}`);
        input.setAttribute("placeholder", `${head}`);

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
    button.setAttribute("id", "update-submit");
    button.innerHTML = "Update Row(s)";

    form.appendChild(button);
}

function UpdateReadSection(jsonHeaders, tableName) {
    
    let form = document.getElementById('readValues');
    form.innerHTML = '';

    //Creates hidden input with table name
    let hiddenInput = document.createElement('input');
    hiddenInput.setAttribute("type", "hidden");
    hiddenInput.setAttribute("id", "form_name_r");
    hiddenInput.setAttribute("value", tableName);

    form.appendChild(hiddenInput);

    //Starts to loop through column names and adding input and labels
    let count = 1;

    jsonHeaders.forEach( column => {
        let label = document.createElement('label');
        let input = document.createElement('input');
        let br1 = document.createElement('br');
        let br2 = document.createElement('br');
        let br3 = document.createElement('br');

        label.setAttribute("for", `read${count}`);
        label.innerHTML = `${column}:`;

        input.setAttribute("type", "text");
        input.setAttribute("id", `read${count}`);
        input.setAttribute("name", `read${count}`);
        input.setAttribute("placeholder", `${column}`);

        form.appendChild(label);
        form.appendChild(br1);

        form.appendChild(input);
        form.appendChild(br2);
        form.appendChild(br3);

        count += 1;
    });

    let input = document.createElement('input');
    input.setAttribute("type", "hidden");
    input.setAttribute("id", "read-count");
    input.setAttribute("value", `${count-1}`);

    form.appendChild(input);

    // Form button appened
    let button = document.createElement('button');
    button.setAttribute("onclick", "UpdateTableWithQuery()");
    button.setAttribute("id", "read-submit");
    button.innerHTML = "Send Query";

    form.appendChild(button);
}


async function UpdateTableWithQuery() {

    try {

        let tableName = document.getElementById('form_name_r').value;
        let fieldCount = document.getElementById('read-count').value;
        let argument = `/read?table=${tableName}&`;

        for (i = 1; i <= fieldCount; i++){
            let name = "read" + i;
            let element = document.getElementById(`${name}`).value;
            argument = argument + name + "=" + element;
            if(i != fieldCount){
                argument = argument + "&";
            }
        }

        const response = await fetch(argument);
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
        console.log('Table loaded.')

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

