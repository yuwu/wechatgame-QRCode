// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class QRMath {

    static EXP_TABLE = new Array(256);
    static LOG_TABLE = new Array(256);

    constructor(){
    }

    public static init(){
        for (var i = 0; i < 8; i++) { 
            QRMath.EXP_TABLE[i] = 1 << i; 
        }

        for (var i = 8; i < 256; i++) { 
            QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8]; 
        }
        for (var i = 0; i < 255; i++) { 
            QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i; 
        }
    }

    public static glog(n) {
        if (n < 1) { throw new Error("glog(" + n + ")"); }
        return QRMath.LOG_TABLE[n];
    }

    public static gexp (n) {
        while (n < 0) { 
            n += 255; 
        }
        while (n >= 256) { 
            n -= 255; 
        }
        return QRMath.EXP_TABLE[n];
    }

}
