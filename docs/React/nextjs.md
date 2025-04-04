---
title: nextjs
date: 2025/04/02
tags:
  - react
  - ssr
  - nextjs
categories:
  - 前端
---

## 安装

```sh
npm install --save next react react-dom
```

在项目中添加脚本

```sh
{
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
}
```

## 路由

可以用 `<Link>` 组件实现客户端的路由切换。

```js
import Head from "next/head";
import Link from "next/link";
export default () => (
	<div>
		<Head>
			<title>My page titl2</title>
			<meta name="viewport" content="initial-scale=1.2, width=device-width" key="viewport" />
		</Head>
		<p>Welcome to next.js!</p>
		<Link href="/about">about</Link>
	</div>
);
```

```js
// pages/about.js
export default () => <p>Welcome to About!</p>;
```

:::tip
可以使用`<Link prefetch>`使链接和预加载在后台同时进行，来达到页面的最佳性能
:::
组件`<Link>`接收 URL 对象，而且它会自动格式化生成 URL 字符串

```js
// pages/index.js
import Link from "next/link";

export default () => (
	<div>
		<Link href={{ pathname: "/about", query: { name: "Zeit" } }}>hereto read more</Link>
	</div>
);
```

将生成 URL 字符串/about?name=Zeit

`<Link>`组件默认将新 url 推入路由栈中。你可以使用 replace 属性来防止添加新输入。

```js
// pages/index.js
import Link from "next/link";

export default () => (
	<div>
		<Link href="/about" replace>
			about to read more
		</Link>
	</div>
);
```

### 命令式

可以用 next/router 实现客户端路由切换

```js
import Router from "next/router";

export default () => (
	<div>
		Click <span onClick={() => Router.push("/about")}>here</span> to read more
	</div>
);
```

#### 拦截器 popstate

有些情况（比如使用 custom router），你可能想监听 popstate，在路由跳转前做一些动作。 比如，你可以操作 request 或强制 SSR 刷新

```js
import Router from "next/router";

Router.beforePopState(({ url, as, options }) => {
	// I only want to allow these two routes!
	if (as !== "/" || as !== "/other") {
		// Have SSR render bad routes as a 404.
		window.location.href = as;
		return false;
	}

	return true;
});
```

如果你在 beforePopState 中返回 false，Router 将不会执行 popstate 事件

以上 Router 对象的 API 如下：

- route - 当前路由的 String 类型
- pathname - 不包含查询内容的当前路径，为 String 类型
- query - 查询内容，被解析成 Object 类型. 默认为{}
- asPath - 展现在浏览器上的实际路径，包含查询内容，为 String 类型
- push(url, as=url) - 页面渲染第一个参数 url 的页面，浏览器栏显示的是第二个参数 url
- replace(url, as=url) - performs a replaceState call with the given url
- beforePopState(cb=function) - 在路由器处理事件之前拦截.

push 和 replace 函数的第二个参数 as，是为了装饰 URL 作用。如果你在服务器端设置了自定义路由将会起作用。

push 或 replace 可接收的 URL 对象（`<Link>`组件的 URL 对象一样）来生成 URL。

```js
import Router from "next/router";

const handler = () =>
	Router.push({
		pathname: "/about",
		query: { name: "Zeit" },
	});

export default () => (
	<div>
		Click <span onClick={handler}>here</span> to read more
	</div>
);
```

注册路由事件

```js
const handleRouteChange = (url) => {
	console.log("App is changing to: ", url);
};

Router.events.on("routeChangeStart", handleRouteChange);
```

支持的事件有：

- routeChangeStart(url) - 路由开始切换时触发
- routeChangeComplete(url) - 完成路由切换时触发
- routeChangeError(err, url) - 路由切换报错时触发
- beforeHistoryChange(url) - 浏览器 history 模式开始切换时触发
- hashChangeStart(url) - 开始切换 hash 值但是没有切换页面路由时触发
- hashChangeComplete(url) - 完成切换 hash 值但是没有切换页面路由时触发

：：：tip
这里的 url 是指显示在浏览器中的 url。如果你用了 Router.push(url, as)（或类似的方法），那浏览器中的 url 将会显示 as 的值
：：：
不想长期监听事件可以用 off 取消监听事件

```js
Router.events.off("routeChangeStart", handleRouteChange);
```

## 预加载

- Link 组件添加 prefetch
- 命令式 prefetch 写法

```js
import { withRouter } from "next/router";

export default withRouter(({ router }) => (
	<div>
		<a onClick={() => setTimeout(() => router.push("/dynamic"), 100)}>A route transition will happen after 100ms</a>
		{
			// but we can prefetch it!
			router.prefetch("/dynamic")
		}
	</div>
));
```

路由实例只允许在应用程序的客户端。以防服务端渲染发生错误，建议 prefetch 事件写在 componentDidMount()生命周期里。

```js
import React from "react";
import { withRouter } from "next/router";

class MyLink extends React.Component {
	componentDidMount() {
		const { router } = this.props;
		router.prefetch("/dynamic");
	}

	render() {
		const { router } = this.props;
		return (
			<div>
				<a onClick={() => setTimeout(() => router.push("/dynamic"), 100)}>A route transition will happen after 100ms</a>
			</div>
		);
	}
}

export default withRouter(MyLink);
```

## 自定义路由

```js
// 自定义路由
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// 所需的资源加载完成
app.prepare().then(() => {
	// 创建http服务器
	createServer((req, res) => {
		console.log(req, res);
		const parsedUrl = parse(req.url, true);
		const { pathname, query } = parsedUrl;

		if (pathname === "/a") {
			app.render(req, res, "/b", query);
		} else if (pathname === "/b") {
			app.render(req, res, "/a", query);
		} else {
			handle(req, res, parsedUrl);
		}
	}).listen(3000, (err) => {
		if (err) throw err;
		console.log("> Ready on http://localhost:3000");
	});
});
```

next 的 API 如下所示 next(opts: object) opts 的属性如下:

- dev (boolean) 判断 Next.js 应用是否在开发环境 - 默认 false
- dir (string) Next 项目路径 - 默认'.'
- quiet (boolean) 是否隐藏包含服务端消息在内的错误信息 - 默认 false
- conf (object) 与 next.config.js 的对象相同 - 默认{}

可以在 next.config.js 中使用 useFileSystemPublicRoutes 禁止服务端文件路由

```js
module.exports = {
	useFileSystemPublicRoutes: true, //是否禁止服务端的文件路由
};
```

如果需要设置动态前缀可以使用 assetPrefix

```js
const next = require("next");
const micro = require("micro");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handleNextRequests = app.getRequestHandler();

app.prepare().then(() => {
	const server = micro((req, res) => {
		// Add assetPrefix support based on the hostname
		if (req.headers.host === "my-app.com") {
			app.setAssetPrefix("http://cdn.com/myapp");
		} else {
			app.setAssetPrefix("");
		}

		handleNextRequests(req, res);
	});

	server.listen(port, (err) => {
		if (err) {
			throw err;
		}

		console.log(`> Ready on http://localhost:${port}`);
	});
});
```

## 动态导入

基础支持

```js
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(import("../components/hello"));

export default () => (
	<div>
		<Header />
		<DynamicComponent />
		<p>HOME PAGE is here!</p>
	</div>
);
```

自定义加载组件

```js
import dynamic from "next/dynamic";

const DynamicComponentWithCustomLoading = dynamic(import("../components/hello2"), {
	loading: () => <p>...</p>,
});

export default () => (
	<div>
		<Header />
		<DynamicComponentWithCustomLoading />
		<p>HOME PAGE is here!</p>
	</div>
);
```

禁止使用 ssr

```js
import dynamic from "next/dynamic";

const DynamicComponentWithCustomLoading = dynamic(import("../components/hello2"), {
	ssr: false,
});

export default () => (
	<div>
		<Header />
		<DynamicComponentWithCustomLoading />
		<p>HOME PAGE is here!</p>
	</div>
);
```

同时加载多个模块

```js
import dynamic from "next/dynamic";

const HelloBundle = dynamic({
	modules: () => {
		const components = {
			Hello1: import("../components/hello1"),
			Hello2: import("../components/hello2"),
		};

		return components;
	},
	render: (props, { Hello1, Hello2 }) => (
		<div>
			<h1>{props.title}</h1>
			<Hello1 />
			<Hello2 />
		</div>
	),
});

export default () => <HelloBundle title="Dynamic Bundle" />;
```

## 自定义配置

如果你想自定义 Next.js 的高级配置，可以在根目录下新建 next.config.js 文件（与 pages/ 和 package.json 一起）

:::tip
注意：next.config.js 是一个 Node.js 模块，不是一个 JSON 文件，可以用于 Next 启动服务已经构建阶段，但是不作用于浏览器端。
:::

```js
// next.config.js
module.exports = {
	/* config options here */
};
// 或使用一个函数
module.exports = (phase, { defaultConfig }) => {
	//
	// https://github.com/zeit/
	return {
		/* config options here */
		distDir: "build", //设置自定义构建目录
		generateEtags: false, //禁止 etag 生成 你可以禁止 etag 生成根据你的缓存策略。如果没有配置，Next 将会生成 etags 到每个页面中。
		pageExtensions: ["tsx", "ts", "js", "jsx"], //配置页面后缀名解析扩展 如 typescript 模块@zeit/next-typescript，需要支持解析后缀名为.ts的文件。pageExtensions 允许你扩展后缀名来解析各种 pages 下的文件。
	};
};
```
