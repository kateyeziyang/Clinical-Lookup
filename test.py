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
# topicPATH = "./topic.json"
# keyber_bm25_resultPATH = "./keybert_bm25.json" 
# simple_bm25_resultPATH = "./simple_bm25.json"

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
    simple_bm25 = {}
    # for query in queries:
    tokenized_query = re.sub(r'[^\w\s]', '', query).split(" ")
    doc_scores = bm25.get_scores(tokenized_query)
    indices = list(np.argsort(doc_scores)[-5:][::-1])
    top_n_docs = [corpus[idx] for idx in indices]
    top_scores = [doc_scores[idx] for idx in indices]
    simple_bm25[query] = [top_scores, top_n_docs]
    return simple_bm25