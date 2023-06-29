import styles from './index.module.less'
import {Button, Space, Switch, Tabs} from 'antd';
import {useTranslation} from 'react-i18next';
import PluginDetail from './components/detail';
import PluginList from './components/list';
import PluginEdit from './components/edit';
import {pluginStore} from './store';
import {useState} from 'react';
import {BugFilled} from '@ant-design/icons';
import useDocumentResize from '@/hooks/useDocumentResize';

function Plugin() {
	const {t} = useTranslation();
	const documentResize = useDocumentResize();
	const [tabKey, setTabKey] = useState('installed');
	const [block, updateBlock, debug, updateDebug] = pluginStore(state => [
		state.block,
		state.updateBlock,
		state.debug,
		state.updateDebug
	]);

	const tabItems = [
		{
			key: 'installed',
			label: t('已安装'),
			children: <PluginList type="installed"/>
		},
		{
			key: 'market',
			label: t('市场'),
			children: <PluginList type="market"/>
		},
		{
			key: 'my_plugin',
			label: t('我的插件'),
			children: <PluginList type="my_plugin"/>
		},
	]

	return (
		<div className={styles.plugin}>
			{block === 'main' && (
				<div className={styles.plugin_home}>
					<Tabs
						defaultActiveKey={tabKey}
						onChange={(key) => setTabKey(key)}
						tabBarExtraContent={(
							<Space>
								{documentResize.width > 768 && (
									<Switch
										checked={debug}
										onChange={(c) => updateDebug(c)}
										checkedChildren={<BugFilled/>}
										// unCheckedChildren={t('关闭')}
									/>
								)}
								<Button type="primary" onClick={() => updateBlock('edit')}>{t('创建插件')}</Button>
							</Space>
						)}
						items={tabItems}
					/>
				</div>
			)}
			{block === 'detail' && (
				<PluginDetail/>
			)}
			{block === 'edit' && (
				<PluginEdit/>
			)}
		</div>
	);
}

export default Plugin;
