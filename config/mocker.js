const proxy = {
  'POST /api/login': { code: 200, token: '123abc' },
  'GET /api/getInfo': {
    code: 200, result: {
      time: {
        system: 1523371675612,
        start: 1513371675612,
        run: 100000000,
        free: 12345678,
      },
      cpu: 40,
      project: {
        total: 10,
        run: 9,
        dead: 1
      },
      memory: {
        total: 1800,
        used: 1700,
        free: 100,
        buffers: 40.1,
        cached: 130
      },
      storage: {
        total: 40,
        used: 25,
        free: 15
      }
    }
  },
  'GET /api/getProjects': {
    code: 200,
    result: {
      page: 1,
      total: 18,
      data: [
        {
          id: 1,
          name: '测试项目1',
          createTime: 1513371675612,
          updateTime: 1512371675612,
          status: 1,
          url: 'http://139.129.132.196:8888'
        },
        {
          id: 2,
          name: '测试项目2',
          createTime: 1513371675612,
          updateTime: 1512371675612,
          status: 0,
          url: 'http://139.129.132.196:8888'
        },
        {
          id: 3,
          name: '测试项目3',
          createTime: 1513371675612,
          updateTime: 1512371675612,
          status: 1,
          url: 'http://139.129.132.196:8888'
        },
        {
          id: 4,
          name: '测试项目4',
          createTime: 1513371675612,
          updateTime: 1512371675612,
          status: 0,
          url: 'http://139.129.132.196:8888'
        },
        {
          id: 5,
          name: '测试项目5',
          createTime: 1513371675612,
          updateTime: 1512371675612,
          status: 1,
          url: 'http://139.129.132.196:8888'
        },
        {
          id: 6,
          name: '测试项目6',
          createTime: 1513371675612,
          updateTime: 1512371675612,
          status: 0,
          url: 'http://139.129.132.196:8888'
        },
        {
          id: 7,
          name: '测试项目6',
          createTime: 1513371675612,
          updateTime: 1512371675612,
          status: 0,
          url: 'http://139.129.132.196:8888'
        },
        {
          id: 8,
          name: '测试项目6',
          createTime: 1513371675612,
          updateTime: 1512371675612,
          status: 0,
          url: 'http://139.129.132.196:8888'
        },
        {
          id: 9,
          name: '测试项目6',
          createTime: 1513371675612,
          updateTime: 1512371675612,
          status: 0,
          url: 'http://139.129.132.196:8888'
        },
        {
          id: 10,
          name: '测试项目6',
          createTime: 1513371675612,
          updateTime: 1512371675612,
          status: 0,
          url: 'http://139.129.132.196:8888'
        },
      ]
    }
  },
  'POST /api/addProject': {
    code: 200,
    message: 'Add Success!',
    result: {
      url: 'http://139.129.132.196:8888'
    }
  },
  'GET /api/getProject': {
    code: 200,
    message: 'success',
    result: {
      projectName: '鉴势 - 工控系统信息安全核查及态势感知系统',
      firstPath: 'https://vis.hdusplus.xyz',
      secondPath: '',
      indexPage: 'index.html',
      scriptURL: 'https://static.hduzplus.xyz/inject.js',
      status: 0
    }
  }
}

module.exports = proxy