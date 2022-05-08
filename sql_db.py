'''
A sqlite wrapper
https://github.com/Ada-Wu/whova/blob/master/db_table.py
'''

import sqlite3


class sql_db:

    DB_NAME = "clinical_trials.db"

    def __init__(self, name, schema):

        self.name = name
        self.schema = schema
        self.db_conn = sqlite3.connect(self.DB_NAME)

        self.create_table()

    def create_table(self):
        columns_query_string = ', '.join(
            ["%s %s" % (k, v) for k, v in self.schema.items()])
        self.db_conn.execute("CREATE TABLE IF NOT EXISTS %s (%s)" %
                             (self.name, columns_query_string))
        self.db_conn.commit()

    def select(self, columns=[], where={}):
        if not columns:
            columns = [k for k in self.schema]

        columns_query_string = ", ".join(columns)
        query = "SELECT %s FROM %s" % (columns_query_string, self.name)
        if where:
            where_query_string = ["%s = '%s'" %
                                  (k, v) for k, v in where.items()]
            query += " WHERE " + ' AND '.join(where_query_string)

        result = []

        for row in self.db_conn.execute(query):
            result_row = {}
            for i in range(0, len(columns)):
                result_row[columns[i]] = row[i]
            result.append(result_row)

        return result

    def insert(self, item):
        columns_query = ", ".join(item.keys())
        values_query = ", ".join(["'%s'" % v for v in item.values()])
        cursor = self.db_conn.cursor()
        cursor.execute("INSERT INTO %s (%s) VALUES (%s)" %
                       (self.name, columns_query, values_query))
        cursor.close()
        self.db_conn.commit()
        return cursor.lastrowid

    def close(self):
        self.db_conn.close()
