import jieba
import sys
import jieba.posseg as psg
from collections import Counter
import re
import eel
import math
from aip import AipNlp
import traceback

APP_ID = '11629419'
API_KEY = 'HlaRo0TMQMxiwC4Xhxatu3EZ'
SECRET_KEY = '9oEnPFG9BbG4wmxTF6NziyaFUl0Tof5M'

client = AipNlp(APP_ID,API_KEY,SECRET_KEY)

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

my_filename = '20180731.txt'

@eel.expose
def getWordsFromSeg(segList):
    for x in segList:
        if len(x) > 1:
            if x not in stop_words:
                c[x] = c[x] + 1
    return

@eel.expose
def Anaylize(filename):
    c.clear()
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
                        #mystr_baidu = mystr
                        seg_list = jieba.cut(mystr)
                        #seg = client.lexerCustom(mystr_baidu)
                        #print(seg)
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
                            #mystr_1_r_baidu = mystr_1_r
                            #mystr_2_r_baidu = mystr_2_r
                            seg_list_6 = jieba.cut(mystr_1_r)
                            seg_list_7 = jieba.cut(mystr_2_r)
                            #seg6 = client.lexerCustom(mystr_1_r_baidu)
                            #print(seg6)
                            #seg7 = client.lexerCustom(mystr_2_r_baidu)
                            #print(seg7)
                            getWordsFromSeg(seg_list_6)
                            print(str(id) + "  : " + "/ ".join(seg_list_6))
                            getWordsFromSeg(seg_list_7)
                            print(str(id) + "  : " + "/ ".join(seg_list_7))

                        else:
                            seg_list_4 = jieba.cut(mystr_1)
                            #mystr_1_r_baidu = mystr_1
                            #mystr_2_r_baidu = mystr_2
                            #seg4 = client.lexerCustom(mystr_1_r_baidu)
                            #print(seg4)
                            seg_list_5 = jieba.cut(mystr_2)
                            #seg5 = client.lexerCustom(mystr_2_r_baidu)
                            #print(seg5)
                            getWordsFromSeg(seg_list_4)
                            print(str(id) + "  : " + "/ ".join(seg_list_4))
                            getWordsFromSeg(seg_list_5)
                            print(str(id) + "  : " + "/ ".join(seg_list_5))
                        id = id + 2
                    if lines[0] != '{' and lines[0] != '【' and lines[0] != 'V':
                        #print('Type3')
                        seg_list_3 = jieba.cut(lines)
                        #mystr_lines_baidu = lines
                        #seg3 = client.lexerCustom(mystr_lines_baidu)
                        #print(seg3)
                        getWordsFromSeg(seg_list_3)
                        print(str(id) + "  : " + "/ ".join(seg_list_3))
                        id = id + 1
        except:
            print('woops')
            traceback.print_exc()
            print(c.most_common())
            result_file = open('web/result_file.json', 'w', encoding='utf-8', errors='ignore')
            result_file.write('[')
            abc = 0
            for (k, v) in c.most_common():
                print('%s%s %s  %d' % ('  ' * (5 - len(k)), k, '*' * int(v / 3), v))
                result_file.write('{\"Keyword\":\"'+k+'\",\"amount\":'+str(v)+'}')
                result_file.write(',')
                abc = abc + v
            result_file.write(']')
            result_file.close()
            print(abc)
            return c.most_common()

@eel.expose
def SayHello():
    print('hello')
    return 5

@eel.expose
def SelectKeyWord(keyword, filename):
    result = []
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
                        result.append(str(a))
            print('finish')
            print(result)
            return result
        except:
            return result

# print(count_reask)
@eel.expose
def AddToStopWordList(word):
    stop_word_file = open('stopword','a')
    stop_word_file.write(word+'\n')
    stop_word_file.close()
    print('AddtoStopWordList'+word)

@eel.expose
def AddToYYSKeyWordList(word):
    yyswordlist = open('yyskeywordlist.txt','a',encoding='Utf-8')
    yyswordlist.write(word+'\n')
    yyswordlist.close()
    print('AddtoYYSKeyWordList'+word)

@eel.expose
def CountRelation(keyword, filename):
    start = 0
    wordlist = Counter()
    wordlist[keyword] = 0
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
            #filename_c = 'CountRelation_'+keyword+'.json'
            #result_file = open(filename_c, 'w', encoding='utf-8', errors='ignore')
            #result_file.write('[')
            for (k, v) in wordlist.most_common():
                print('%s%s %s  %d' % ('  ' * (5 - len(k)), k, '*' * int(v / 3), v))
                #result_file.write('{\"Keyword\":\"' + k + '\",\"amount\":' + str(v) + '}')
                #result_file.write(',')
            #result_file.write(']')
            #result_file.close()
            return wordlist.most_common()
        except:
            return wordlist.most_common()


@eel.expose
def TwoWordSentence(filename,word1, word2):
    reg = re.compile('(.*)' + word1 + '(.*)'+word2+'(.*)')
    reg2 = re.compile('(.*)' + word2 + '(.*)'+word1+'(.*)')
    result = []
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
                    a = re.match(reg, lines)
                    a1 = re.match(reg2,lines)
                    if str(a) != 'None':
                        print(a)
                        result.append(lines)
                    if str(a1) != 'None':
                        print(a)
                        result.append(lines)
            print('finish')
            print(result)
            return result
        except:
            return result


eel.init('web')
eel.start('test.html')



