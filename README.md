# wechatgame-QRCode

1.1 微信子域生成二维码
```javascript
var QRCode = require('qrcode');

var canvas = wx.getSharedCanvas();
var ctx = canvas.getContext("2d");

var qrcode = new QRCode(ctx, {
  text: '{"name": "无尘", "friends": [1,2,4,5]}',
  width: 150,
  height: 150,
  colorDark: "#000000",
  colorLight: "#ffffff",
  correctLevel: QRCode.CorrectLevel.H
});
```


1.2 微信主域显示子域二维码
```javascript
var canvas = wx.createCanvas();
var ctx = canvas.getContext("2d");

var openDataContext = wx.getOpenDataContext();
var shareCanvas = openDataContext.canvas;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 1000, 1000);
ctx.drawImage(sharedCanvas, 80, 100);
```


2 微信主域生成二维码并显示二维码
```javascript
var QRCode = require('qrcode');

var canvas = wx.createCanvas();
var ctx = canvas.getContext("2d");


var qrcode = new QRCode(ctx, {
  text: '{"name": "无尘", "friends": [1,2,4,5]}',
  width: 150,
  height: 150,
  colorDark: "#000000",
  colorLight: "#ffffff",
  correctLevel: QRCode.CorrectLevel.H
});
```

![image](https://github.com/yuwu/wechatgame-QRCode/blob/master/code.png)



参考
[weapp-qrcode](https://github.com/tomfriwel/weapp-qrcode)
[weixin-game](https://developers.weixin.qq.com/minigame/dev/index.html)


