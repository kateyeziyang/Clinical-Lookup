#!/usr/bin/env python3

"""This file lookup trials from created db """
from sql_db import sql_db
from schema import SCHEMA


def lookup_db(where={}):
    """Search for matching trials given column key and the value of the column.

    Args:
        where (dict): name and value of the searching value
        e.g. where={'id':'NCT00000102'}
    """

    trials = sql_db('trials', SCHEMA)
    result = trials.select(where=where)
    trials.close()
    return result
