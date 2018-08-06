# NLP分词处理工具程序打包成exe时遇到的坑

---
因为系统上自带的python是2.7版本的，然后笔者习惯性用了3.6版本的python来写的这个工具，因为考虑到一些库可能会不支持低版本之类的。。

而且因为拿不到管理员权限我改不了环境变量等等东西，用pyinstaller的时候就很坑。。

总结如下:

- 因为系统默认版本对不上，所以从Github上直接搞下来[pyinstaller](https://github.com/pyinstaller/pyinstaller)
正常打包操作如下。。
```bash
E:\pyinstaller-develop> E:\Python36\python.exe pyinstaller.py -F test.py
```
然后如下报了一万个错，虽然也生成了相应的test.exe
```bash
9474 WARNING: lib not found: api-ms-win-crt-string-l1-1-0.dll dependency of E:\Python36\lib\site-packages\pywin32_system32\pywintypes36.dll
9495 WARNING: lib not found: api-ms-win-crt-stdio-l1-1-0.dll dependency of E:\Python36\lib\site-packages\pywin32_system32\pywintypes36.dll
9511 WARNING: lib not found: api-ms-win-crt-heap-l1-1-0.dll dependency of E:\Python36\lib\site-packages\pywin32_system32\pywintypes36.dll
9528 WARNING: lib not found: api-ms-win-crt-time-l1-1-0.dll dependency of E:\Python36\lib\site-packages\pywin32_system32\pywintypes36.dll
9546 WARNING: lib not found: api-ms-win-crt-runtime-l1-1-0.dll dependency of E:\Python36\lib\site-packages\pywin32_system32\pywintypes36.dll
9585 WARNING: lib not found: api-ms-win-crt-utility-l1-1-0.dll dependency of E:\Python36\lib\site-packages\pywin32_system32\pythoncom36.dll
9604 WARNING: lib not found: api-ms-win-crt-string-l1-1-0.dll dependency of E:\Python36\lib\site-packages\pywin32_system32\pythoncom36.dll
9624 WARNING: lib not found: api-ms-win-crt-stdio-l1-1-0.dll dependency of E:\Python36\lib\site-packages\pywin32_system32\pythoncom36.dll
9641 WARNING: lib not found: api-ms-win-crt-heap-l1-1-0.dll dependency of E:\Python36\lib\site-packages\pywin32_system32\pythoncom36.dll
9658 WARNING: lib not found: api-ms-win-crt-runtime-l1-1-0.dll dependency of E:\Python36\lib\site-packages\pywin32_system32\pythoncom36.dll
9684 WARNING: lib not found: api-ms-win-crt-math-l1-1-0.dll dependency of E:\Python36\DLLs\_decimal.pyd
9703 WARNING: lib not found: api-ms-win-crt-stdio-l1-1-0.dll dependency of E:\Python36\DLLs\_decimal.pyd
9720 WARNING: lib not found: api-ms-win-crt-convert-l1-1-0.dll dependency of E:\Python36\DLLs\_decimal.pyd
9736 WARNING: lib not found: api-ms-win-crt-heap-l1-1-0.dll dependency of E:\Python36\DLLs\_decimal.pyd
9752 WARNING: lib not found: api-ms-win-crt-runtime-l1-1-0.dll dependency of E:\Python36\DLLs\_decimal.pyd
9769 WARNING: lib not found: api-ms-win-crt-locale-l1-1-0.dll dependency of E:\Python36\DLLs\_decimal.pyd
9787 WARNING: lib not found: api-ms-win-crt-string-l1-1-0.dll dependency of E:\Python36\DLLs\_decimal.pyd
9808 WARNING: lib not found: api-ms-win-crt-string-l1-1-0.dll dependency of E:\Python36\DLLs\_ctypes.pyd
9826 WARNING: lib not found: api-ms-win-crt-stdio-l1-1-0.dll dependency of E:\Python36\DLLs\_ctypes.pyd
```

然而运行时会报错，在错误信息所提示的路径里找不到jieba分词的dict.txt文件。
经过查阅相关问题，解决方法如下，将dict.txt文件放在与test.exe相同目录下，在import jieba导入jieba库后立即自定义加载的路径，问题解决成功。
```python
import jieba
jieba.set_dictionary("dict.txt")
jieba.initialize()
from collections import Counter
import re
import eel
import traceback
```

然而这个好了之后引入的eel库又出问题了。。
提示
```bash
ModuleNotFoundError: No module named 'gevent.__hub_local'
```

根据网上提示，先用makespec.py生成该项目的.spec文件。
```bash
a = Analysis(['..\\test.py'],
             pathex=['E:\\pyinstaller-develop\\test'],
             binaries=[],
             datas=[],
             hiddenimports=["eel","gevent","gevent.__hub_local","gevent.__greenlet_primitives"],
             hookspath=[],
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=False)
```

在hiddenimports中加入缺失的库，成功。（其实是上一个库提示有了，然后又提示了别的。。一个一个往里加好了）

