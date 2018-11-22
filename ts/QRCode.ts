
import QRMath from "./QRMath"
import QRErrorCorrectLevel from "./QRErrorCorrectLevel"
import QRCodeModel from "./QRCodeModel"

export default class QRCode {

    public static QRCodeLimitLength = [[17, 14, 11, 7], [32, 26, 20, 14], [53, 42, 32, 24], [78, 62, 46, 34], [106, 84, 60, 44], [134, 106, 74, 58], [154, 122, 86, 64], [192, 152, 108, 84], [230, 180, 130, 98], [271, 213, 151, 119], [321, 251, 177, 137], [367, 287, 203, 155], [425, 331, 241, 177], [458, 362, 258, 194], [520, 412, 292, 220], [586, 450, 322, 250], [644, 504, 364, 280], [718, 560, 394, 310], [792, 624, 442, 338], [858, 666, 482, 382], [929, 711, 509, 403], [1003, 779, 565, 439], [1091, 857, 611, 461], [1171, 911, 661, 511], [1273, 997, 715, 535], [1367, 1059, 751, 593], [1465, 1125, 805, 625], [1528, 1190, 868, 658], [1628, 1264, 908, 698], [1732, 1370, 982, 742], [1840, 1452, 1030, 790], [1952, 1538, 1112, 842], [2068, 1628, 1168, 898], [2188, 1722, 1228, 958], [2303, 1809, 1283, 983], [2431, 1911, 1351, 1051], [2563, 1989, 1423, 1093], [2699, 2099, 1499, 1139], [2809, 2213, 1579, 1219], [2953, 2331, 1663, 1273]];
    public static CorrectLevel = QRErrorCorrectLevel;

    _htOption = null;
    _oQRCode:QRCodeModel = null;
    canvas = null

    constructor(canvas, vOption) {
        QRMath.init();

        this._htOption = {
            width: 256,
            height: 256,
            typeNumber: 4,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRErrorCorrectLevel.H
        };

        if (typeof vOption === 'string') {
            vOption = {
                text: vOption
            };
        }

        // Overwrites options
        if (vOption) {
            for (var i in vOption) {
                this._htOption[i] = vOption[i];
            }
        }

        this._oQRCode = null;
        this.canvas = canvas;


        if (this._htOption.text && canvas) {
            this.makeCode(this._htOption.text);
        }
    }

    /**
         * Get the type by string length
         * 
         * @private
         * @param {String} sText
         * @param {Number} nCorrectLevel
         * @return {Number} type
         */
    private getTypeNumber(sText, nCorrectLevel) {
        var nType = 1;
        var length = this._getUTF8Length(sText);

        for (var i = 0, len = QRCode.QRCodeLimitLength.length; i <= len; i++) {
            var nLimit = 0;

            switch (nCorrectLevel) {
                case QRErrorCorrectLevel.L:
                    nLimit = QRCode.QRCodeLimitLength[i][0];
                    break;
                case QRErrorCorrectLevel.M:
                    nLimit = QRCode.QRCodeLimitLength[i][1];
                    break;
                case QRErrorCorrectLevel.Q:
                    nLimit = QRCode.QRCodeLimitLength[i][2];
                    break;
                case QRErrorCorrectLevel.H:
                    nLimit = QRCode.QRCodeLimitLength[i][3];
                    break;
            }

            if (length <= nLimit) {
                break;
            } else {
                nType++;
            }
        }

        if (nType > QRCode.QRCodeLimitLength.length) {
            throw new Error("Too long data");
        }

        return nType;
    }

    public _getUTF8Length(sText) {
        var replacedText = encodeURI(sText).toString().replace(/\%[0-9a-fA-F]{2}/g, 'a');
        return replacedText.length + (replacedText.length != sText ? 3 : 0);
    }

    public makeCode(sText) {
        this._oQRCode = new QRCodeModel(this.getTypeNumber(sText, this._htOption.correctLevel), this._htOption.correctLevel);
        this._oQRCode.addData(sText);
        this._oQRCode.make();
        this.makeImage();
    };

    public makeImage() {
        var _oContext = this.canvas;
        var _htOption = this._htOption;
        var oQRCode = this._oQRCode

        var nCount = oQRCode.getModuleCount();
        var nWidth = _htOption.width / nCount;
        var nHeight = _htOption.height / nCount;
        var nRoundedWidth = Math.round(nWidth);
        var nRoundedHeight = Math.round(nHeight);

        if (_htOption.image && _htOption.image != '') {
            _oContext.drawImage(_htOption.image, 0, 0, _htOption.width, _htOption.height)
        }

        for (var row = 0; row < nCount; row++) {
            for (var col = 0; col < nCount; col++) {
                var bIsDark = oQRCode.isDark(row, col);
                var nLeft = col * nWidth;
                var nTop = row * nHeight;
                _oContext.strokeStyle = (bIsDark ? _htOption.colorDark : _htOption.colorLight);
                _oContext.lineWidth = 1;
                _oContext.fillStyle = (bIsDark ? _htOption.colorDark : _htOption.colorLight);
                _oContext.fillRect(nLeft, nTop, nWidth, nHeight);

                _oContext.strokeRect(
                    Math.floor(nLeft) + 0.5,
                    Math.floor(nTop) + 0.5,
                    nRoundedWidth,
                    nRoundedHeight
                );

                _oContext.strokeRect(
                    Math.ceil(nLeft) - 0.5,
                    Math.ceil(nTop) - 0.5,
                    nRoundedWidth,
                    nRoundedHeight
                );
            }
        }
    };
}
