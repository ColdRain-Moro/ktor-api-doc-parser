# ktor-api-doc-parser

在编写ktor路由代码时按照规则写上注释，将代码cv到input.txt中运行脚本即可生成对应markdown格式api文档

## 注释编写规则

~~~kotlin
fun Routing.authentication() {
    route("user") {
        /**
         * route user/login
         * method POST
         * desc 用户登录
         * field account 用户账号
         * field input 用户输入(密码或验证码)
         * field method 方式(phone/password)
         */
        post("/login") {

        }
        /**
         * route user/register
         * method POST
         * desc 用户注册
         * field phone 手机号
         * field? input 验证码
         * field? image 图片
         * field method 方式(email/card)
         */
        post("/register") {

        }

        route("/verify") {
            /**
             * route verify/send
             * method POST
             * desc 发送验证码
             * field input 用户输入(手机号/邮箱)
             * field method 方式(email/phone)
             */
            post("/send") {

            }
            /**
             * route verify/check
             * method POST
             * desc 验证验证码
             * field input 用户输入(手机号/邮箱)
             * field code 验证码
             * field method 方式(email/phone)
             */
            post("/check") {

            }
        }
    }
}
~~~

## 模板

可以通过修改`template.md`中的内容来实现自定义输出文档格式

## 拓展

输出文档的同时也会输出`apis.json`,其中存放了接口的基本信息，可以通过它来做一些拓展