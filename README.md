# wechatgame-QRCode

1.1微信子域生成二维码
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


1.2微信主域显示二维码
```javascript
var canvas = wx.createCanvas();
var ctx = canvas.getContext("2d");

var openDataContext = wx.getOpenDataContext();
var shareCanvas = openDataContext.canvas;
var shareCtx = shareCanvas.getContext("2d");

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 1000, 1000);
ctx.drawImage(sharedCanvas, 80, 100);
```


2.2微信主域生成二维码，显示二维码
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


