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
    fields = []

    for item in checkedFields:
        fields.append(fieldNames[item])
        #print(f"{fieldNames[item]}\n")

    sql = f"DELETE FROM {table} WHERE "

    if fields == fieldNames[checkedFields[0]]:
        sql += f"{fields} = ?"
    else:
        for item in fields:
            sql += f"{item} = ? AND "
        sql = sql[:-5]
    
    print(sql)
    cursor.execute(sql, values)

    conn.commit()
    conn.close()


def UpdateData(table, updateField, value, fieldsUsedInt, usedValues):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    # Gets the column names of the table and declares a list
    fields = GetFields(table)

    # Adds '?, ' for every field that was found to be used ands adds the name of the field to a list
    sql = f"UPDATE {table} SET {updateField} = '{value}' WHERE "
    print(f"{table}, {updateField}, {value}, {fieldsUsedInt}, {usedValues}")
    for item in fieldsUsedInt:
        sql += f"{fields[item]} = ? AND "

    print(sql)
    # Removes ' AND ' from the end of the sql string
    sql = sql[:-5]

    cursor.execute(sql, usedValues)

    conn.commit()
    conn.close()


def ReadData(table, values, fieldIndexes):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    fields = GetFields(table)
    sql = f"SELECT * FROM {table} WHERE "

    for item in fieldIndexes:
        sql += f"{fields[item]} = ? AND "
    sql = sql[:-5]

    cursor.execute(sql, values)

    fieldNames = [description[0] for description in cursor.description]

    print("Got through this function")

    result = cursor.fetchall()
    conn.commit()
    conn.close()
    
    return fieldNames, result




