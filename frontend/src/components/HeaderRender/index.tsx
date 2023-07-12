import React, { useEffect, useMemo, useState } from 'react'
import { HeaderViewProps } from '@ant-design/pro-layout/es/components/Header'
import styles from './index.module.less'
import {
  AppstoreOutlined,
  CloudSyncOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  PayCircleOutlined,
  ReconciliationOutlined,
  SyncOutlined,
  UserOutlined,
  WalletOutlined,
  TranslationOutlined
} from '@ant-design/icons'
import { userStore } from '@/store'
import { Avatar, Button, Dropdown, MenuProps } from 'antd'
import { getEmailPre } from '@/utils'
import MenuList from '../MenuList'
import {Link, useNavigate} from 'react-router-dom'
import { fetchUserInfo } from '@/store/user/async'
import { useTranslation } from 'react-i18next'

function HeaderRender(props: HeaderViewProps, defaultDom: React.ReactNode) {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  const { language, token, user_info, logout, setLoginModal, setLanguage } = userStore()

  const renderLogo = useMemo(() => {
    if (typeof props.logo === 'string') return <img src={props.logo} />
    return <>{props.logo}</>
  }, [props.logo])

  useEffect(() => {
    onRefreshBalance()
  }, [token])

  const [balance, setBalance] = useState<{
    number: string | number
    loading: boolean
  }>({
    number: 0,
    loading: false
  })

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language)
    setLanguage(language)
  }

  const handleLanguageMenuClick: MenuProps['onClick'] = (e) => {
    changeLanguage(e.key as string);
  };

  const languageMenu = {
    items: [
      {
        key: 'zh_CN',
        label: '简体中文',
      },
      {
        key: 'en_US',
        label: 'English',
      }
    ],
    onClick: handleLanguageMenuClick,
    selectedKeys: [language]
  }

  function onRefreshBalance() {
    setBalance((b) => ({ ...b, loading: true }))
    if (token) {
      // 获取用户信息
      fetchUserInfo()
        .then((res) => {
          if (res.code) return
          setBalance((b) => ({ ...b, number: res.data.integral, loading: false }))
        })
        .finally(() => {
          setBalance((b) => ({ ...b, loading: false }))
        })
    } else {
      setBalance((b) => ({ ...b, loading: false }))
    }
  }

  return (
    <div className={styles.header}>
      {props.isMobile && props.hasSiderMenu && (
        <MenuUnfoldOutlined
          className={styles.header__menuIcon}
          onClick={() => props.onCollapse?.(!props.collapsed)}
        />
      )}
        <Link to={'/'} className={styles.header__logo}>
			{renderLogo}
        	{!props.isMobile && <h1>{props.title}</h1>}
		</Link>
      {!props.isMobile && <MenuList />}
      <div className={styles.header__actives}>
        <div>
          <Dropdown menu={languageMenu} placement="bottomRight" trigger={['click']}>
            <TranslationOutlined style={{marginRight: 10, fontSize: '18px'}} />
          </Dropdown>
        </div>
        {token ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Dropdown
              arrow
              placement="bottom"
              trigger={['click']}
              menu={{
                items: [
                  {
                    key: 'yonghuzhongxin',
                    icon: <UserOutlined />,
                    label: t('用户中心'),
                    onClick: () => {
                      navigate('/user/center')
                    }
                  },
                  {
                    key: 'wodeyue',
                    icon: <PayCircleOutlined />,
                    label: t('我的余额'),
                    onClick: () => {
                      navigate('/shop')
                    }
                  },
                  {
                    key: 'xiaofeijilu',
                    icon: <ReconciliationOutlined />,
                    label: t('消费记录'),
                    onClick: () => {
                      navigate('/shop')
                    }
                  },
                  {
                    key: 'tuichudenglu',
                    icon: <LogoutOutlined />,
                    label: t('退出登录'),
                    onClick: () => {
                      logout()
                      navigate('/login')
                    }
                  }
                ]
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <Avatar src={user_info?.avatar} />
                {!props.isMobile && (
                  <span
                    style={{
                      fontSize: 14,
                      color: '#999',
                      marginLeft: 4
                    }}
                  >
                    {getEmailPre(user_info?.account)}
                  </span>
                )}
              </div>
            </Dropdown>
            <div
              className={styles.header__balance}
              onClick={() => {
                onRefreshBalance()
              }}
            >
              <p>{t('余额：')} {balance.number}</p> <SyncOutlined spin={balance.loading} />
            </div>
          </div>
        ) : (
          <Button
            type="primary"
            className={styles.header__login}
            onClick={() => {
              setLoginModal(true)
            }}
          >
            {t('登录/注册')}
          </Button>
        )}
        {props.isMobile && (
          <Dropdown
            arrow
            placement="bottomRight"
            destroyPopupOnHide
            trigger={['click']}
            dropdownRender={() => {
              return <MenuList mode="inline" />
            }}
          >
            <div className={styles.header__actives_menu}>
              <AppstoreOutlined />
            </div>
          </Dropdown>
        )}
      </div>
    </div>
  )
}

export default HeaderRender
