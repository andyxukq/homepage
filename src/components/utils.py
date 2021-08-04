import dgl
from torch.multiprocessing import Pool
from collections import Counter

class counter(object):
    def __init__(self, data = None, safe=False):
        self.data = Counter(data)
        self.safe = safe
    def add(self, x):
        self.data.update({x})
    def addall(self, xs):
        self.data.update(x)
    def getzero(self):
        zeroset = set(self.data.keys()) - set(self.data.elements())
        if self.safe:
            for x in zeroset:
                if type(x) != int:
                    raise Exception("count key is not int!")
                if self.data != 0:
                    raise Exception("counter value less than zero!")
        return zeroset
    def subtract(self, xs):
        self.data.subtract(xs)
    def merge(self, c):
        self.data = self.data+c.data

def find_node_d(partid, u, v, nidmap, prange, wrange, wid):
    def isLocal(x):
        return prange[partid] <= x and x < prange[partid + 1]

    def findp(x):
        for i in range(1, len(prange)):
            if prange[i] > x:
                return i - 1

    dsets = [set() for i in range(len(prange) - 1)]
    dcount = counter()
    for i in range(len(u))[wrange[0]:wrange[1]]:
        x = int(nidmap[u[i]])
        if isLocal(x):
            continue
        y = nidmap[v[i]]
        dcount.add(x)
        dsets[findp(x)].add(int(y))
    return dsets, dcount


def process(partid, args, workers):
    try:
        graph, node_feats, edge_feats, book, _, = dgl.distributed.load_partition(
            '{}/{}.json'.format(args.out_path, args.dataset), partid)
    except Exception as e:
        print('Error load_partition, exception: ' + str(e))
        exit(0)
    local_node_count = book.metadata()[partid]["num_nodes"]
    print("\npartition #{}: nodes {} (local {}), edges {}".format(
        partid, graph.num_nodes(), local_node_count, graph.num_edges()))

    u, v = graph.edges(form="uv", order="srcdst")
    nidmap = graph.ndata["_ID"]
    partitions = len(book.metadata())
    prange = [0]
    for x in book.metadata():
        prange += [prange[-1] + x["num_nodes"]]

    pdsets = [set() for x in range(partitions)]
    dcount = counter()
    with Pool(processes=workers) as pool:
        workload = int(len(u) / workers) + 1
        splits = list(
            zip(range(0, len(u), workload),
                range(workload,
                      len(u) + workload, workload)))
        works = []
        for wid, wrange in enumerate(splits):
            works.append(
                pool.apply_async(find_node_d,
                                 (partid, u, v, nidmap, prange, wrange, wid)))
        for x in works:
            r1, r2 = x.get()
            for i in range(partitions):
                pdsets[i].update(r1[i])
            dcount.merge(r2)

    dset = set().union(*pdsets)
    iset = set(range(prange[partid], prange[partid + 1])) - dset
    haloset = set(nidmap.tolist()) - dset - iset

    print(
        "PartID:{}, Len(dset):{}, Len(iset):{}, Len(haloset):{}, local:{}, Num_node:{}"
        .format(partid, len(dset), len(iset), len(haloset), local_node_count,
                graph.num_nodes()))

    return graph, node_feats, edge_feats, book, (partid, list(dset),
                                                list(iset), list(haloset),
                                                 local_node_count,
                                                 graph.num_nodes(), dcount)