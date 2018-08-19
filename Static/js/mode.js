/* 注释动画 */
var DomAnimator = (function () {
  var currentFrame = 0;
  var frames = [];
  var nodes = [];
  var multiNode = !!!window.chrome;
  var interval = null;
  var defaultTime = 500;
  var attached = false;
  var whiteSpaceString = "\u00A0";

  function extend(target, source) {
    for (var key in source) {
      if (!(key in target)) {
        target[key] = source[key]
      }
    }
    return target
  }

  function parseMultilineFrame(frame) {
    if (multiNode) {
      return swapWhitespace(frame)
    } else {
      return padString(frame.join("\n"))
    }
  }

  function parseSingleLineFrame(frame) {
    if (multiNode) {
      return swapWhitespace(frame.split("\n"))
    } else {
      return padString(frame)
    }
  }

  function swapWhitespace(array) {
    var i = 0;
    for (i; i < array.length; i++) {
      array[i] = array[i].replace(/ /g, whiteSpaceString)
    }
    return array
  }

  function animate(time) {
    if (!time) {
      time = defaultTime
    }
    if (frames.length === 0) {
      console.log("I need frames to animate. You can add them with .addFrame( string )");
      return
    }
    if (attached === false) {
      attachToDocument()
    }
    interval = setInterval(function () {
      renderFrame()
    }, time)
  }

  function renderFrame() {
    var frameData = frames[currentFrame];
    if (multiNode) {
      var i = 0;
      for (i; i < nodes.length; i++) {
        nodes[i].nodeValue = frameData[i]
      }
    } else {
      nodes[0].nodeValue = frameData
    }
    currentFrame = currentFrame + 1;
    if (currentFrame === frames.length) {
      currentFrame = 0
    }
  }

  function attachToDocument() {
    var head = document.head;
    var parent = head.parentNode;
    if (multiNode) {
      var i = 0;
      var totalNodes = frames[0].length;
      for (i; i < totalNodes; i++) {
        var node = document.createComment("");
        nodes.push(node);
        parent.insertBefore(node, head)
      }
    } else {
      var node = document.createComment("");
      nodes.push(node);
      parent.insertBefore(node, head)
    }
  }

  function stop() {
    clearInterval(interval)
  }

  function addFrame(frameData) {
    if (!frameData) {
      frameData = "no frame data"
    }
    var frameType = typeof (frameData);
    if (frameType === "object") {
      frames.push(parseMultilineFrame(frameData))
    } else {
      if (frameType === "string") {
        frames.push(parseSingleLineFrame(frameData))
      }
    }
  }

  function padString(string) {
    return "\n" + string + "\n"
  }

  function main() {}
  return extend(main, {
    addFrame: addFrame,
    animate: animate,
    stop: stop
  })
});

/* 注释动画 */
$(function () {
  var domAnimator = new DomAnimator();
  domAnimator.addFrame('你为什么');
  domAnimator.addFrame('要看源代码?');
  domAnimator.addFrame('关注公众号: 世界极限挑战');
  domAnimator.addFrame('回复 源代码 这三字,赠送源码git地址');
  domAnimator.addFrame('哥哥你关注公众号,我就以身相许!让你日个够');
  domAnimator.animate(1500);
});

$(function () {
  /*阴影的两个横滑动条*/
  $("#shadowposition").ionRangeSlider({
    type: "single",
    hide_min_max: true,
    from: 3,
    to: 3,
    min: 0,
    max: 10,
    step: 1,
    grid: true,
    grid_snap: true,
  });
  $("#shadowblur").ionRangeSlider({
    type: "single",
    hide_min_max: true,
    from: 3,
    to: 3,
    min: 0,
    max: 10,
    step: 1,
    grid: true,
    grid_snap: true,
    // onChange: function(obj) {},
    // onFinish: function(obj) {}
  });
});


$(function () {
  /*阴影颜色选择*/
  $('#shadowpicker').colorpicker({
    color: "rgba(0, 0, 0, 0.2)"
  });
  /*文字颜色选择*/
  $('#colorpicker').colorpicker({
    color: "#000000"
  });
  // $('#colorpicker').on('colorpickerChange', function(event) {});
});
/* 阴影的zuoyou1上下的点击效果 */
$("input[name='shadow']").bind("click", function () {
  if ($(this).val() == 0) {
    $("#shadowdiv").hide();
  } else {
    $("#shadowdiv").show();
  }
});

/* 等待加载动画 */
function showLoad() {
  $("#result").LoadingOverlay("show", {
    background: "rgba(220,220,220, 0.5)",
    imageColor: "#33a3dc"
  });
  $("#result").LoadingOverlay("show");
}

function hideLoad() {
  $("#result").LoadingOverlay("hide", true);
  $("#download").show();
}


/* 滚动条头顶结束 */
setTimeout(function () {
  NProgress.done();
}, 1000);

/* canvas测量宽度 */
var measureCanvas = document.createElement('canvas');
var measureCtx = measureCanvas.getContext("2d");

function measureText(text, font) {
  measureCtx.font = font;
  return measureCtx.measureText(text).width;
}

/* canvas测量文字的一半宽度 */
function half(text, font, w) {
  measureCtx.font = font;
  return (w - measureCtx.measureText(text).width) / 2;
}


/* Gif生成 */
var runGif = false,
  initGif = false;

function GifMode(obj) {
  var initobj = obj;
  // var dataArr = obj2;
  GifCreate(initobj, function () {
    initGif = true;
    if (!runGif) {
      return;
    }
    GifWork(initobj, getDataArr(), function (gifbase) {
      $('#set').attr("src", gifbase);
      $('#download').attr("href", gifbase);
      hideLoad();
    });
  });
  // var dataArr = obj;
  $("#build").click(function () {
    showLoad();
    /* 要是初始化没完成 开启run=true,初始化完毕就马上运行 */
    if (!initGif) {
      runGif = true;
      return;
    }
    GifWork(initobj, getDataArr(), function (gifbase) {
      $('#set').attr("src", gifbase);
      $('#download').attr("href", gifbase);
      hideLoad();
    });
  });
}

var superGif;

function GifCreate(obj, callback) {
  var loadUrl = obj.load;
  var imgid = obj.imgid;

  superGif = new SuperGif({
    gif: document.getElementById(imgid),
    progressbar_height: 10,
    progressbar_background_color: 'rgba(255, 255, 255, 0.5)',
    progressbar_foreground_color: '#41b882'
  });
  superGif.load_url(loadUrl, function () {
    callback();
  });
}

function GifWork(obj, obj2, callback) {
  var dataArr = obj2;
  var wGif = obj.w;
  var hGif = obj.h;
  var delay = obj.delay;
  var font = obj.font;

  var gif = new GIF({
    workers: 2,
    quality: 10,
    workerScript: '/Static/js/gif.worker.js'
  });
  // superGif.load_url(loadUrl, function() {
  var canvasGif = document.createElement('canvas'); //自己创建的Canvas,用来加入gif里面生成
  canvasGif.width = wGif;
  canvasGif.height = hGif;
  var ctx = canvasGif.getContext("2d"); //获取自己创建的环境并写入
  var gifCanvas = superGif.get_canvas(); //提取gif的Canvas
  var num = 1; //记录运行次数,涉及内部函数需判断成功标记
  var gifNum = superGif.get_length();
  var textArr = new Array(gifNum);

  for (var i = 0; i < dataArr.length; i++) {
    var objText = dataArr[i]["text"];
    var objLoc = dataArr[i]["loc"];
    var objPage = dataArr[i]["page"];
    for (var i2 = objPage[0] - 1; i2 < objPage[1]; i2++) {
      textArr[i2] = new Array(objText, objLoc);
    }
  }

  function run() {
    superGif.move_to(i3);
    var text = '',
      locH = 0,
      locW = 0;
    if (textArr[i3]) { //不存在就跳过内部用return
      locW = textArr[i3][1][0];
      locH = textArr[i3][1][1];
      text = textArr[i3][0];
    }
    var img = document.createElement("img");
    img.src = gifCanvas.toDataURL("image/png", 1);
    img.onload = function () { //监听到图片加载结束，再压缩图片！
      ctx.drawImage(img, 0, 0);
      ctx.font = font;
      ctx = drawMode(ctx);
      ctx.fillText(text, locW, locH);
      // console.log(delay+'ggg');
      gif.addFrame(ctx.getImageData(0, 0, wGif, hGif), {
        copy: true,
        delay: delay
      });
      i3++;
      if (i3 < textArr.length) {
        run();
      } else {
        gif.on('finished', function (blob) {
          callback(URL.createObjectURL(blob));
          i3 = 0;
          return;
          // var fileReader = new FileReader();
          // fileReader.onload = function(e) {
          //   callback(e.target.result);
          //   i3 = 0;
          //   return;
          // }
          // fileReader.readAsDataURL(blob);
        });
        gif.render();
      }
    }
  }

  var i3 = 0;
  run();
}

/* 按钮生成下面全部 */
function ImgMode(obj) {
  var initobj = obj;
  $("#build").click(function () {
    showLoad();
    $("#download").show();
    ImgWork(initobj, getDataArr(), function (canvasData) {
      $('#set').attr("src", canvasData);
      $('#download').attr("href", canvasData);
      hideLoad();
    });
  });

}


function ImgWork(obj, obj2, callback) {
  var canvasHeight = obj.h;
  var canvasWidth = obj.w;
  var canvaFont = obj.font;
  var imgid = obj.font;
  var dataArr = obj2;
  // var imgObj = document.getElementById(imgid);
  // var imgObj = document.createElement("img");
  // imgObj.src = initobj.src;
  var imgObj = document.createElement("img");
  imgObj.src = initobj.src;
  imgObj.onload = function () { //监听到图片加载结束，再压缩图片！

    var c = document.createElement('canvas');
    c.width = canvasWidth;
    c.height = canvasHeight;

    var ctx = c.getContext("2d");

    ctx.drawImage(imgObj, 0, 0);
    ctx.font = canvaFont;
    ctx = drawMode(ctx);
    for (var i = 0; i < dataArr.length; i++) {
      ctx.fillText(dataArr[i]["text"], dataArr[i]["loc"][0], dataArr[i]["loc"][1]);
    }

    c.toBlob(function (blob) {
      var canvasData = URL.createObjectURL(blob);
      // console.log(canvasData);
      console.log(canvasData);
      callback(canvasData);
      // return canvasData;
    }, "image/png", 1);

    // try {
    //   var canvasData = c.toDataURL("image/png", 1);
    //   return canvasData;
    // } catch (e) {
    //   return e;
    // }


  }

}


var c, ctx;

function initImg(obj, imgObj) {
  var initobj = obj;
  var canvasHeight = initobj.h;
  var canvasWidth = initobj.w;
  var canvaFont = initobj.font;

  c = document.createElement('canvas');
  c.width = canvasWidth;
  c.height = canvasHeight;
  ctx = c.getContext("2d");
  ctx.font = canvaFont;
  ctx = drawMode(ctx);
  ctx.drawImage(imgObj, 0, 0);
  return ctx;
}

function drawCanvas(dataArr) {
  for (var i = 0; i < dataArr.length; i++) {
    ctx.fillText(dataArr[i]["text"], dataArr[i]["loc"][0], dataArr[i]["loc"][1]);
  }
  try {
    var canvasData = c.toDataURL("image/jpeg", 1);

    return canvasData;
  } catch (e) {
    return e;
  }
}

function drawMode(ctx) {
  if ($('input:radio[name="chutxt"]:checked').val() == 1) {
    ctx.font = "bold " + ctx.font;
  }
  if ($('input:radio[name="shadow"]:checked').val() != 0) {
    ctx.shadowColor = $("#shdowcolor").val();
    ctx.shadowOffsetX = $("#shadowposition").val();
    ctx.shadowOffsetY = $("#shadowposition").val();

    if ($('input:radio[name="shadow"]:checked').val() == 2) {
      ctx.shadowOffsetX = -($("#shadowposition").val());
    } else if ($('input:radio[name="shadow"]:checked').val() == 3) {
      ctx.shadowOffsetY = -($("#shadowposition").val());
    } else if ($('input:radio[name="shadow"]:checked').val() == 4) {
      ctx.shadowOffsetX = -($("#shadowposition").val());
      ctx.shadowOffsetY = -($("#shadowposition").val());
    }
    ctx.shadowBlur = $("#shadowblur").val();
  }
  ctx.fillStyle = $('#colortext').val();
  return ctx;
}

/* list的底部翻页*/
function pageCon(options) {
  var pagetext = '';
  if (options.pageNumber >= options.totalPages) {
    for (var i = 1; i < options.totalPages + 1; i++) {
      if (i == options.currentPage) {
        pagetext = '<li class="page-item active"><a class="page-link" href="/Html/list-' + options.listId +
          '-' + i +
          '.html">' + i + '</a></li>';
        continue;
      }
      pagetext = '<li class="page-item"><a class="page-link" href="/Html/list-' + options.listId + '-' +
        i + '.html">' + i +
        '</a></li>';
    }

    return pagetext;
  }


  if (options.pageNumber % 2 != 0) {
    var middle = (options.pageNumber - 1) / 2;
    var left = options.currentPage - middle;
    var right = options.currentPage + middle;
    if (left < 1) {
      right = right + 1 - left;
      left = 1;
    }
    if (right > options.totalPages) {
      left = left + right - options.totalPages;
      right = options.totalPages;
    }


    for (var i = left; i < options.currentPage; i++) {
      pagetext = pagetext + '<li class="page-item"><a class="page-link" href="/Html/list-' + options.listId +
        '-' +
        i + '.html">' + i +
        '</a></li>';
    }


    pagetext = pagetext + '<li class="page-item  active"><a class="page-link" href="/Html/list-' + options.listId +
      '-' + options
      .currentPage +
      '.html">' + options.currentPage + '</a></li>';

    for (var i = options.currentPage + 1; i < right + 1; i++) {


      pagetext = pagetext + '<li class="page-item"><a class="page-link" href="/Html/list-' + options.listId +
        '-' +
        i + '.html">' + i +
        '</a></li>';

    }

    if (right < options.totalPages) {

      pagetext = pagetext +
        '<li class="page-item"><a class="page-link"  onclick="return false;" >...</a></li>';

      pagetext = pagetext + '<li class="page-item"><a class="page-link"  href="/Html/list-' + options.listId +
        '-' +
        options.totalPages +
        '.html">' + options.totalPages +
        '</a></li>';

    }

    return pagetext;
  }



  if (options.pageNumber % 2 == 0) {
    /* 再-1是前面1个后面2个*/
    var middle = (options.pageNumber - 1 - 1) / 2;
    var left = options.currentPage - middle;
    var right = options.currentPage + middle + 1;
    if (left < 1) {
      right = right + 1 - left;
      left = 1;
    }
    if (right > options.totalPages) {
      left = left + right - options.totalPages;
      right = options.totalPages;
    }


    for (var i = left; i < options.currentPage; i++) {
      pagetext = pagetext + '<li class="page-item"><a class="page-link" href="/Html/list-' + options.listId +
        '-' +
        i + '.html">' + i +
        '</a></li>';
    }
    pagetext = pagetext + '<li class="page-item  active"><a class="page-link" href="/Html/list-' + options.listId +
      '-' + options
      .currentPage +
      '">' + options.currentPage + '</a></li>';
    for (var i = options.currentPage + 1; i < right + 1; i++) {
      pagetext = pagetext + '<li class="page-item"><a class="page-link" href="/Html/list-' + options.listId +
        '-' +
        i + '.html">' + i +
        '</a></li>';
    }

    if (right < options.totalPages) {
      pagetext = pagetext +
        '<li class="page-item"><a class="page-link"  onclick="return false;" >...</a></li>';
      pagetext = pagetext + '<li class="page-item"><a class="page-link"  href="/Html/list-' + options.listId +
        '-' +
        options.totalPages +
        '.html" >' + options.totalPages +
        '</a></li>';
    }
    return pagetext;
  }
  return pagetext;
}

function pageMode(options) {
  var dd = document.getElementById('pageMode');
  dd.innerHTML = topText(options) + pageCon(options) + bottomText(options);
}


function topText(options) {
  var pagetop = '';
  pagetop = pagetop + '<ul class="pagination">';

  if (options.currentPage - 1 > 0) {
    var left = options.currentPage - 1;
    pagetop = pagetop + '<li class="page-item"><a class="page-link" href="/Html/list-' + options.listId +
      '-' +
      left + '.html"><</a></li>';
  } else {
    pagetop = pagetop + '<li class="page-item"><a class="page-link" ><</a></li>';
  }
  return pagetop;
}

function bottomText(options) {
  var pagebottom = '';
  if (options.currentPage + 1 <= options.totalPages) {
    var right = options.currentPage + 1;
    pagebottom = pagebottom + '<li class="page-item"><a class="page-link" href="/Html/list-' + options.listId +
      '-' +
      right + '.html">></a></li>';
  } else {
    pagebottom = pagebottom + '<li class="page-item"><a class="page-link" >></a></li>';
  }
  pagebottom = pagebottom + '</ul>';
  return pagebottom;
}