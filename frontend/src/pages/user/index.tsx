import styles from './index.module.less';
import menu_list from "@/routers/menu_list";
import React, {Suspense, useState} from "react";
import {Link, Outlet} from "react-router-dom";
import {PageContainer, ProLayout} from "@ant-design/pro-components";
import HeaderRender from "@/components/HeaderRender";
import {useTranslation} from "react-i18next";

function User() {
	const [pathname, setPathname] = useState('');
	const {t} = useTranslation()

	return (
		<div className={styles.user}>
			<ProLayout
				title={import.meta.env.VITE_APP_TITLE}
				logo={import.meta.env.VITE_APP_LOGO}
				layout="mix"
				splitMenus={false}
				contentWidth="Fluid"
				fixedHeader
				fixSiderbar
				headerRender={HeaderRender}
				contentStyle={{
					height: '100%',
					minHeight: 'calc(100vh - 64px)',
					background: '#fff'
				}}
				menu={{
					locale: false,
					collapsedShowGroupTitle: false,
				}}
				siderMenuType="group"
				route={menu_list.user}
				onPageChange={(location) => {
					setPathname(`${location?.pathname}`)
				}}
				menuDataRender={(menuData) => {
					return menuData.map((item) => {
						item.name = t(item.name!)!
						return item
					});
				}}
				menuItemRender={(item, dom) => (
					<Link key={item.path} to={`${item.path}`}
						  onClick={() => setPathname(item.path || '/user/center')}>
						{dom}
					</Link>
				)}
			>
				<PageContainer>
					<Suspense>
						<Outlet/>
					</Suspense>
				</PageContainer>
			</ProLayout>
		</div>
	)
}

export default User;
