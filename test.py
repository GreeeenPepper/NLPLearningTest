import jieba


def getWordsFromSeg():
    return

filename = 'test2.txt'
start = 0
id = 1
with open(filename, 'r', encoding='gb18030', errors='ignore') as f:
    while True:
        lines = f.readline()
        start = start + 1
        if start >= 7:
            lines = lines.strip()
            if lines[0] == '【':
                mystr = lines.split('】')[1]
                seg_list = jieba.cut(mystr)
                #print('Type1')
                print(str(id) + "  : " + "/ ".join(seg_list))
                id = id + 1
            if lines[0] == '{':
                #print('Type2')
                mystr_1 = lines.split('}')[0].strip('{')
                mystr_2 = lines.split('}')[1].strip()
                if mystr_1[0] == '【':
                    mystr_1_r = mystr_1.split('】')[1]
                    mystr_2_r = mystr_2.split('】')[1]
                    seg_list_6 = jieba.cut(mystr_1_r)
                    seg_list_7 = jieba.cut(mystr_2_r)
                    print(str(id) + "  : " + "/ ".join(seg_list_6))
                    print(str(id) + "  : " + "/ ".join(seg_list_7))
                else:
                    seg_list_4 = jieba.cut(mystr_1)
                    seg_list_5 = jieba.cut(mystr_2)
                    print(str(id) + "  : " + "/ ".join(seg_list_4))
                    print(str(id) + "  : " + "/ ".join(seg_list_5))
                id = id + 2
            if lines[0] != '{' and lines[0] != '【':
                #print('Type3')
                seg_list_3 = jieba.cut(lines)
                print(str(id) + "  : " + "/ ".join(seg_list_3))
                id = id + 1


