from flask import Flask, jsonify, render_template
from crud import RunQuery
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

if __name__ == '__main__':
    sfapp.run(debug=True)





