const proxy = {
  'POST /api/login': { 
    code: 200, token: '123abc' 
  },
  'GET /api/system/info': {
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
  'GET /api/project/all': {
    code: 200,
    result: {
      page: 1,
      total: 18,
      data: [
        {
          id: 1, // 项目id
          name: '测试项目1', // 项目名
          createTime: 1513371675612, // 项目创建时间
          updateTime: 1512371675612, // 项目更新时间
          status: 1, // 项目状态
          url: 'http://139.129.132.196:8888' // 项目线上地址
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
  'POST /api/project/add': {
    code: 200,
    message: 'Add Success!',
    result: {
      url: 'http://139.129.132.196:8888'
    }
  },
  'POST /api/project/update': {
    code: 200,
    message: 'update Success!',
    result: {
      url: 'http://139.129.132.196:8888'
    }
  },
  'GET /api/project/get/1': {
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
  },
  'POST /api/project/changeStatus': {
    code: 200,
    message: 'success'
  },
  'POST /api/project/delete': {
    code: 200,
    message: 'success'
  },
  'GET /api/env/runtime': {
    code: 200,
    message: 'success',
    result: {
      platform: 'KVM',
      hostName: 'iZ28b1b52l9Z',
      publicVersion: 'CentOS 6.5 Final',
      coreVersion: 'Linux 2.6.32-431.23.3.el6.x86_64 #1 SMP Thu Jul 31 17:20:51 UTC 2014',
      cpuNum: 1,
      cpuCore: 'Intel(R) Xeon(R) CPU E5-2682 v4 @ 2.50GHz (64bit)'
    }
  },
  'GET /api/env/installed': {
    code: 200,
    message: 'success',
    result: [
      {
        name: 'Java',
        version: 'Java(TM) SE Runtime Environment (build 1.8.0_65-b17)'
      },
      {
        name: 'NodeJS',
        version: 'v8.9.0'
      },
      {
        name: 'Python',
        version: 'Python 2.7.3'
      },
      {
        name: 'PHP',
        version: 'version 5.7'
      },
      {
        name: 'httpd',
        version: 'Server version: Apache/2.2.15 (Unix)'
      },
      {
        name: 'mongoDB',
        version: 'MongoDB shell version: 3.2.13'
      },
      {
        name: 'mysql',
        version: '5.7.9'
      },
      {
        name: 'nginx',
        version: 'Server version: Nginx/1.2.3'
      },
    ]
  },
  'GET /api/env/services': {
    "code":200,"result":{"http":[{"name":"httpd","status":"running"},{"name":"nginx","status":null}],"ftp":[{"name":"vsftpd","status":null}],"sql":[{"name":"mysqld","status":null},{"name":"mongodb","status":null},{"name":"memcached","status":null}],"mail":[{"name":"sendmail","status":null}],"system":[{"name":"sshd","status":"running"},{"name":"crond","status":"running"},{"name":"iptables","status":"running"},{"name":"NTP","status":"running"}]}
  },
  'POST /api/env/services/install': {
    code: 200,
    message: 'success'
  },
  'GET /api/env/firstPath': {
    code: 200,
    message: 'success',
    result: [
        {
          id: 1,
          url: 'http://139.129.132.196:8888',
          absPath: '/var/www/static',
          num: 8,
          server: 'httpd'
        },
        {
          id: 2,
          url: 'http://vis.hduzplus.xyz:80',
          absPath: '/var/www/vis',
          num: 2,
          server: 'httpd'
        },
        {
          id: 3,
          url: 'https://vis.hduzplus.xyz:443',
          absPath: '/var/www/vis',
          num: 8,
          server: 'httpd'
        },
        {
          id: 4,
          url: 'https://static.hduzplus.xyz:443',
          absPath: '/var/www/Statics',
          num: 6,
          server: 'httpd'
        },
        {
          id: 5,
          url: 'https://zoe.hduzplus.xyz:443',
          absPath: '/var/www/zoe',
          num: 2,
          server: 'httpd'
        },
      ]
  },
  'POST /api/env/firstPath/add': {
    code: 200,
    message: 'success'
  },
  'GET /api/setting/users/all': {
    "message": "123", "code": 0, "result": [{"pw_dir": "/root", "pw_gid": 0, "pw_passwd": "x", "pw_gecos": "root", "n_unnamed_fields": 0, "n_sequence_fields": 7, "pw_shell": "/bin/bash", "pw_name": "root", "lock": false, "pw_gname": "root", "n_fields": 7, "pw_uid": 0}, {"pw_dir": "/bin", "pw_gid": 1, "pw_passwd": "x", "pw_gecos": "bin", "n_unnamed_fields": 0, "n_sequence_fields": 7, "pw_shell": "/sbin/nologin", "pw_name": "bin", "lock": true, "pw_gname": "bin", "n_fields": 7, "pw_uid": 1}, {"pw_dir": "/sbin", "pw_gid": 2, "pw_passwd": "x", "pw_gecos": "daemon", "n_unnamed_fields": 0, "n_sequence_fields": 7, "pw_shell": "/sbin/nologin", "pw_name": "daemon", "lock": false, "pw_gname": "daemon", "n_fields": 7, "pw_uid": 2}, {"pw_dir": "/var/adm", "pw_gid": 4, "pw_passwd": "x", "pw_gecos": "adm", "n_unnamed_fields": 0, "n_sequence_fields": 7, "pw_shell": "/sbin/nologin", "pw_name": "adm", "lock": false, "pw_gname": "adm", "n_fields": 7, "pw_uid": 3}, {"pw_dir": "/var/spool/lpd", "pw_gid": 7, "pw_passwd": "x", "pw_gecos": "lp", "n_unnamed_fields": 0, "n_sequence_fields": 7, "pw_shell": "/sbin/nologin", "pw_name": "lp", "lock": false, "pw_gname": "lp", "n_fields": 7, "pw_uid": 4}, {"pw_dir": "/sbin", "pw_gid": 0, "pw_passwd": "x", "pw_gecos": "sync", "n_unnamed_fields": 0, "n_sequence_fields": 7, "pw_shell": "/bin/sync", "pw_name": "sync", "lock": false, "pw_gname": "root", "n_fields": 7, "pw_uid": 5}, {"pw_dir": "/sbin", "pw_gid": 0, "pw_passwd": "x", "pw_gecos": "shutdown", "n_unnamed_fields": 0, "n_sequence_fields": 7, "pw_shell": "/sbin/shutdown", "pw_name": "shutdown", "lock": false, "pw_gname": "root", "n_fields": 7, "pw_uid": 6}, {"pw_dir": "/sbin", "pw_gid": 0, "pw_passwd": "x", "pw_gecos": "halt", "n_unnamed_fields": 0, "n_sequence_fields": 7, "pw_shell": "/sbin/halt", "pw_name": "halt", "lock": false, "pw_gname": "root", "n_fields": 7, "pw_uid": 7}, {"pw_dir": "/var/spool/mail", "pw_gid": 12, "pw_passwd": "x", "pw_gecos": "mail", "n_unnamed_fields": 0, "n_sequence_fields": 7, "pw_shell": "/sbin/nologin", "pw_name": "mail", "lock": false, "pw_gname": "mail", "n_fields": 7, "pw_uid": 8}, {"pw_dir": "/var/spool/uucp", "pw_gid": 14, "pw_passwd": "x", "pw_gecos": "uucp", "n_unnamed_fields": 0, "n_sequence_fields": 7, "pw_shell": "/sbin/nologin", "pw_name": "uucp", "lock": true, "pw_gname": "uucp", "n_fields": 7, "pw_uid": 10}, {"pw_dir": "/root", "pw_gid": 0, "pw_passwd": "x", "pw_gecos": "operator", "n_unnamed_fields": 0, "n_sequence_fields": 7, "pw_shell": "/sbin/nologin", "pw_name": "operator", "lock": false, "pw_gname": "root", "n_fields": 7, "pw_uid": 11}, {"pw_dir": "/usr/games", "pw_gid": 100, "pw_passwd": "x", "pw_gecos": "games", "n_unnamed_fields": 0, "n_sequence_fields": 7, "pw_shell": "/sbin/nologin", "pw_name": "games", "lock": false, "pw_gname": "users", "n_fields": 7, "pw_uid": 12}]
  },
  'GET /api/setting/groups/all': {
    "message": "123", "code": 0, "result": [{"gr_gid": 0, "gr_passwd": "x", "n_sequence_fields": 4, "n_unnamed_fields": 0, "gr_name": "root", "n_fields": 4, "gr_mem": []}, {"gr_gid": 1, "gr_passwd": "x", "n_sequence_fields": 4, "n_unnamed_fields": 0, "gr_name": "bin", "n_fields": 4, "gr_mem": ["bin", "daemon"]}, {"gr_gid": 2, "gr_passwd": "x", "n_sequence_fields": 4, "n_unnamed_fields": 0, "gr_name": "daemon", "n_fields": 4, "gr_mem": ["bin", "daemon"]}, {"gr_gid": 3, "gr_passwd": "x", "n_sequence_fields": 4, "n_unnamed_fields": 0, "gr_name": "sys", "n_fields": 4, "gr_mem": ["bin", "adm"]}, {"gr_gid": 4, "gr_passwd": "x", "n_sequence_fields": 4, "n_unnamed_fields": 0, "gr_name": "adm", "n_fields": 4, "gr_mem": ["adm", "daemon"]}, {"gr_gid": 5, "gr_passwd": "x", "n_sequence_fields": 4, "n_unnamed_fields": 0, "gr_name": "tty", "n_fields": 4, "gr_mem": []}, {"gr_gid": 6, "gr_passwd": "x", "n_sequence_fields": 4, "n_unnamed_fields": 0, "gr_name": "disk", "n_fields": 4, "gr_mem": []}, {"gr_gid": 7, "gr_passwd": "x", "n_sequence_fields": 4, "n_unnamed_fields": 0, "gr_name": "lp", "n_fields": 4, "gr_mem": ["daemon"]}, {"gr_gid": 8, "gr_passwd": "x", "n_sequence_fields": 4, "n_unnamed_fields": 0, "gr_name": "mem", "n_fields": 4, "gr_mem": []}, {"gr_gid": 9, "gr_passwd": "x", "n_sequence_fields": 4, "n_unnamed_fields": 0, "gr_name": "kmem", "n_fields": 4, "gr_mem": []}, {"gr_gid": 10, "gr_passwd": "x", "n_sequence_fields": 4, "n_unnamed_fields": 0, "gr_name": "wheel", "n_fields": 4, "gr_mem": []}]
  },
  'POST /api/setting/users/add': {
    code: 200, message: 'success'
  },
  'POST /api/setting/groups/add': {
    code: 200, message: 'success'
  },
  'POST /api/setting/groups/addUser': {
    code: 200, message: 'success'
  },
  'POST /api/setting/users/update': {
    code: 200, message: 'success'
  },
  'POST /api/setting/groups/update': {
    code: 200, message: 'success'
  },
  'POST /api/setting/users/delete': {
    code: 200, message: 'success'
  },
  'POST /api/setting/groups/delete': {
    code: 200, message: 'success'
  },
  'POST /api/setting/groups/delete/user': {
    code: 200, message: 'success'
  },
  'GET /api/setting/startup_script': {
    code: 200,
    message: 'success',
    result: `#!/bin/sh\ntouch ~/test\nsource /etc/profile\n\nsh /usr/local/tomcat/bin/catalina.sh start &\nnohup python /usr/local/vpsmate/server.py &\nforever start -o /var/www/screenshow_github_webhook/out.log /var/www/screenshow_github_webhook/deploy.js\nforever start -o /var/www/image/log/out.log -e /var/www/image/log/error.log /var/www/image/src/app.js\nforever start -o /var/www/zoe/log/out.log -e /var/www/zoe/log/error.log /var/www/zoe/app.js\nNODE_ENV=production forever start -o /var/www/Homepage/log/out.log -e /var/www/Homepage/log/error.log /var/www/Homepage/src/app.js`
  },
  'POST /api/setting/startup_script/save': {
    code: 200,
    message: 'success'
  },
  'GET /api/setting/env_var': {
    code: 200,
    message: 'success',
    result: `\nJAVA_HOME=/usr/java/jdk1.8.0_60\nCLASSPATH=$JAVA_HOME/lib:$JAVA_HOME/jre/lib\nPATH=$PATH:$JAVA_HOME/bin:$JAVA_HOME/jre/bin\nexport PATH CLASSPATH JAVA_HOME\n\nCATALINA_HOME=/usr/local/tomcat\n\nexport CATALINA_HOME\nexport PATH=/usr/local/git/bin:$PATH\nPATH=$PATH:/opt/python3/bin\n\n# node\nexport NODE_HOME=/usr/local/node-v8.0.0-linux-x64\nexport PATH=$PATH:$NODE_HOME/bin\nexport NODE_PATH=$NODE_HOME/lib/node_modules\nexport PATH=/usr/java/jdk1.8.0_60/bin:/usr/local/git/bin:/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/usr/java/jdk1.8.0_60/bin:/usr/java/jdk1.8.0_60/jre/bin:/opt/python3/bin:/usr/local/node-v8.0.0-linux-x64/bin:/root/bin:/usr/local/ImageMagick/bin`
  },
  'POST /api/setting/env_var/save': {
    code: 200,
    message: 'success'
  },
  'GET /api/setting/restart': {
    code: 200,
    message: 'success'
  }
}

module.exports = proxy