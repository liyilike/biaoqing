/* 注释动画 */
var DomAnimator = (function() {
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
    interval = setInterval(function() {
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
    var frameType = typeof(frameData);
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



$(function() {
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

$(function() {
  /*阴影颜色选择*/
  $('#shadowpicker').colorpicker({
    color: "rgba(0, 0, 0, 0.2)",
  });
  /*文字颜色选择*/
  $('#colorpicker').colorpicker({
    color: "#000000",
  });
  // $('#colorpicker').on('colorpickerChange', function(event) {});
});

/* 阴影的zuoyou1上下的点击效果 */
$("input[name='shadow']").bind("click", function() {
  if ($(this).val() == 0) {
    $("#shadowdiv").hide();
  } else {
    $("#shadowdiv").show();
  }
});


/*生成按钮*/
// $(function() {
//   var canvasWidth = 300;
//   var canvasHeight = 250;
//   var canvaFont = "28px 'Arial'";
//
//   $("#build").click(function() {
//     animation();
//     drawCanvas(document.getElementById("set"));
//     $("#download").show();
//   });
//
//
//
//   function drawMode(ctx) {
//     if ($('input:radio[name="chutxt"]:checked').val() == 1) {
//       ctx.font = "bold " + canvaFont;
//     } else {
//       ctx.font = canvaFont;
//     }
//
//     if ($('input:radio[name="shadow"]:checked').val() != 0) {
//       ctx.shadowColor = $("#shdowcolor").val();
//       ctx.shadowOffsetX = $("#shadowposition").val();
//       ctx.shadowOffsetY = $("#shadowposition").val();
//
//       if ($('input:radio[name="shadow"]:checked').val() == 2) {
//         ctx.shadowOffsetX = -($("#shadowposition").val());
//       } else if ($('input:radio[name="shadow"]:checked').val() == 3) {
//         ctx.shadowOffsetY = -($("#shadowposition").val());
//       } else if ($('input:radio[name="shadow"]:checked').val() == 4) {
//         ctx.shadowOffsetX = -($("#shadowposition").val());
//         ctx.shadowOffsetY = -($("#shadowposition").val());
//       }
//       ctx.shadowBlur = $("#shadowblur").val();
//     }
//     ctx.fillStyle = $('#colortext').val();
//     return ctx;
//   }
//
//   function drawCanvas(imgObj) {
//     var c = document.createElement('canvas');
//     c.width = canvasWidth;
//     c.height = canvasHeight;
//     var ctx = c.getContext("2d");
//     /* ctx.font一定要在ctx.measureText前面才能测量宽度*/
//
//     ctx = drawMode(ctx);
//     var textW = ctx.measureText($('#name').val()).width;
//     var local = (300 - textW) / 2 + 20;
//     console.log(textW);
//     ctx.drawImage(imgObj, 0, 0);
//     /*姓名*/
//     ctx.fillText($('#name').val(), local, 240);
//     /*文字横向居中在编右20px*/
//     try {
//       var canvasData = c.toDataURL("image/jpeg", 1);
//       $('#pic').attr("src", canvasData);
//       $('#download').attr("href", canvasData);
//       return false;
//     } catch (e) {
//       return true;
//     }
//   }
//
// });

/* 注释动画 */
$(function() {
  var domAnimator = new DomAnimator();
  domAnimator.addFrame('你为什么');
  domAnimator.addFrame('要看源代码?');
  domAnimator.addFrame('关注公众号: 世界极限挑战');
  domAnimator.addFrame('回复 源代码 这三字,赠送源码git地址');
  domAnimator.addFrame('哥哥你关注公众号,我就以身相许!让你日个够');
  domAnimator.animate(1500);
});

/* 等待加载动画 */
function animation() {
  $("#result").LoadingOverlay("show", {
    background: "rgba(220,220,220, 0.5)",
    imageColor: "#33a3dc"
  });
  $("#result").LoadingOverlay("show");
  $("#result").LoadingOverlay("hide", true);
}

/* 滚动条头顶结束 */
setTimeout(function() {
  NProgress.done();
}, 1000);


/* 按钮生成下面全部 */
var canvasHeight, canvasWidth, canvaFont, c, ctx;

function initImg(imgObj, width, height, font) {
  canvasHeight = height;
  canvasWidth = width;
  canvaFont = font;

  c = document.createElement('canvas');
  c.width = canvasWidth;
  c.height = canvasHeight;
  ctx = c.getContext("2d").getImageData(0, 0, canvasWidth, canvasHeight);
  ctx = drawMode(ctx);
  // ctx.drawImage(imgObj, 0, 0);
  return ctx;
}

function drawCanvas(dataArr) {
  for (var i = 0; i < dataArr.length; i++) {
    ctx.fillText(dataArr[i]["text"], dataArr[i]["loc"][0], dataArr[i]["loc"][1]);
  }
  try {
    var canvasData = c.toDataURL("image/png", 1);
    return canvasData;
  } catch (e) {
    return e;
  }
}

function drawMode(ctx) {
  if ($('input:radio[name="chutxt"]:checked').val() == 1) {
    ctx.font = "bold " + canvaFont;
  } else {
    ctx.font = canvaFont;
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










// var ctx2;

$("#build").click(function() {

  var gif = new GIF({
    workers: 2,
    quality: 10,
    workerScript: '/Static/js/gif.worker.js'
  });


  ctx = initImg(document.getElementById("set"), 300, 216, "27px 'Microsoft Yahei'");
  alert(ctx);

  gif.addFrame(ctx, {
  copy: true
  });
  gif.addFrame(ctx, {
copy: true
  });

  gif.on('finished', function(blob) {
     window.open(URL.createObjectURL(blob));
  });

  gif.render();
});





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
