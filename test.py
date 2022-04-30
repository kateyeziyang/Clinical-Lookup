import json

docPATH = "./Model Files/unprocessed_corpus.json"
with open(docPATH, 'r') as input:
    corpus = json.load(input)
    d1 = corpus[:len(corpus)//2]
    d2 = corpus[len(corpus)//2:]
    with open("unprocessed_corpus_1.json","w") as output:
        json.dump(d1,output)
    with open("unprocessed_corpus_2.json","w") as output:
        json.dump(d2,output)