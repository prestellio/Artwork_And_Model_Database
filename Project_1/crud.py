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


def UpdateData(id, value):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    sql = """UPDATE Prices SET price = ? WHERE combination_id = ?"""

    cursor.execute(sql, (value, id))

    conn.commit()
    conn.close()


def ReadData(id):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    sql = "SELECT * FROM Prices WHERE combination_id = ?;"

    cursor.execute(sql, (id,))

    fieldNames = [description[0] for description in cursor.description]

    result = cursor.fetchall()
    conn.commit()
    conn.close()
    
    return fieldNames, result




