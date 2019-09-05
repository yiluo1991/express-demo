define({ "api": [
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
          "title": "Request-Example:",
          "content": "keyword=123",
          "type": "querystring"
        }
      ]
    },
    "success": {
      "fields": {
        "请求成功状态：200": [
          {
            "group": "请求成功状态：200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"success\":true,\n    \"message\":\"查询成功\",\n    \"rows\":[{\n         \"Id\":1,\n         \"Src\":\"/public/1.jpg\",\n         \"SrotNum\":100,\n         \"Enable\":1\n     }]\n}",
          "type": "type"
        }
      ]
    },
    "filename": "routes/ads.js",
    "groupTitle": "ads"
  }
] });
