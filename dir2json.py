import json
from os import walk

rootdir = 'sounds/'
tree = {}
for root, folders, files in walk(rootdir):
    if files:
        tree[root[len(rootdir)::]] = files

with open('data.json', 'w') as f:
    json.dump(tree, f)
