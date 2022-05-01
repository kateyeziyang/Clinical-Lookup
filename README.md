# CS510-598RK-Project

To run models.py, you have to install the python package rank_bm25. Install it with
```
pip install rank-bm25
```

Sample model usage of models.py, suppose you create an example.py in the root directory.
```
from models import simple_bm25,keybert_bm25

print(simple_bm25("inflammation"))
# [['NCT00122694', 'The purpose of this study is to determine whether carbon monoxide is effective in the treatment of stable COPD.'], ..., ['NCT00811889', 'This study assesses the effects of bardoxolone methyl (RTA 402) in patients with type 2 diabetes and chronic kidney disease.']]

print(keybert_bm25("inflammation"))
# [['NCT00167050', 'Superior limbic keratoconjunctivitis (SLK) was first described in detail as a clinical entity by Frederick Theodore in 1963. The clinical picture of SLK is well documented, but the etiology is still unknown. This project will be conducted into through two parts: one is to investigate the presentation of chemokine receptors on mast cell and matrix metalloproteinases on fibroblasts by immunohistochemistry method from the pathological specimens of SLK patients who received conjunctiva resection as the treatment. The other part is to investigate the mRNA level of those chemokine receptors via reverse transcription - polymerase chain reaction from the conjunctiva collecting form SLK patients.'],...,['NCT00029679', 'This study will assess clinical efficacy and/or adverse effects of dietary borage oil (which contains gamma-linolenic acid [GLA]) and Ginkgo biloba in patients with mild persistent to moderate asthma.']]

# I hide elements in the middle of the result because it's too long!
```
