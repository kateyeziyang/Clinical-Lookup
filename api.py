'''
Run python3 api.py to run api
'''
from ast import arg
import json
from flask import Flask, request, jsonify
from models import simple_bm25, keybert_bm25
from lookup_trials import lookup_db

app = Flask(__name__)


@app.route('/bm25', methods=['POST'])
def rank_bm25():
    '''
    route: http://127.0.0.1:5000/bm25
    request.data: {"topic": "copy content from topic2.txt"}
    return: [["NCT12343", "some description"], ["NCT234343", "other description"], ...]
    '''

    query = json.loads(request.data)["topic"]
    result = simple_bm25(query)

    return jsonify(result), 201


@app.route('/keybert', methods=['POST'])
def rank_keybert():
    '''
    route: http://127.0.0.1:5000/keybert
    request.data - {"topic": "48 M etc"}
    return: [["NCT12343", "some description"], ["NCT234343", "other description"], ...]

    '''

    query = json.loads(request.data)["topic"]
    result = keybert_bm25(query)

    return jsonify(result), 201


@app.route('/search', methods=['GET'])
def search():
    '''
    return: [
    {
        "agency": "National Center for Research Resources (NCRR)",
        "brief ....
    }, {...} ....]
    example: http://127.0.0.1:5000/search?id=NCT00000102
    http://127.0.0.1:5000/search?gender=All (Notice gender has 3 options: All, Female, Male)
    It only supportS accurate search by key=value. key>value or key<value is not supported
    If no parameter given, it returns all data
    '''
    args = request.args
    nct_id = args.get('id')
    gender = args.get('gender')
    where = {}
    if nct_id:
        where = {'id': nct_id}
    elif gender:
        where = {'gender': gender}
    result = lookup_db(where=where)
    print(result)
    return jsonify(result), 201


@app.after_request
def after_request(response):
    """
    @https://github.com/corydolphin/flask-cors/issues/200
    To solve connection blocked by cors
    :param response:
    :return:
    """
    response.headers.add('Access-Control-Allow-Origin',
                         'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods',
                         'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response


app.run(debug=True)
