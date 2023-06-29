import { useMemo, useState } from 'react'
import { promptStore } from '@/store'
import { paginate } from '@/utils'
import { Button, Empty, Form, Input, Pagination, Space, message } from 'antd'
import styles from './index.module.less'
import { PromptInfo } from '@/types'
import { DeleteOutlined, FormOutlined } from '@ant-design/icons'
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components'
import { useTranslation } from 'react-i18next'

function RoleLocal() {
  const { t } = useTranslation()
  const { localPrompt, clearPrompts, addPrompts, delPrompt, editPrompt } = promptStore()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(9)
  const [keyword, setKeyword] = useState('')

  const [promptInfoform] = Form.useForm<PromptInfo>()
  const [promptInfoModal, setPromptInfoModal] = useState<
    PromptInfo & { open: boolean; oldKey: string }
  >({
    oldKey: '',
    open: false,
    key: '',
    value: ''
  })

  const [addPromptJson, setAddPromptJson] = useState(false)

  const filterListByKeyOrValue = (list: Array<PromptInfo>, keyword: string) => {
    if (!keyword) return list
    return list.filter((item) => item.key.includes(keyword) || item.value.includes(keyword))
  }

  function promptCard(info: PromptInfo) {
    return (
      <div key={info.key} className={styles.promptCard}>
        <div className={styles.promptCard_content}>
          <p>{info.key}</p>
          <span>{info.value}</span>
        </div>
        <div className={styles.promptCard_operate}>
          <DeleteOutlined
            onClick={() => {
              delPrompt(info)
              message.success(t('删除成功') + ' 👌')
            }}
          />
          <FormOutlined
            onClick={() => {
              promptInfoform.setFieldsValue({
                key: info.key,
                value: info.value
              })
              setPromptInfoModal((p) => {
                return {
                  key: info.key,
                  value: info.value,
                  open: true,
                  oldKey: info.key
                }
              })
            }}
          />
        </div>
      </div>
    )
  }

  const list = useMemo(() => {
    const newList = keyword ? [...filterListByKeyOrValue(localPrompt, keyword)] : [...localPrompt]
    return [...paginate(newList, page, pageSize)]
  }, [page, keyword, localPrompt])

  const paginationTotal = useMemo(() => {
    const list = keyword ? filterListByKeyOrValue(localPrompt, keyword) : localPrompt
    return list.length
  }, [keyword, localPrompt])

  const exportPromptTemplate = (data: Array<any>) => {
    if (data.length <= 0) {
      message.warning(t('暂无数据！') + ' 🚗')
      return
    }
    const jsonDataStr = JSON.stringify(data)
    const blob = new Blob([jsonDataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'ChatGPTPromptTemplate.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className={styles.roleLocal}>
      <Space size="small" direction="vertical" style={{ width: '100%' }}>
        <div className={styles.roleLocal_operate}>
          <Space wrap>
            <Button
              danger
              type="dashed"
              onClick={() => {
                clearPrompts()
              }}
            >
              {t('清空')}
            </Button>
            <Button
              onClick={() => {
                exportPromptTemplate(localPrompt)
              }}
            >
              {t('导出')}
            </Button>
            <Button
              onClick={() => {
                setAddPromptJson(true)
              }}
            >
              {t('导入')}
            </Button>
            <Button
              type="primary"
              onClick={() => {
                promptInfoform.setFieldsValue({
                  key: '',
                  value: ''
                })
                setPromptInfoModal((p) => {
                  return {
                    key: '',
                    value: '',
                    open: true,
                    oldKey: ''
                  }
                })
              }}
            >
              {t('添加')}
            </Button>
            <Input
              placeholder={t('搜索关键词')!}
              onChange={(e) => {
                setPage(1)
                setKeyword(e.target.value)
              }}
            />
          </Space>
        </div>
        {list.map((item) => {
          return promptCard({ ...item })
        })}
        {list.length <= 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无数据" />}
        <div className={styles.roleLocal}>
          <Pagination
            showSizeChanger={false}
            current={page}
            defaultPageSize={pageSize}
            total={paginationTotal}
            hideOnSinglePage
            onChange={(e) => {
              setPage(e)
            }}
            size="small"
          />
        </div>
      </Space>

      <ModalForm<PromptInfo>
        title={t('角色信息')}
        open={promptInfoModal.open}
        form={promptInfoform}
        onOpenChange={(visible) => {
          setPromptInfoModal((p) => {
            return {
              ...p,
              open: visible
            }
          })
        }}
        onFinish={async (values) => {
          if (!(values.key && values.value)) {
            return false
          }
          if (promptInfoModal.oldKey) {
            // 修改
            editPrompt(promptInfoModal.oldKey, { ...values })
            message.success(t('修改成功') + ' 👌')
          } else {
            addPrompts([
              {
                key: values.key,
                value: values.value
              }
            ])
            message.success(t('新增成功') + ' 👌')
          }
          return true
        }}
        width={500}
        modalProps={{
          cancelText: t('取消'),
          okText: t('提交'),
          maskClosable: false
        }}
      >
        <ProFormText
          width="lg"
          name="key"
          label={t('标题')}
          rules={[{ required: true, message: t('请输入标题!')! }]}
        />
        <ProFormTextArea
          width="lg"
          name="value"
          label="内容"
          rules={[{ required: true, message: t('请输入内容!')! }]}
        />
      </ModalForm>

      {/* 导入数据 */}
      <ModalForm
        title={t('批量新增角色信息')}
        open={addPromptJson}
        onOpenChange={(visible) => {
          setAddPromptJson(visible)
        }}
        onFinish={async (values) => {
          try {
            const value = JSON.parse(values.value)
            if (Array.isArray(value)) {
              if ('key' in value[0] && 'value' in value[0]) {
                addPrompts([...value])
              } else if ('act' in value[0] && 'prompt' in value[0]) {
                const newJsonData = value.map((item: { act: string; prompt: string }) => {
                  return {
                    key: item.act,
                    value: item.prompt
                  }
                })
                addPrompts([...newJsonData])
              } else {
                throw Error('data format error 1')
              }
            } else {
              throw Error('data format error 2')
            }
          } catch (error) {
            console.log(error)
            message.error(t('数据格式错误') + ' 🙅')
            return false
          }
          return true
        }}
        width={500}
        modalProps={{
          cancelText: t('取消'),
          okText: t('提交'),
          maskClosable: false,
          destroyOnClose: true
        }}
      >
        <ProFormTextArea
          width="lg"
          name="value"
          label={t('角色数据')}
          rules={[{ required: true, message: t('请输入内容!')! }]}
          placeholder={t('请输入要导入的JSON 格式为: [{key:\'标题\',value:\'内容\'}]')!}
          fieldProps={{
            autoSize: {
              minRows: 4,
              maxRows: 24
            }
          }}
        />
        <span>
          {t('请先在')}{' '}
          <a href="https://www.json.cn/" target="_blank" rel="noreferrer">
            https://www.json.cn/
          </a>{' '}
          {t('验证正确后在进行导入。')}
        </span>
      </ModalForm>
    </div>
  )
}

export default RoleLocal
