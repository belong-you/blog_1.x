export default {
  // 是否是微信浏览器
  isWeiXin() {
    const ua = navigator.userAgent.toLowerCase();
    return ua.match(/microMessenger/i) == 'micromessenger'
  },
  // 是否是QQ浏览器
  isQQBrowser() {
    const ua = navigator.userAgent.toLowerCase();
    return !!ua.match(/mqqbrowser|qzone|qqbrowser|qbwebviewtype/i)
  },
  // 是否是QQ浏览器
  isUCBrowser() {
    navigator.userAgent.indexOf('UCBrowser') > -1 ? true : false;
  },
  // 是否ios
  isIos() {
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {  //安卓手机
      return false
    } else if (u.indexOf('iPhone') > -1) {//苹果手机
      return true
    } else if (u.indexOf('iPad') > -1) {//iPad
      return false
    } else if (u.indexOf('Windows Phone') > -1) {//winphone手机
      return false
    } else {
      return false
    }
  },
  // 是否是移动端
  isDeviceMobile() {
    const ua = navigator.userAgent.toLowerCase();
    return /android|webos|iphone|ipod|balckberry/i.test(ua)
  },
  // 是否为PC端
  isPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
      "SymbianOS", "Windows Phone",
      "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  },
  // 获取浏览器版本号
  bro() {
    let broName = 'Runing'
    let strStart = 0
    let strStop = 0
    let temp = ''
    let userAgent = window.navigator.userAgent // 包含以下属性中所有或一部分的字符串：appCodeName,appName,appVersion,language,platform
    // FireFox
    if (userAgent.indexOf('Firefox') !== -1) {
      strStart = userAgent.indexOf('Firefox')
      temp = userAgent.substring(strStart)
    }
    // Edge
    if (userAgent.indexOf('Edge') !== -1) {
      /* broName = 'Edge浏览器'; */
      strStart = userAgent.indexOf('Edge')
      temp = userAgent.substring(strStart)
    }
    // IE浏览器
    if (userAgent.indexOf('MSIE') === -1 || 25) {
      /* broName = 'IE浏览器'; */
      temp = 'IE'
    }
    // 360极速模式可以区分360安全浏览器和360极速浏览器
    if (userAgent.indexOf('WOW') !== -1 && userAgent.indexOf('NET') < 0 && userAgent.indexOf('Firefox') < 0) {
      if (navigator.javaEnabled()) {
        broName = '360安全浏览器-极速模式'
      } else {
        broName = '360极速浏览器-极速模式'
      }
    }
    // 360兼容
    if (userAgent.indexOf('WOW') !== -1 && userAgent.indexOf('NET') !== -1 && userAgent.indexOf('MSIE') !== -1 && userAgent.indexOf('rv') < 0) {
      broName = '360兼容模式'
    }
    // Chrome浏览器
    if (userAgent.match(/Chrome\/([\d.]+)/)) {
      /* broName = 'Chrome浏览器'; */
      strStart = userAgent.indexOf('Chrome')
      strStop = userAgent.indexOf('Safari')
      temp = userAgent.substring(strStart, strStop)
    }
    // safari
    if (userAgent.match(/Version\/([\d.]+).*Safari/)) {
      strStop = userAgent.indexOf('Safari')
      temp = userAgent.substring(strStop)
    }
    // opera
    if (userAgent.match(/Opera.([\d.]+)/)) {
      strStop = userAgent.indexOf('Opera')
      temp = userAgent.substring(strStop)
    }
    return temp
  },
  // 获取操作系统信息 
  getOsInfo() {
    var userAgent = navigator.userAgent.toLowerCase();
    var name = undefined;
    var version = undefined;
    if (userAgent.indexOf('win') > -1) {
      name = 'Windows';
      if (userAgent.indexOf('windows nt 5.0') > -1) {
        version = 'Win 2000';
      } else if (userAgent.indexOf('windows nt 5.1') > -1 || userAgent.indexOf('windows nt 5.2') > -1) {
        version = 'Win XP';
      } else if (userAgent.indexOf('windows nt 6.0') > -1) {
        version = 'Win Vista';
      } else if (userAgent.indexOf('windows nt 6.1') > -1 || userAgent.indexOf('windows 7') > -1) {
        version = 'Win 7';
      } else if (userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows 8') > -1) {
        version = 'Win 8';
      } else if (userAgent.indexOf('windows nt 6.3') > -1) {
        version = 'Win 8.1';
      } else if (userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows nt 10.0') > -1) {
        version = 'Win 10';
      } else {
        version = undefined;
      }
    } else if (userAgent.indexOf('iphone') > -1) {
      name = 'Iphone';
    } else if (userAgent.indexOf('mac') > -1) {
      name = 'Mac';
    } else if (userAgent.indexOf('x11') > -1 || userAgent.indexOf('unix') > -1 || userAgent.indexOf('sunname') > -1 || userAgent.indexOf('bsd') > -1) {
      name = 'Unix';
    } else if (userAgent.indexOf('linux') > -1) {
      if (userAgent.indexOf('android') > -1) {
        name = 'Android';
      } else {
        name = 'Linux';
      }
    } else {
      name = undefined;
    }
    return version || name
  }

}