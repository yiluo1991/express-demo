function routerCreator(){
    var routers = [];
    function router(req,res){
        for (var i in routers) {
            //匹配path和访问路径一致的路由规则
            if (routers[i].path == req.path) {
                //调用路由规则的handler处理请求
                routers[i].handler(req, res);
                break;
            }
        }
    }
    router.get=function(path,handler){
        routers.push({
            path:path,
            handler:handler
        })
    }
    return router;
}

module.exports={Router:routerCreator};