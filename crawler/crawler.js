'use strict'

const cheerio = require('cheerio');
const request = require('superagent');
const URL = 'https://ncov.dxy.cn/ncovh5/view/pneumonia?from=timeline';
const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4';

function fetchInfo(url) {
    return new Promise((resolve, reject) => {
        request.get(url).set('User-Agent', userAgent).end((err, res) => {
            if (err) {
                reject(err);
            } else {
                const $ = cheerio.load(res.text);
                console.log(res.text); // 此处发现页面返回的html代码是未渲染dom的原始代码。
                // 取得每个省份
                const itemProps = $("p.subBlock2___2BONl");
                console.log(itemProps.length)
                const result = [];
                // 每个省份的第一个子元素是该省份数据

                /* itemProps.each((index, item) => {
                    var info = {};
                    const $item = $(item).first();
                    const children = $item.children();
                    for (let c of children) {
                        const text = $(c).text();
                    }
                    result.push(info);
                }); */
                resolve(result);
            }
        });
    });
}

function test(url) {
    if (!url) {
        url = URL;
    }
    fetchInfo(url).then((result) => {
        console.log(result)
    }).catch(e => {
        console.log(e)
    });
}
test();
module.exports = { fetchInfo };