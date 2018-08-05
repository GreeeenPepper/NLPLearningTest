import re
keyword = '提付'
regex = re.compile('(.*)' + keyword + '(.*)')
lines='提付上去看过。。'
lines = lines.strip()
a = re.match(regex, lines)
print(a)