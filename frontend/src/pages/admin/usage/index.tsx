import {getAdminMessages, getAdminUsage} from '@/request/adminApi';
import {ApiKeyUsageInfo, MessageInfo} from '@/types/admin';
import {ActionType, ProColumns, ProHelpModal} from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import {Modal, Space, Tag} from 'antd';
import { useRef} from 'react';

function UsagePage() {

    const tableActionRef = useRef<ActionType>();
    const columns: ProColumns<ApiKeyUsageInfo>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 80,
        },
        {
            title: '用户账号',
            width: 180,
            dataIndex: 'user_id',
            render: (_, data) => {
                if (!data.user_id) return '-'
                return (
                    <p>{data.user?.account}</p>
                )
            }
        },
        {
            title: '模型',
            dataIndex: 'model',
            width: 180,
            render: (_, data)=><Tag color={data.model.includes('gpt-4') ? 'purple' : ''}>{data.model}</Tag>
        },
        {
            title: 'tokens(prompt + completion)',
            render: (_, data)=> {
				return (
					<span>{data.prompt_tokens} + {data.completion_tokens} = {data.prompt_tokens + data.completion_tokens}</span>
				)
			}
        },
        {
            title: '消耗积分',
            dataIndex: 'integral',
			render: (_, data)=> {
				return (
					<span>{data.prompt_integral} + {data.completion_integral} = {data.prompt_integral + data.completion_integral}</span>
				)
			}
        },
        {
            title: '创建时间',
            width: 200,
            dataIndex: 'create_time',
        },
		{
			title: '请求响应',
			dataIndex: 'response',
			render: (_, data)=> {
				return (
					<Space>
						<a key={data.id + '_request'} onClick={() => showContentModal(data.request || '')}>请求</a>
						<a key={data.id + '_response'} onClick={() => showContentModal(data.response || '')}>响应</a>
					</Space>
				)
			}
		},
    ];

	function showContentModal(content: any) {
		// content为{data:[],type:Buffer} blob 转 string
		if (content?.type === 'Buffer' && content?.data) {
			content = String.fromCharCode.apply(null, content.data);
		} else {
			content = content.toString();
		}
		let isJson = false;
		try {
			content = JSON.stringify(JSON.parse(content), null, 4);
			isJson = true;
		} catch (error) {

		}
		// 转换\n\n为换行符，转换\t为4个空格，转换\"为"，去除第一个"和最后一个"
		content = content.replace(/\\n\\n/g, '\n')
			.replace(/\\t/g, '    ')
			.replace(/\\"/g, '"')
			.replace(/^"/, '')
			.replace(/"$/, '');

		Modal.info({
			title: '请求内容',
			content: (
				<div>
					{isJson ? <pre style={{maxHeight: 600, overflow: 'auto'}}>{content}</pre>
						// @ts-ignore
						: <pre style={{maxHeight: 600, overflow: 'auto', whiteSpace: "pre-line"}}>{content}</pre>
					}
				</div>
			),
			okText: '关闭',
			width: 800,
		});
	}

    return (
        <div>
            <ProTable
                actionRef={tableActionRef}
                columns={columns}
                // scroll={{
                //     x: 1800
                // }}
                request={async (params, sorter, filter) => {
                    // 表单搜索项会从 params 传入，传递给后端接口。
                    const res = await getAdminUsage({
                        page: params.current || 1,
                        page_size: params.pageSize || 10,
                    });
                    return Promise.resolve({
                        data: res.data.rows,
                        total: res.data.count,
                        success: true,
                    });
                }}
                toolbar={{
                    actions: [],
                }}
                rowKey="id"
                search={false}
                bordered
            />
        </div>
    )
}

export default UsagePage;
