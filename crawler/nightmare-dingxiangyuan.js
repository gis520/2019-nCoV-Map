/**
 * 丁香园页面数据爬取demo
 */

const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true }) // show设置为true，可以看到弹出浏览器出来
const fs = require('fs');

nightmare
    .goto('https://ncov.dxy.cn/ncovh5/view/pneumonia?from=timeline') // 打开丁香园页面
    .wait('div.swiper-container') // 等待页面渲染结束出来
    .evaluate(() => {
        // 搜索结果页面出来了，这里可以做你想做的事情
        // 注意这里的样式名词可能会因为网页构建升级后变化，如果变了调整就好，因为丁香园这里的样式类名是动态生成的
        const children = document.querySelector('div.fold___85nCd').children;
        let result = [];
        for (let c of children) {
            const children2 = c.children;
            const province = children2[0].firstChild.textContent; // 省份名
            const sickCount = children2[0].textContent; // 现存确诊
            const totalCount = children2[1].textContent; // 累计确诊
            const deathCount = children2[2].textContent; // 死亡人数
            const healCount = children2[3].textContent; // 治愈人数

            result.push({
                province, sickCount, totalCount, deathCount, healCount
            })
        }
        return result;
    })
    .end() // 结束操作
    .then(result => {

        console.log(result);
        fs.writeFileSync('./data.json', JSON.stringify(result, null, 2), { encoding: 'utf8' });
        console.log('文件保存成功！')
    })
    .catch(error => {
        console.error('Srawler failed:', error)
    })