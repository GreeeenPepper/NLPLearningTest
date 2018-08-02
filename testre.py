import re

word1 = '式神'
word2 = '御魂'

sen = '式神的御魂'
sen2 = '这个御魂的式神怎么配'

reg = re.compile('(.*)' + word1 + '(.*)'+word2+'(.*)')

a = re.match(reg,sen);
print(a)