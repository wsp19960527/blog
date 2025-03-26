import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";

export default defineUserConfig({
	title: "bolg",
	description: "学习笔记",
	theme: recoTheme({
		style: "@vuepress-reco/style-default",
		logo: "/avatar.jpg",
		author: "wsp",
		authorAvatar: "/avatar.jpg",
		docsRepo: "https://github.com/vuepress-reco/vuepress-theme-reco-next",
		docsBranch: "main",
		docsDir: "example",
		sourceDir: "../docs",
		// password: [
		//   '2d096d8d54c1fd83588224452a8bcc3f',
		//   'de437fd09ab7ba9cf9b5b55ecddf1e2a'
		// ],
		lastUpdatedText: "",
		autoSetSeries: true,
		navbar: [
			{ text: "首页", link: "/" },
			{ text: "日常", link: "/blogs/daily/" },
			{ text: "阅读", link: "/blogs/read/" },
			{
				text: "面试",
				link: "/docs/interview/",
				children: [
					{
						text: "css",
						link: "/docs/css/box.md",
					},
					{
						text: "JavaScript",
						link: "/docs/JavaScript/data_type.md",
					},
					{
						text: "es6",
						link: "/docs/es6/var_let_const.md",
					},
					{
						text: "vue",
						link: "/docs/vue/vue.md",
					},
					{ text: "vue3", link: "/docs/vue3/goal.md" },
					{
						text: "webpack",
						link: "/docs/webpack/webpack.md",
						children: [
							{ text: "webpack", link: "/docs/webpack/webpack.md" },
							{ text: "构建流程", link: "/docs/webpack/build_process.md" },
						],
					},
					{
						text: "NodeJS",
						link: "/docs/NodeJS/nodejs.md",
					},
					{
						text: "React",
						link: "/docs/React/React.md",
					},
					{
						text: "typescript",
						link: "/docs/typescript/typescript_javascript.md",
					},
					{
						text: "小程序系列",
						link: "/docs/applet/applet.md",
					},
					{
						text: "算法与数据结构系列",
						link: "/docs/algorithm/Algorithm.md",
					},
					{
						text: "版本控制",
						link: "/docs/git/Version control.md",
					},
					{
						text: "HTTP系列",
						link: "/docs/http/HTTP_HTTPS.md",
					},
					{
						text: "操作系统",
						link: "/docs/linux/linux.md",
					},
					{
						text: "设计模式系列",
						link: "/docs/design/design.md",
					},
				],
			},
			{
				text: "技术",
				children: [
					{ text: "javascript", link: "/docs/fontend/js" },
					{ text: "八股文", link: "/docs/八股文/" },
				],
			},
		],
	}),
});
