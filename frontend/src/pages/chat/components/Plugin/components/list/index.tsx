import styles from './index.module.less';
import {ProList} from '@ant-design/pro-components';
import {useTranslation} from 'react-i18next';
import React, {useEffect, useState} from 'react';
import {Avatar, Button, message, Space, Tag, Typography} from 'antd';
import {getPlugins, installPlugin, releasePlugin, uninstallPlugin} from '@/request/api';
import {pluginStore} from '../../store';
import {PluginInfo} from '@/types';

interface PluginListInfo extends PluginInfo {
  installed: boolean
}

function PluginList({type}: { type: string }) {

  const {t} = useTranslation();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PluginListInfo[]>([]);
  const [block, updateBlock, updateCurrentPluginId] = pluginStore(state => [
    state.block,
    state.updateBlock,
    state.updateCurrentPluginId
  ]);

  const fetchList = () => {
    getPlugins({page: page, page_size: 6, type: type}).then(res => {
      if (res.code) return;
      setTotal(res.data.count);
      // @ts-ignore
      setData(res.data.rows as PluginListInfo[]);
      setLoading(false);
    });
  }

  useEffect(() => {
    fetchList();
  }, [block, page, type]);

  const updateInstalled = (id: string, installed: boolean) => {
    data.forEach((item) => {
      if (item.id === id) {
        item.installed = installed;
      }
    });
    setData([...data]);
  }

  const updateReleased = (id: string, released: boolean) => {
    data.forEach((item) => {
      if (item.id === id) {
        item.status = released ? 1 : 0;
      }
    });
    setData([...data]);
  }

  const handleInstallPlugin = (row: any) => {
    installPlugin(row.id).then((res) => {
      if (res.code) return;
      message.success(t('安装成功'));
      updateInstalled(row.id, true);
    })
  }

  const handleUninstallPlugin = (row: any) => {
    uninstallPlugin(row.id).then((res) => {
      if (res.code) return;
      message.success(t('卸载成功'));
      updateInstalled(row.id, false);
    })
  }

  const handleReleasePlugin = (row: any) => {
    releasePlugin(row.id).then((res) => {
      if (res.code) return;
      message.success(t('发布成功'));
      updateReleased(row.id, true);
    })
  }

  const extractMarkdownText = (markdown: string, length: number): string => {
    // 去除Markdown语法，保留纯文本
    const plainText = markdown.replace(/[#*_]+/g, '').trim();
    // 提取指定长度的纯文本
    return plainText.substring(0, length);
  }

  return (
    <div className={styles.plugin_list}>
      <ProList
        pagination={{
          pageSize: 6,
          showSizeChanger: false,
          current: page,
          total: total,
          onChange: (page) => {
            setPage(page);
          }
        }}
        showActions="hover"
        grid={{gutter: 8, column: 2, xs: 1}}
        onItem={(item) => {
          return {
            onClick: () => {
              updateBlock('detail');
              updateCurrentPluginId(item.id as string);
            }
          };
        }}
        metas={{
          id: {
            dataIndex: 'id',
          },
          title: {
            dataIndex: 'name',
            render: (value, row) => {
              return (
                <span style={{marginLeft: '5px', lineHeight: '40px', width: 'max-content'}}>
                  {value}
                </span>
              );
            }
          },
          subTitle: {
            render: (_, row) => {
              return (
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <Tag color="blue">{row?.creator?.nickname}</Tag>
                  <Tag color="lime">{row.update_time}</Tag>
                </div>
              );
            }
          },
          avatar: {
            render: (value, row) => {
              return (
                <Avatar className="plugin_avatar" size={40} src={row.avatar} />
              )
            }
          },
          content: {
            dataIndex: 'description',
            render: (value, row) => {
              return (
                <div>
                  <Typography.Paragraph ellipsis={{rows: 2}} style={{height: '44px'}}>
                    {extractMarkdownText(row.description, 150)}
                  </Typography.Paragraph>
                </div>
              );
            }
          },
          actions: {
            cardActionProps: 'actions',
            render: (_, row) => {
              return (
                <Space.Compact block>
                  <Button
                    type="text"
                    style={{width: '50%'}}
                    key="run"
                    onClick={() => {
                      row.installed ? handleUninstallPlugin(row) : handleInstallPlugin(row);
                    }}
                  >
                    {row.installed ? t('卸载') : t('安装')}
                  </Button>
                  {type === 'my_plugin' && row.status === 0 && (
                    <Button
                      style={{width: '50%'}}
                      type="text"
                      key="release"
                      onClick={() => {
                        handleReleasePlugin(row)
                      }}
                    >
                      {t('发布')}
                    </Button>
                  )}
                </Space.Compact>
              );
            }
          }
        }}
        loading={loading}
        dataSource={data}
      />
    </div>
  )
}

export default PluginList;
