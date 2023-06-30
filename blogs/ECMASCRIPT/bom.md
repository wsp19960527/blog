## window对象

### 属性和方法
- devicePixelRatio 表示物理像素和 css 像素之间的转换比例
- screenLeft 表示窗口相对于屏幕左侧的位置，返回值是 css 像素
- screenTop 表示窗口相对于顶部的位置，返回值是 css 像素
  
所有现代浏览器都支持以下四个属性

- innerHeight 浏览器窗口中页面视口的高度
- innerHeight 浏览器窗口中页面视口的高度
- outerHeight 返回浏览器窗口自身的高度
- outerWidth 返回浏览器窗口自身的宽度
  
使用open导航到指定url

- open（url） 导航到指定 url
- pageXoffset/scrollX 文档相对于视口滚动的横向距离
- pageYoffset/scrollY 文档相对于视口滚动的纵向距离
  
以下三个方法都可以滚动页面，都接受表示相对视口的 x、y 坐标。这两个参数在前两个方法中表示要滚动到的坐标，最后一个方法表示滚动的距离

- scroll()
- scrollTo()
- scrollTo()

### 系统对话框
- alert() 显示给用户一个字符串，只有一个（ok）确定按钮
- confrim() 向用户显示一个字符串 ，又取消和确定按钮，返回 true 表示点击了确定按钮 反之表示点击了取消按钮
- prompt() 向用户显示一个弹出框，有一个输入框提示用户输入信息，接受两个参数，显示给用户的文本，另一个则是输入框的初始值，点击确定按钮会返回输入框的值，否则返回 null


### 定时器

setTimeout(fn,time) setInterval(fn,time)

这两个方法都会返回一个超时排期的数值 ID ，用于取消该任务，第二个餐食表示在 time 毫秒后把任务添加到任务队列，并不是 time 毫秒后执行该任务，如果任务队列是空的 timer 毫秒后会立即执行改代码，否则需要等待前面的任务执行完成 清除定时器

clearInterval（id） cleartimeOut（id）

## location 对象
  
### location 属性包括

- hash url 散列值 （vue-router hash 模式） #contents
- host 服务器名和端口号 www.wrox.com:80
- hostname 服务器域名 www.wrox.com
- href 当前加载页面的完整 url
- pathname URL 中的路径或文件名
- port 请求的端口 80
- protocol 页面使用的协议 http、htpps
- search url 的查询字符串 以问号开头 ?q=123
- username 域名前指定的用户名
- password 域名前指定的密码
- origin URL 的源地址 只读

修改地址的方法

- location.assign('http://www.baidu.com') 导航到传入的 url 同时在浏览器历史记录中增加一条记录。
- location.replace(url) 重新加载输入的 url 页面后不会添加历史记录
- location.reload() 重新加载当前页面 传 true 可以从服务器重新加载，不传可能是从缓存加载
  

## navigator 对象

### 属性和方法

- platform 返回浏览器的系统平台 win32
- onLine 返回浏览器是否联网
- plugins 返回浏览器安装的插件数组
- sendBeacon() 异步传输一些小数据
- userAgent 返回浏览器的代理字符串

### 注册处理程序

注册处理程序使用 navigator.registerProtocolHandler(protocol,url,name),该方法接收三个参数，要处理的协议、处理该协议的 url、应用名称

## history 对象

history 对象表示当前窗口自首次使用来用户的导航历史记录。

### 方法及属性
- go(number) 接受一个数字，表示前进或后退多少步
  - back（） 后退
  - forward（）前进
- length 表示历史记录中有多少个条目
- pustate(state,title,url)接收三个参数 state 对象、新状态的标题、相对 url（kexuan）
- replaceState(state,title)接收两个参数 state 对象、新状态的标题，不会创建新历史纪录，只会覆盖当前状态

### 相关事件
hashchange location.hash 变化会触发该函数 popState 事件 事件对象有一个 state 属性，表示 pushState 方法传入的 state 对象，在最初页面 event.state 返回 null
