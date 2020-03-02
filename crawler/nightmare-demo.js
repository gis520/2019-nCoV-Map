const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true }) // show设置为true，可以看到弹出浏览器出来

nightmare
  .goto('https://baidu.com') // 打开的页面，这里百度举例
  .type('#kw', 'giscafer webgis入门实战') // 根据id找到输入框，自动在输入框中填写 'giscafer webgis入门实战'
  .click('#su') // 根据id找到搜索按钮并点击
  .wait(1000) // 等1000ms，等待查询结果页面显示出来
  .evaluate(() => {
      // 搜索结果页面出来了，这里可以做你想做的事情
      const nums_text= document.querySelector('span.nums_text').textContent;
      return nums_text;
  })
  .end() // 结束操作
  .then(console.log) // 输出evaluate 里边返回的值
  .catch(error => {
    console.error('Search failed:', error)
  })