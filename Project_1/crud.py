import sqlite3


def RunQuery(query):

    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute(query)

    result = cursor.fetchall()
    conn.commit()
    conn.close()

    return result


