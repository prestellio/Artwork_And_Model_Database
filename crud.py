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

def InsertData(values):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    sql = """INSERT INTO Prices VALUES (?, ?, ?, ?, ?)"""


    cursor.execute(sql, values)

    conn.commit()
    conn.close()


def DeleteData(value):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    sql = """DELETE FROM Prices WHERE combination_id = ?"""

    cursor.execute(sql, (value,))

    conn.commit()
    conn.close()





