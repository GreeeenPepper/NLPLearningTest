from aip import AipNlp

APP_ID = '11629419'
API_KEY = 'HlaRo0TMQMxiwC4Xhxatu3EZ'
SECRET_KEY = '9oEnPFG9BbG4wmxTF6NziyaFUl0Tof5M'

client = AipNlp(APP_ID,API_KEY,SECRET_KEY)

seg = client.lexerCustom('大天狗御魂怎么搭配');

print(seg);

comment = client.lexerCustom("血月推荐阵容")

print(comment)

