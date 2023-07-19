import {MenuDataItem, ProLayout} from '@ant-design/pro-components';
import HeaderRender from '../HeaderRender';
import {ChatsInfo} from '@/types';
import React, {useEffect} from 'react';
import {MenuProps} from 'antd';
import avatar from '@/assets/avatar.png';
import {configStore} from "@/store";

type Props = {
	menuExtraRender?: () => React.ReactNode,
	route?: {
		path: string,
		routes: Array<ChatsInfo> | MenuDataItem
	},
	menuItemRender?: (item: MenuDataItem & {
		isUrl: boolean;
		onClick: () => void;
	}, defaultDom: React.ReactNode, menuProps: MenuProps | any) => React.ReactNode | undefined,
	menuDataRender?: ((menuData: MenuDataItem[]) => MenuDataItem[]),
	menuFooterRender?: (props?: any) => React.ReactNode,
	menuProps?: MenuProps,
	children?: React.ReactNode,
	contentStyle?: React.CSSProperties
}

function Layout(props: Props) {
	const {menuExtraRender = () => <></>, menuItemRender = () => undefined} = props;
	const {site_info} = configStore();

	return (
		<ProLayout
			title={site_info?.title}
			logo={site_info?.logo}
			layout="mix"
			splitMenus={false}
			contentWidth="Fluid"
			fixedHeader
			fixSiderbar
			headerRender={HeaderRender}
			contentStyle={props.contentStyle || {
				height: 'calc(100vh - 56px)',
			}}
			siderMenuType="group"
			style={{
				background: '#fff'
			}}
			menu={{
				hideMenuWhenCollapsed: true,
				locale: false,
				collapsedShowGroupTitle: false
			}}
			suppressSiderWhenMenuEmpty
			siderWidth={300}
			menuExtraRender={menuExtraRender}
			menuItemRender={menuItemRender}
			route={props.route}
			menuDataRender={props.menuDataRender}
			avatarProps={{
				src: avatar,
				size: 'small',
				render: (props, dom) => <>{dom}</>
			}}
			menuFooterRender={props.menuFooterRender}
			menuProps={props.menuProps}
			breadcrumbRender={() => []}
		>
			{props.children}
		</ProLayout>
	)
}

export default Layout;
