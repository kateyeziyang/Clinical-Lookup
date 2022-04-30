import os
import xml.etree.ElementTree as ET
import json, re
import numpy as np
from rank_bm25 import BM25Okapi
from keybert import KeyBERT

# I have to break down corpus to two files because of Github's file size limit
docPATH = "./Model Files/unprocessed_corpus_1.json"
docPATH2 = "./Model Files/unprocessed_corpus_2.json"
keybert_docPATH = "./Model Files/keybert_corpus.json"
simple_docPATH = "./Model Files/simple_corpus_1.json"
simple_docPATH2 = "./Model Files/simple_corpus_2.json"
summaries_PATH = "./Model Files/brief_summaries.json"
# topicPATH = "./topic.json"
# keyber_bm25_resultPATH = "./keybert_bm25.json" 
# simple_bm25_resultPATH = "./simple_bm25.json"

def get_summaries(nids):
    if os.path.exists(summaries_PATH):
        with open(summaries_PATH,"r") as input:
            summaries = json.load(input)
        result = []
        for nid in nids:
            result.append(summaries[nid])
        return result
    else:
        print("Please check if ./Model Files/brief_summaries.json exists.")

def simple_bm25(query):
    """
    Given a string (query), return a list of nct_id of the top 5 relevant documents with simple word embedding.
    """

    if os.path.exists(docPATH) and os.path.exists(docPATH2):
        # print("load doc directly")
        with open(docPATH, 'r') as input:
            corpus = json.load(input)
            with open(docPATH2, 'r') as input2:
                corpus += json.load(input2)
    else:
        print("please load corpus first")
        return
    
    if os.path.exists(simple_docPATH) and os.path.exists(simple_docPATH2):
    # print("load keybert_doc directly")
        with open(simple_docPATH, 'r') as input:
            tokenized_corpus = json.load(input)
            with open(simple_docPATH2, 'r') as input2:
                tokenized_corpus += json.load(input2)
    else:
        print("please load simple_corpus first")
        return

    bm25 = BM25Okapi(tokenized_corpus)
    # for query in queries:
    tokenized_query = re.sub(r'[^\w\s]', '', query).split(" ")
    top_n_docs = bm25.get_top_n(tokenized_query,corpus,5)
    result = []
    nids = []
    for doc in top_n_docs:
        nids.append(doc[:11])
    summaries = get_summaries(nids)
    for nid,summary in zip(nids,summaries):
        result.append([nid,summary])
    return result

def keybert_bm25(query):
    """
    Given a string (query), return a list of nct_id of the top 5 relevant documents with KeyBERT word embedding.
    """
    if os.path.exists(docPATH) and os.path.exists(docPATH2):
        # print("load doc directly")
        with open(docPATH, 'r') as input:
            corpus = json.load(input)
            with open(docPATH2, 'r') as input2:
                corpus += json.load(input2)
    else:
        print("please load corpus first")
        return

    if os.path.exists(keybert_docPATH):
        # print("load keybert_doc directly")
        with open(keybert_docPATH, 'r') as input:
            tokenized_corpus = json.load(input)
    else:
        print("please load keybert_corpus first")
        return


    bm25 = BM25Okapi(tokenized_corpus)
    tokenized_query = re.sub(r'[^\w\s]', '', query).split(" ")
    top_n_docs = bm25.get_top_n(tokenized_query,corpus,5)
    result = []
    nids = []
    for doc in top_n_docs:
        nids.append(doc[:11])
    summaries = get_summaries(nids)
    for nid,summary in zip(nids,summaries):
        result.append([nid,summary])
    return result