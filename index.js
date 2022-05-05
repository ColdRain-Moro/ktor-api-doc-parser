import fs from 'fs';

const text = fs.readFileSync('input.txt', 'utf8');
const apis = [];
const docTemplate = fs.readFileSync('template.md', 'utf8');
const outputDoc = [];

text.split('\n').forEach(line => {
    let str = line.trim()
    if (str.startsWith("* ")) {
        str = str.substring(2)
        const contents = str.split(" ")
        switch (contents[0]) {
            case "route": {
                apis.push({
                    route: contents[1],
                })
                break
            }
            case "method": {
                apis[apis.length - 1].method = contents[1]
                break
            }
            case "description":
            case "desc": {
                apis[apis.length - 1].description = str.substring(contents[0].length + 1)
                break
            }
            case "field?":
            case "field": {
                let params = apis[apis.length - 1].params
                if (!params) {
                    params = []
                    apis[apis.length - 1].params = params
                }
                params.push({
                    type: 'field',
                    optional: contents[0] === "field?",
                    name: contents[1],
                    description: str.substring(contents[0].length + 1 + contents[1].length + 1)
                })
                break
            }
            case "query":
            case "query?": {
                let params = apis[apis.length - 1].params
                if (!params) {
                    params = []
                    apis[apis.length - 1].params = params
                }
                params.push({
                    type: 'query',
                    optional: contents[0] === "query?",
                    name: contents[1],
                    description: str.substring(contents[0].length + 1 + contents[1].length + 1)
                })
                break
            }
        }
    }
})

// 输出json文件
fs.writeFileSync('apis.json', JSON.stringify(apis, null, 2))

apis.forEach(api => {
    docTemplate.split("\n").forEach(line => {
        const paramsReg = /\{&params#\S+\}/;
        const regex = /{&\S+}/g;
        let str = line;
        if (paramsReg.test(line)) {
            api.params.forEach(param => {
                let thisLine = str
                for (let str in param) {
                    thisLine = thisLine.replace(`{&params#${str}}`, param[str])
                }
                outputDoc.push(thisLine)
            })
            return
        }
        const iter = str.matchAll(regex)
        let next = iter.next()
        while(next.done === false) {
            const arr = next.value || []
            arr.forEach(match => {
                const key = match.substring(2, match.length - 1)
                str = str.replace(match, api[key])
            })
            next = iter.next()
        }
        outputDoc.push(str)
    })
})

fs.writeFileSync('doc.md', outputDoc.join('\n'))


