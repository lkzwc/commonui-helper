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
