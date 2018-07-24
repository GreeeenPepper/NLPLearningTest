import jieba

filename = 'test2.txt'
start = 0
id = 1
with open(filename, 'r', encoding='gb18030', errors='ignore') as f:
    while True:
        lines = f.readline()
        start = start + 1
        if start >= 7:
            seg_list = jieba.cut(lines)
            print(str(id) + "  : " + "/ ".join(seg_list))
        id = id + 1

