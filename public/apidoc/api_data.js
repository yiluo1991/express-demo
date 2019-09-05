define({ "api": [
  {
    "type": "POST",
    "url": "/ads/add",
    "title": "添加轮播图",
    "name": "add",
    "group": "ads",
    "version": "1.0.0",
    "description": "<p>请使用multipart/form-data提交</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sortnum",
            "description": "<p>排序号</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "enable",
            "description": "<p>是否启用，1启用，0禁用</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "file",
            "description": "<p>图片文件</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "请求成功状态：200": [
          {
            "group": "请求成功状态：200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>请求是否成功</p>"
          },
          {
            "group": "请求成功状态：200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>提示信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": true,\n    \"message\": \"添加成功\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/ads.js",
    "groupTitle": "ads"
  },
  {
    "type": "POST",
    "url": "/ads/delete",
    "title": "删除轮播图",
    "name": "delete",
    "group": "ads",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "请求成功状态：200": [
          {
            "group": "请求成功状态：200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>请求是否成功</p>"
          },
          {
            "group": "请求成功状态：200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>提示信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": true,\n    \"message\": \"删除成功\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/ads.js",
    "groupTitle": "ads"
  },
  {
    "type": "POST",
    "url": "/ads/edit",
    "title": "修改轮播图",
    "name": "edit",
    "group": "ads",
    "version": "1.0.0",
    "description": "<p>请使用multipart/form-data提交</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sortnum",
            "description": "<p>排序号</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "enable",
            "description": "<p>是否启用，1启用，0禁用</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "file",
            "description": "<p>(可选)图片文件</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "请求成功状态：200": [
          {
            "group": "请求成功状态：200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>请求是否成功</p>"
          },
          {
            "group": "请求成功状态：200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>提示信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": true,\n    \"message\": \"修改成功\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/ads.js",
    "groupTitle": "ads"
  },
  {
    "type": "get",
    "url": "/ads/get",
    "title": "获取轮播图列表",
    "name": "get",
    "group": "ads",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>查询关键字</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "请求示例:",
          "content": "keyword=123",
          "type": "querystring"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "请求成功响应示例:",
          "content": "{\n    \"success\":true,\n    \"message\":\"查询成功\",\n    \"rows\":[{\n         \"Id\":1,\n         \"Src\":\"/public/1.jpg\",\n         \"SrotNum\":100,\n         \"Enable\":1\n     }]\n}",
          "type": "Json"
        }
      ]
    },
    "filename": "routes/ads.js",
    "groupTitle": "ads",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/ads/get"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/category/add",
    "title": "添加分类",
    "name": "add",
    "group": "category",
    "version": "1.0.0",
    "description": "<p>请使用multipart/form-data提交</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>分类名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sortnum",
            "description": "<p>排序号</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "enable",
            "description": "<p>是否启用，1启用，0禁用</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "file",
            "description": "<p>图片文件</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "请求成功状态：200": [
          {
            "group": "请求成功状态：200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>请求是否成功</p>"
          },
          {
            "group": "请求成功状态：200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>提示信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": true,\n    \"message\": \"添加成功\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/category.js",
    "groupTitle": "category"
  },
  {
    "type": "POST",
    "url": "/category/delete",
    "title": "删除分类",
    "name": "delete",
    "group": "category",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "请求成功状态：200": [
          {
            "group": "请求成功状态：200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>请求是否成功</p>"
          },
          {
            "group": "请求成功状态：200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>提示信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": true,\n    \"message\": \"删除成功\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/category.js",
    "groupTitle": "category"
  },
  {
    "type": "POST",
    "url": "/category/edit",
    "title": "修改分类",
    "name": "edit",
    "group": "category",
    "version": "1.0.0",
    "description": "<p>请使用multipart/form-data提交</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>分类名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sortnum",
            "description": "<p>排序号</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "enable",
            "description": "<p>是否启用，1启用，0禁用</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "file",
            "description": "<p>(可选)图片文件</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "请求成功状态：200": [
          {
            "group": "请求成功状态：200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>请求是否成功</p>"
          },
          {
            "group": "请求成功状态：200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>提示信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": true,\n    \"message\": \"修改成功\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/category.js",
    "groupTitle": "category"
  },
  {
    "type": "get",
    "url": "/category/get",
    "title": "获取分类列表",
    "name": "get",
    "group": "category",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>查询关键字</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "请求示例:",
          "content": "keyword=123",
          "type": "querystring"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "请求成功响应示例:",
          "content": "{\n    \"success\":true,\n    \"message\":\"查询成功\",\n    \"rows\":[{\n         \"Id\":1,\n         \"Name\":\"旅游\",\n         \"Src\":\"/public/1.jpg\",\n         \"SrotNum\":100,\n         \"Enable\":1\n     }]\n}",
          "type": "type"
        }
      ]
    },
    "filename": "routes/category.js",
    "groupTitle": "category",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/category/get"
      }
    ]
  },
  {
    "type": "get",
    "url": "/customer/get",
    "title": "获取用户列表",
    "name": "get",
    "group": "customer",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "page",
            "description": "<p>页码,默认1</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "size",
            "description": "<p>每页条数，默认10</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>查询关键字</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "请求示例:",
          "content": "{\n    \"size\" : 10,\n    \"page\" : 1,\n    \"keyword\":\"小明\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/customer.js",
    "groupTitle": "customer",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/customer/get"
      }
    ]
  },
  {
    "type": "Post",
    "url": "/login",
    "title": "登录",
    "name": "login",
    "group": "login",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "loginname",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "请求成功状态：200": [
          {
            "group": "请求成功状态：200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>登录是否成功</p>"
          },
          {
            "group": "请求成功状态：200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>提示信息</p>"
          }
        ],
        "登录成功设置Cookie": [
          {
            "group": "登录成功设置Cookie",
            "type": "Set-Cookie",
            "optional": false,
            "field": "node_auth",
            "description": "<p>签名过的用户名信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\": false,\n    \"message\": \"用户名或密码有误\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/login.js",
    "groupTitle": "login",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/login"
      }
    ]
  },
  {
    "type": "get",
    "url": "/ticket/get",
    "title": "获取门票列表",
    "name": "get",
    "group": "ticket",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "page",
            "description": "<p>当前页码，默认1</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "size",
            "description": "<p>分页条数，默认10</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>关键字</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "请求示例:",
          "content": "keyword=abc&page=1&size=10",
          "type": "querystring"
        }
      ]
    },
    "filename": "routes/ticket.js",
    "groupTitle": "ticket",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/ticket/get"
      }
    ]
  }
] });
