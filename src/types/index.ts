import React from "react";

// 路由接口
export interface RouterType {
	path: string;
	element?: JSX.Element;
	meta?: {
		title?: string;
		hidden?: boolean
		permission?: number
		icon?: JSX.Element | React.ReactElement | React.ReactNode
	};
	children?: RouterType[]
}

// 列表项接口
export interface ListItemType {
	"id": string,
	"name": string,
	"state": string,
	"address": string,
	"tel": string,
	"price": number
}
