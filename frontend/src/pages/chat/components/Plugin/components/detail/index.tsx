import React, {useEffect, useState} from 'react';
import {Avatar, Button, Divider, message, Space, Spin} from 'antd';
import {ProCard} from '@ant-design/pro-components';
import {useTranslation} from 'react-i18next';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import mila from 'markdown-it-link-attributes';
import mdKatex from '@traptitech/markdown-it-katex';
import styles from './index.module.less';
import {LeftCircleTwoTone} from '@ant-design/icons';
import {pluginStore} from '../../store';
import {getPlugin, installPlugin, uninstallPlugin} from '@/request/api';
import {userStore} from '@/store';

function PluginDetail() {
  const {t} = useTranslation();
  const [data, setData] = useState<any>({});
  const [spinning, setSpinning] = useState<boolean>(true);
  const [updateBlock, currentPluginId] = pluginStore(state => [state.updateBlock, state.currentPluginId]);
  const userInfo = userStore(state => state.user_info);

  function highlightBlock(str: string, lang: string) {
    return `<pre class="code-block-wrapper"><div class="code-block-header"><code class="hljs code-block-body ${lang}">${str}</code></pre>`
  }

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    highlight(code, language) {
      const validLang = !!(language && hljs.getLanguage(language))
      if (validLang) {
        const lang = language ?? ''
        return highlightBlock(hljs.highlight(code, {language: lang}).value, lang)
      }
      return highlightBlock(hljs.highlightAuto(code).value, '')
    }
  })

  md.use(mila, {attrs: {target: '_blank', rel: 'noopener'}})
  md.use(mdKatex, {blockClass: 'katex-block', errorColor: ' #cc0000', output: 'mathml'})

  useEffect(() => {
    if (!currentPluginId) return;
    getPlugin(currentPluginId).then(res => {
      const {data} = res;
      if (data) {
        data.description = md.render(data.description);
        if (data.functions && data.functions.length > 0) {
          data.functions = data.functions.map((item: any) => {
            return {
              ...item,
              script: md.render('```js\n' + item.script + '\n```')
            }
          })
        }
        setData(data);
        setSpinning(false);
      }
    });
  }, [currentPluginId]);

  const handleInstallPlugin = () => {
    installPlugin(data.id).then((res) => {
      if (res.code) return;
      message.success(t('安装成功'));
      setData({...data, installed: true});
    })
  }

  const handleUninstallPlugin = () => {
    uninstallPlugin(data.id).then((res) => {
      if (res.code) return;
      message.success(t('卸载成功'));
      setData({...data, installed: false});
    })
  }

  return (
    <Spin spinning={spinning}>
      <div className={styles.plugin_detail}>
        <div className={styles.plugin_detail_header}>
          <Space>
            {/*返回按钮*/}
            <Button style={{padding: '4px 0'}} type="text" onClick={() => updateBlock('main')}>
              <LeftCircleTwoTone style={{fontSize: 20}} />
            </Button>
            <Avatar size={40} className="plugin_avatar" src={data.avatar} />
            <span style={{fontSize: '20px'}}>{data.name}</span>
          </Space>
          <Space>
            <Button
              type="primary"
              onClick={data.installed ? handleUninstallPlugin : handleInstallPlugin}
            >
              {data.installed ? t('卸载') : t('安装')}
            </Button>
            {userInfo?.id === data.creator_id && (
              <Button onClick={() => updateBlock('edit')}>{t('编辑')}</Button>
            )}
          </Space>
        </div>
        <Divider />
        <div className={styles.plugin_detail_functions}>
          <h3>{t('方法列表')}</h3>
          {data.functions?.map((item: any, index: number) => (
            <ProCard
              key={item.id}
              title={item.name}
              headerBordered
              collapsible
              defaultCollapsed
              wrap
            >
              <ProCard type="inner">
                {item.description}
              </ProCard>
              <ProCard type="inner">
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.script || '',
                  }}
                />
              </ProCard>
            </ProCard>
          ))}
        </div>
        <Divider />
        <div className={styles.plugin_detail_description}>
          <div
            dangerouslySetInnerHTML={{
              __html: data.description || '',
            }}
          />
        </div>
      </div>
    </Spin>
  )
}

export default PluginDetail;
