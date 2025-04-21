from flask import Flask, jsonify, render_template, request, redirect, url_for
from crud import *
import sqlite3

# flask --app hello.py run
# to start application temp server

# Sci-fi and Fantasy app - Flask connection
sfapp = Flask(__name__, static_folder='static')

# When the user navigates to '/' ...
@sfapp.route("/")
def HomePageRender():   # Renders the main HTML page
    return render_template('index.html')


# Executes the provided file (usually my sql files)
def ExecuteSQLFile(fileName):
    with open(fileName, 'r') as file:
        sqlInstruc = file.read()
    
    conn = sqlite3.connect('database.db') # Navigate the database
    cursor = conn.cursor()

    cursor.executescript(sqlInstruc)  # Execute instructions
    conn.commit()
    conn.close()

# Create tables and insert data into db
if __name__ == '__main__':
    # Only execute if tables don't already exist
    try:
        ExecuteSQLFile('create.sql')
        ExecuteSQLFile('insert.sql')
    except Exception as e:
        print("Error executing SQL files:", e)

    sfapp.run(debug=True)


# Runs query to database
@sfapp.route('/prices')
def GetPrices():
    pricesNames, pricesData = RunQuery("SELECT * FROM prices;")

    prices = {
        "headers": pricesNames,
        "data": pricesData
    }

    return jsonify(prices)  # Display data as JSON


@sfapp.route('/tableUpdate', methods=['GET'])
def GetData():
    table = request.args.get('table')
    fieldNames, fieldData = RunQuery(f"SELECT * FROM {table};")

    data = {
        "headers": fieldNames,
        "data": fieldData
    }

    return jsonify(data)  # Display data as JSON

@sfapp.route('/insert', methods=['POST'])
def InsertValues():
    table = request.form.get('form_name')
    values = (request.form.get('input1'), request.form.get('input2'), request.form.get('input3'), request.form.get('input4'), request.form.get('input5'))

    InsertData(table, values)

    #GetPrices()
    return redirect(url_for('HomePageRender'))


@sfapp.route('/delete', methods=['POST'])
def DeleteRow():
    table = request.form.get('form_name')
    #values = (request.form.get('delete1'), request.form.get('delete2'), request.form.get('delete3'), request.form.get('delete4'), request.form.get('delete5'))
    valueList = [value for value in request.form.values()]

    table = valueList[1]
    values = valueList[2:]

    checkedValues = []
    checkedFields = []


    # Checking for empty values so the the function will know
    for index, item in enumerate(values):
        if item != "":
            checkedValues.append(item)
            checkedFields.append(index)


    DeleteData(table, checkedFields, checkedValues)

    return redirect(url_for('HomePageRender'))


@sfapp.route('/update', methods=['POST'])
def UpdateRow():
    idvalue = request.form.get('update-id')
    value = request.form.get('update-price')

    UpdateData(idvalue, value)

    return redirect(url_for('HomePageRender'))

@sfapp.route('/read', methods=['GET'])
def ReadRow():
    idvalue = request.args.get('read')

    pricesNames, pricesData = ReadData(idvalue)

    prices = {
        "headers": pricesNames,
        "data": pricesData
    }

    return jsonify(prices)  # Display data as JSON




if __name__ == '__main__':
    sfapp.run(debug=True)









