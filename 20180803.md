# NLP处理无回复问题工具
Powered By Bellong.WYZ
>人就是喜欢走弯路。
---
因为无回复问题数量过于多，且分类复杂，笔者懒得一条一条去挑。。所以制作了个小工具，主要利用了jieba分词以及echarts以及其他一些方便的库
```
import jieba
jieba.load_userdict('yyskeywordlist.txt')
#加载自定义词库
seg_list = jieba.cut(mystr)
print("/ ".join(seg_list))
```
jieba分词用起来还是蛮好用的

笔者还试过snownlp，体感上没有jieba好用，不过snownlp提供了情感分析，还是蛮有意思的，但用在我所想要运用的这个游戏方向就有些蛋疼了。。

后来尝试运用了一下百度提供的自然语言处理的api。。发现更强大。。

在我没有设置自定义词库的时候直接识别出了大天狗和御魂两个名词。。

```
from aip import AipNlp

APP_ID = '---------'
API_KEY = '------------'
SECRET_KEY = '---------------'

client = AipNlp(APP_ID,API_KEY,SECRET_KEY)
seg = client.lexer('大天狗御魂怎么搭配');
print(seg);

```
