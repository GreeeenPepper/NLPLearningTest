import jieba
import sys
import jieba.posseg as psg
from collections import Counter
import re
import eel

count_reask = 0
c = Counter()

stop_f = open('stopword', "r", encoding='gbk')
stop_words = list()
for line in stop_f.readlines():
    line = line.strip()
    if not len(line):
        continue
    stop_words.append(line)
stop_f.close

jieba.load_userdict('yyskeywordlist.txt')

filename = 'test4.txt'

@eel.expose
def getWordsFromSeg(segList):
    for x in segList:
        if len(x) > 1:
            if x not in stop_words:
                c[x] = c[x] + 1
    return

@eel.expose
def Anaylize():
    start = 0
    id = 1
    with open(filename, 'r', encoding='gb18030', errors='ignore') as f:
        try:
            # while True:
            for lines in f.readlines():
                # lines = f.readline()
                start = start + 1
                if start >= 7:
                    lines = lines.strip()
                    if lines[0] == '【':
                        mystr = lines.split('】')[1]
                        seg_list = jieba.cut(mystr)
                        getWordsFromSeg(seg_list)
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
                            getWordsFromSeg(seg_list_6)
                            print(str(id) + "  : " + "/ ".join(seg_list_6))
                            getWordsFromSeg(seg_list_7)
                            print(str(id) + "  : " + "/ ".join(seg_list_7))

                        else:
                            seg_list_4 = jieba.cut(mystr_1)
                            seg_list_5 = jieba.cut(mystr_2)
                            getWordsFromSeg(seg_list_4)
                            print(str(id) + "  : " + "/ ".join(seg_list_4))
                            getWordsFromSeg(seg_list_5)
                            print(str(id) + "  : " + "/ ".join(seg_list_5))
                        id = id + 2
                    if lines[0] != '{' and lines[0] != '【' and lines[0] != 'V':
                        #print('Type3')
                        seg_list_3 = jieba.cut(lines)
                        getWordsFromSeg(seg_list_3)
                        print(str(id) + "  : " + "/ ".join(seg_list_3))
                        id = id + 1
        except:
            print('woops')
            print(c.most_common())
            result_file = open('result_file.json', 'w', encoding='utf-8', errors='ignore')
            result_file.write('[')
            for (k, v) in c.most_common():
                print('%s%s %s  %d' % ('  ' * (5 - len(k)), k, '*' * int(v / 3), v))
                result_file.write('{\"Keyword\":\"'+k+'\",\"amount\":'+str(v)+'}')
                result_file.write(',')
            result_file.write(']')
            result_file.close()

@eel.expose
def SelectKeyWord(keyword):
    start = 0
    id = 1
    with open(filename, 'r', encoding='gb18030', errors='ignore') as f:
        try:
            # while True:
            for lines in f.readlines():
                # lines = f.readline()
                start = start + 1
                if start >= 7:
                    lines = lines.strip()
                    regex = re.compile('(.*)'+keyword+'(.*)')
                    a = re.match(regex, lines)
                    if str(a) != 'None':
                        print(a)
            print('finish')
        except:

            return

# print(count_reask)

def CountRelation(keyword):
    start = 0
    wordlist = Counter()
    reg = re.compile('(.*)' + keyword + '(.*)')
    with open (filename, 'r', encoding='gb18030', errors='ignore') as fff:
        try:
            for lines in fff.readlines():
                start = start + 1
                if start >=7:
                    lines = lines.strip()
                    a = re.match(reg, lines)
                    seg_list_count = []
                    seg_list_temp = []
                    if str(a) != 'None':
                        if lines[0] == '【':
                            mystr = lines.split('】')[1]
                            seg_list_count = jieba.cut(mystr)
                        if lines[0] == '{':
                            mystr_1 = lines.split('}')[0].strip('{')
                            mystr_2 = lines.split('}')[1].strip()
                            if mystr_1[0] == '【':
                                mystr_1_r = mystr_1.split('】')[1]
                                mystr_2_r = mystr_2.split('】')[1]
                                seg_list_count = jieba.cut(mystr_1_r)
                                seg_list_temp = jieba.cut(mystr_2_r)
                            else:
                                seg_list_count = jieba.cut(mystr_1)
                                seg_list_temp = jieba.cut(mystr_2)
                        if lines[0] != '{' and lines[0] != '【' and lines[0] != 'V':
                            # print('Type3')
                            seg_list_count = jieba.cut(lines)
                        print('yeah！')
                    for word in seg_list_count:
                        if word not in stop_words:
                            print(word)
                            if word != keyword:
                                wordlist[word] = wordlist[word] + 1
                    if seg_list_temp:
                        for word in seg_list_temp:
                            if word not in stop_words:
                                if word != keyword:
                                    print(word)
                                    wordlist[word] = wordlist[word] + 1
            print('finish')
            print(wordlist.most_common())
            filename_c = 'CountRelation_'+keyword+'.json'
            result_file = open(filename_c, 'w', encoding='utf-8', errors='ignore')
            result_file.write('[')
            for (k, v) in wordlist.most_common():
                print('%s%s %s  %d' % ('  ' * (5 - len(k)), k, '*' * int(v / 3), v))
                result_file.write('{\"Keyword\":\"' + k + '\",\"amount\":' + str(v) + '}')
                result_file.write(',')
            result_file.write(']')
            result_file.close()
        except:
            return




eel.init('web')
eel.start('test.html')



