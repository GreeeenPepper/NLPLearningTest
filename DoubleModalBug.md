# 重复弹出模态框关闭时出现的滚动条bug

- 解决方案1：在div中添加 style="overflow:scroll"
```html
    <div class="modal fade" id="myModal"   style="overflow:scroll" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
```
成功。

- 解决方案2:为被关闭的modal的关闭函数重新添加遮罩:
```javascript
    $("body").addClass("modal-open");
```
懒得试了。。

- 解决方案3:
```html5
<style>
          .modal { overflow: auto !important; }
</style>
```