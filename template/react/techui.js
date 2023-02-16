/**
 * tecuUI 的模板定义
 */

export const component_table = (name) => `
import React from 'react';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProCard,
  ProFormDependency,
  ProFormGroup,
  ProFormList,
  ProFormSelect,
  ProFormText,
  ProTable,
} from '@alipay/tech-ui';

const ${name} = ({}: ${name}Props) => {
  const column:any[] =[
  {
    title: '负载名称',
    dataIndex: 'controllerName',
    hideInTable: true,
  },
  {
    title: '负载名称',
    dataIndex: 'controllerName',
    hideInTable: true,
  },
  {
    title: '日期',
    dataIndex: 'dateTime',
    hideInTable: true,
    render:(value)=>{
      return moment(value)
    }
  },
  {
    title: '负载类型',
    dataIndex: 'workloadKind',
    hideInSearch: true,
    valueEnum: {
      CronJob: 'CronJob',
      DaemonSet: 'DaemonSet',
      Deployment: 'Deployment',
      Job: 'Job',
    },
    render: (text: any, record: any) => {
      return (
        <Space>
          {record.name}
        </Space>
      );
    },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    render:(value)=>{
      return <DrawerForm title="详情信息" trigger={<a>详情展示</a>}>
        开发中
      </DrawerForm>
    }
  },
  ]

  return <ProTable
    columns={column}
    request={async (params) => {
      const res = await fetchRecommendation({
        cluster_id: props?.clusterID,
        ...params,
        controllerKinds: params.controllerName,
      });

      return {
        data: res?.data?.data ?? [],
        success: true,
        total: res?.data?.total ?? 0,
      };
    }}
    options={false}
  />
};
export default ${name};
`;

export const component_page_table = (name) => `
import React from 'react';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProCard,
  ProFormDependency,
  ProFormGroup,
  ProFormList,
  ProFormSelect,
  ProFormText,
  ProTable,
} from '@alipay/tech-ui';

const ${name} = ({}: ${name}Props) => {
  const column:any[] =[
  {
    title: '负载名称',
    dataIndex: 'controllerName',
    hideInTable: true,
  },
  {
    title: '负载名称',
    dataIndex: 'controllerName',
    hideInTable: true,
  },
  {
    title: '日期',
    dataIndex: 'dateTime',
    hideInTable: true,
    render:(value)=>{
      return moment(value)
    }
  },
  {
    title: '负载类型',
    dataIndex: 'workloadKind',
    hideInSearch: true,
    valueEnum: {
      CronJob: 'CronJob',
      DaemonSet: 'DaemonSet',
      Deployment: 'Deployment',
      Job: 'Job',
    },
    render: (text: any, record: any) => {
      return (
        <Space>
          {record.name}
        </Space>
      );
    },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    render:(value)=>{
      return <DrawerForm title="详情信息" trigger={<a>详情展示</a>}>
        开发中
      </DrawerForm>
    }
  },
  ]

  return <PageContainer>
        <ProTable
        columns={column}
        request={async (params) => {
          const res = await fetchRecommendation({
            cluster_id: props?.clusterID,
            ...params,
            controllerKinds: params.controllerName,
          });

          return {
            data: res?.data?.data ?? [],
            success: true,
            total: res?.data?.total ?? 0,
          };
        }}
        options={false}
      />
  </PageContainer>
};
export default ${name};
`;

export const component_modal = (name) => `
import React from 'react';
import {
  ModalForm,
  ProForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
  SearchSelect,
  ProFormText,
} from '@alipay/tech-ui';

const ${name} = ({}: ${name}Props) => <ModalForm
  layout="vertical"
  key="3"
  width={500}
  title={props.title}
  destroyOnClose
  onFinish={async (valuesPar) => {
    const values = {
      ...valuesPar,
      owner:
        valuesPar?.owner?.toString() ??
        props?.record?.Owners.map((item) => item.empId).toString(),
    };
    if (!props?.record) {
      await AddCloud(values).then((res) => {
        if (res.code === 200) {
          message.success('新增成功！');
        } else {
          message.success('新增过程发生错误,请联系管理员！');
        }
      });
    } else {
      await UpdateCloud({ ...values, id: props.record.Id }).then((res) => {
        console.log('res修改', res.code);
        if (res.code === 200) {
          message.success('修改成功！');
        } else {
          message.success("数据更新过程发生错误,请联系管理员！");
        }
      });
    }
    ref.current?.reload();
    return true;
  }}
  trigger={
    props.title === '新建产品' ? (
      <Button type="primary">
        <PlusOutlined />
        新建产品
      </Button>
    ) : (
      <a>修改</a>
    )
  }
  >
  <ProFormText
    name="name"
    label="产品名称"
    rules={[{ required: true, message: '这是必填项' }]}
    initialValue={props.record?.Name}
  />
  <Form.Item
    label="产品管理员"
    help="一个产品最多可以添加5个人管理员"
    name="owner"
    rules={[
      {
        required: true,
        message: '请选择产品管理员',
      },
    ]}
    initialValue={props?.record?.Owners.map((item) => item.empId)}
  >
    <
      multiple
      defaultValue={props?.record?.Owners.map((item) => item.empId)}
      defaultOptions={props?.record?.Owners.map((item) => ({
        label: item.nickName,
        value: item.empId,
      }))}
      labelInValue={false}
      maxTagCount={5}
      request={async (params) => {
        const res = await getProductsAdminister({ queryKey: params?.query });
        return res?.data?.map((item) => ({
          label: item.nickName,
          value: item.empId,
        }));
      }}
    />
  </Form.Item>
  <ProFormTextArea
    name="description"
    label="产品描述"
    initialValue={props.record?.description}
  />
</ModalForm>
`


export const component_procard = (name) => `
import React from 'react';
import {
  ModalForm,
  ProForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
  SearchSelect,
  ProFormText,
} from '@alipay/tech-ui';

const ${name} = ({}: ${name}Props) => <ProCard gutter={[10,10]}>
  <ProCard colSpan={12} layout="center" bordered>
  colSpan-12
  </ProCard>
  <ProCard colSpan={6} layout="center" bordered>
  colSpan-6
  </ProCard>
  <ProCard colSpan="30%" layout="center" bordered>
  colSpan-6
  </ProCard>
</Procard>
`
