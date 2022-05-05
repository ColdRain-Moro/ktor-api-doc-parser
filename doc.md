## POST 用户登录

POST user/login

### 请求参数

| 名称 | 位置  | 可选  | 说明            |
| ---- | ----- | ----- | --------------- |
| account   | field | false |  用户账号  |
| input   | field | false |  用户输入(密码或验证码)  |
| method   | field | false |  方式(phone/password)  |

## POST 用户注册

POST user/register

### 请求参数

| 名称 | 位置  | 可选  | 说明            |
| ---- | ----- | ----- | --------------- |
| phone   | field | false |  手机号  |
| input   | field | true |  验证码  |
| image   | field | true |  图片  |
| method   | field | false |  方式(email/card)  |

## POST 发送验证码

POST verify/send

### 请求参数

| 名称 | 位置  | 可选  | 说明            |
| ---- | ----- | ----- | --------------- |
| input   | field | false |  用户输入(手机号/邮箱)  |
| method   | field | false |  方式(email/phone)  |

## POST 验证验证码

POST verify/check

### 请求参数

| 名称 | 位置  | 可选  | 说明            |
| ---- | ----- | ----- | --------------- |
| input   | field | false |  用户输入(手机号/邮箱)  |
| code   | field | false |  验证码  |
| method   | field | false |  方式(email/phone)  |
