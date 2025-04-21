import sqlite3


def RunQuery(query):

    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute(query)

    fieldNames = [description[0] for description in cursor.description]

    result = cursor.fetchall()
    conn.commit()
    conn.close()

    return fieldNames, result

def GetFields(table):
    print(table)
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    sql = f"SELECT * FROM {table}"
    cursor.execute(sql)

    fieldNames = [description[0] for description in cursor.description]

    conn.close()

    return fieldNames

    # conn = sqlite3.connect('your_database.db')
    # cursor = conn.cursor()

    # cursor.execute(f"PRAGMA table_info({table})")

    # # Extract column names from the query result
    # columns = [row[1] for row in cursor.fetchall()]

    # conn.close()

    # return columns

def InsertData(table, values):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    numVal = "("

    for item in values:
        numVal += "?,"

    numVal = numVal[:-1]
    numVal += ")"
    

    sql = f"""INSERT INTO {table} VALUES {numVal}"""

    cursor.execute(sql, values)

    conn.commit()
    conn.close()


def DeleteData(table, checkedFields, values):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    fieldNames = GetFields(table)

    #for item in checkedFields:
        #fields = fieldNames[item]

    sql = f"DELETE FROM {table} WHERE "

    #for item in fields:
    #    sql += item + " = ?, "

    sql = sql[:-2]

    #cursor.execute(sql, values)

    conn.commit()
    conn.close()


def UpdateData(table, updateField, value, fieldsUsedInt, usedValues):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    # Gets the column names of the table and declares a list
    fields = GetFields(table)
    fieldsUsed = []

    # Adds '?, ' for every field that was found to be used ands adds the name of the field to a list
    sql = f"UPDATE {table} SET {updateField} = {value} WHERE combination_id = "
    if fieldsUsedInt.length != 0:
        for i in range(fieldsUsedInt.length-1):
            sql += "?, "
            fieldsUsed += fields[fieldsUsedInt[i]]

    # Removes ', ' from the end of the sql string
    sql = sql[:-2]

    cursor.execute(sql, usedValues)

    conn.commit()
    conn.close()


def ReadData(table, values):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    sql = "SELECT * FROM Prices WHERE combination_id = ?;"

    cursor.execute(sql, (id,))

    fieldNames = [description[0] for description in cursor.description]

    result = cursor.fetchall()
    conn.commit()
    conn.close()
    
    return fieldNames, result




