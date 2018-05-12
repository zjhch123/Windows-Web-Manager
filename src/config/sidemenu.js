export default [
  {
    name: '首页',
    key: 'index',
    icon: 'home',
    path: '/index',
    component: require('@routes/index/index.js').default
  },
  {
    name: '项目管理',
    key: 'project',
    icon: 'profile',
    hasSub: true,
    sub: [
      {
        name: '新建项目',
        key: 'new',
        path: '/project/new',
        component: require('@routes/project/new/index.js').default
      },
      {
        name: '项目列表',
        key: 'list',
        path: '/project/list',
        exact: true,
        component: require('@routes/project/list/index.js').default
      },
      {
        name: '修改项目',
        hidden: true,
        key: 'edit',
        path: '/project/list/edit/:id'
      }
    ]
  },
  {
    name: '环境配置',
    key: 'env',
    icon: 'laptop',
    hasSub: true,
    sub: [
      {
        name: '运行环境',
        key: 'runtime',
        path: '/env/runtime',
        exact: true,
        component: require('@routes/env/runtime/index.js').default
      },
      {
        name: '修改环境配置',
        key: 'update',
        hidden: true,
        path: '/env/runtime/:env'
      },
      {
        name: '文件管理',
        key: 'file_manage',
        path: '/env/file_manage',
        component: require('@routes/env/file_manage/index.js').default
      },
      {
        name: '一级路径',
        key: 'router',
        exact: true,
        path: '/env/router',
        component: require('@routes/env/router/index.js').default
      },
      {
        name: '一级路径',
        key: 'edit_router',
        exact: true,
        hidden: true,
        path: '/env/router/edit/:id',
      }
    ]
  },
  {
    name: '服务管理',
    key: 'service',
    icon: 'database',
    hasSub: true,
    sub: [
      {
        name: '系统服务',
        key: 'system',
        path: '/service/system'
      },
      {
        name: 'HTTP服务',
        key: 'http',
        path: '/service/http'
      },
      {
        name: '数据库服务',
        key: 'db',
        path: '/service/db'
      }
    ]
  },
  {
    name: '系统工具',
    key: 'setting',
    icon: 'setting',
    hasSub: true,
    sub: [
      {
        name: '用户管理',
        key: 'user',
        path: '/setting/user'
      },
      {
        name: '开机启动脚本',
        key: 'startup_script',
        path: '/setting/startup_script'
      },
      // {
      //   name: '时间设置',
      //   key: 'time',
      //   path: '/setting/time'
      // },
      {
        name: '重启服务器',
        key: 'restart',
        path: '/setting/restart'
      },
    ]
  },
]