from sql_db import sql_db
from schema import SCHEMA

from bs4 import BeautifulSoup
import sqlite3
from sqlite3 import Error


def import_xml():
    """This function import a xml file into sqlite db
    """

    # construct trials table given name 'trials' and schema
    trials = sql_db('trials', SCHEMA)

    for i in range(102, 200):
        try:
            with open('NCT0000xxxx/NCT00000' + str(i) + '.xml', 'r') as f:
                data = f.read()

            bs_data = BeautifulSoup(data, 'xml')

            nct_id = bs_data.find('nct_id').text
            url = bs_data.find('url').text
            title = bs_data.find('brief_title').text.replace("'", "''")
            gender = bs_data.find('gender').text
            minimum_age = bs_data.find('minimum_age').text[:-6]
            minimum_age == None if minimum_age == '' else int(minimum_age)
            maximum_age = bs_data.find('maximum_age').text[:-6]
            maximum_age == None if maximum_age == '' else int(maximum_age)
            verification_date = bs_data.find('verification_date').text
            brief_summary = bs_data.find(
                'brief_summary').text.strip().replace("'", "''")
            detailed_description = bs_data.find('detailed_description')
            if detailed_description is not None:
                detailed_description = detailed_description.text.strip().replace("'", "''")

            agency = bs_data.find('agency').text.replace("'", "''")
            insert_dict = {
                'id': nct_id,
                'url': url,
                'title': title,
                'verification_date': verification_date,
                'gender': gender,
                'minimum_age': minimum_age,
                'maximum_age': maximum_age,
                'brief_summary': brief_summary,
                'detailed_description': detailed_description,
                'agency': agency,
            }
            trials.insert(insert_dict)
        except OSError as e:
            continue
    # close database connection
    trials.close()


if __name__ == '__main__':
    import_xml()
