import React, {useEffect, useMemo, useRef} from 'react'
import {copyToClipboard, joinTrim} from '@/utils'
import styles from './index.module.less'
import OpenAiLogo from '@/components/OpenAiLogo'
import {Avatar, message, Popconfirm, Space, Steps} from 'antd'

import MarkdownIt from 'markdown-it'
import mdKatex from '@traptitech/markdown-it-katex'
import mila from 'markdown-it-link-attributes'
import hljs from 'highlight.js'
import {DeleteOutlined, LoadingOutlined} from '@ant-design/icons'

import gpt4png from '@/assets/gpt4.png';
import gpt3png from '@/assets/gpt3.png';
import gptheaderpng from '@/assets/header.png';
import {ChatPlugin} from '@/types';
import DefaultPluginAvatar from '@/components/DefaultPluginAvatar';

function ChatMessage({
                       position,
                       content,
                       status,
                       time,
                       model,
                       plugins,
                       onDelChatMessage
                     }: {
  position: 'left' | 'right'
  content?: string
  status: 'pass' | 'loading' | 'error' | string
  time: string
  model?: string
  plugins?: ChatPlugin[]
  onDelChatMessage?: () => void
}) {
  const copyMessageKey = 'copyMessageKey'
  const markdownBodyRef = useRef<HTMLDivElement>(null)

  function addCopyEvents() {
    if (markdownBodyRef.current) {
      const copyBtn = markdownBodyRef.current.querySelectorAll('.code-block-header__copy')
      copyBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
          const code = btn.parentElement?.nextElementSibling?.textContent
          if (code) {
            copyToClipboard(code)
              .then(() => {
                message.open({
                  key: copyMessageKey,
                  type: 'success',
                  content: '复制成功'
                })
              })
              .catch(() => {
                message.open({
                  key: copyMessageKey,
                  type: 'error',
                  content: '复制失败'
                })
              })
          }
        })
      })
    }
  }

  function removeCopyEvents() {
    if (markdownBodyRef.current) {
      const copyBtn = markdownBodyRef.current.querySelectorAll('.code-block-header__copy')
      copyBtn.forEach((btn) => {
        btn.removeEventListener('click', () => {
          // ==== 无需操作 ====
        })
      })
    }
  }

  function highlightBlock(str: string, lang: string, code: string) {
    return `<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">${lang}</span><span class="code-block-header__copy">复制代码</span></div><code class="hljs code-block-body ${lang}">${str}</code></pre>`
  }

  const mdi = new MarkdownIt({
    html: true,
    linkify: true,
    highlight(code, language) {
      const validLang = !!(language && hljs.getLanguage(language))
      if (validLang) {
        const lang = language ?? ''
        return highlightBlock(hljs.highlight(code, {language: lang}).value, lang, code)
      }
      return highlightBlock(hljs.highlightAuto(code).value, '', code)
    }
  })

  mdi.use(mila, {attrs: {target: '_blank', rel: 'noopener'}})
  mdi.use(mdKatex, {blockClass: 'katex-block', errorColor: ' #cc0000', output: 'mathml'})

  const text = useMemo(() => {
    const value = content || ''
    return mdi.render(value)
  }, [content])

  useEffect(() => {
    addCopyEvents()
    return () => {
      removeCopyEvents()
    }
  }, [markdownBodyRef.current])

  function chatAvatar({icon, style}: { icon: string; style?: React.CSSProperties }) {
    return (
      <Space direction="vertical" style={{textAlign: 'center', ...style}}>
        <img className={styles.chat_message_avatar} src={icon} alt="" />
        {status === 'error' && (
          <Popconfirm
            title="删除此条消息"
            description="此条消息为发送失败消息，是否要删除?"
            onConfirm={() => {
              onDelChatMessage?.()
            }}
            onCancel={() => {
              // === 无操作 ===
            }}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{color: 'red'}} />
          </Popconfirm>
        )}
      </Space>
    )
  }

  const pluginAvatar = (plugin: ChatPlugin) => {
    return (
      <div className={styles.chat_message_content_plugin_icon}>
        {plugin.status === 'process' ? (<LoadingOutlined />) : plugin.avatar ? (
                  <Avatar
                    className="plugin_avatar"
                    src={plugin.avatar}
                    shape="square"
                    size="large"
                  />
                  ) : (<DefaultPluginAvatar />)
        }
      </div>
    )
  }

  return (
    <div className={styles.chat_message}
         style={{justifyContent: position === 'right' ? 'flex-end' : 'flex-start'}}
    >
      {position === 'left' &&
        chatAvatar({
          style: {marginRight: 8},
          icon: model && model.indexOf('gpt-4') !== -1 ? gpt4png : gpt3png
        })
      }
      <div className={styles.chat_message_content}>
        <span
          className={styles.chat_message_content_time}
          style={{
            textAlign: position === 'right' ? 'right' : 'left'
          }}
        >
          {time}
        </span>
        {plugins && position === 'left' && (
          <div className={styles.chat_message_content_plugin}>
            <Steps
              direction="vertical"
              size="small"
              current={plugins.length - 1}
              items={plugins?.map((plugin) => ({
                icon: pluginAvatar(plugin),
                title: plugin.name,
                subTitle: plugin.function?.name,
                description: plugin.function?.description,
                status: plugin.status
              }))}
            />
          </div>
        )}
        <div
          className={joinTrim([
            styles.chat_message_content_text,
            position === 'right' ? styles.right : styles.left
          ])}
        >
          {status === 'loading' ? (
            <OpenAiLogo rotate />
          ) : (
            <div
              ref={markdownBodyRef}
              className={'markdown-body'}
              dangerouslySetInnerHTML={{
                __html: text
              }}
            />
          )}
        </div>
      </div>
      {position === 'right' &&
        chatAvatar({
          style: {marginLeft: 8},
          icon: gptheaderpng
        })
      }
    </div>
  )
}

export default ChatMessage
