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
  }
}

module.exports = proxy