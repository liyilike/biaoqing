// Site javascript code blocks
// @depend jQuery
// @author hightman

// ====================
// ===== czxiu js =====
// ====================
/**
 * czx.someFeature({});
 */
var czx = {};

/**
 * czx.baiduShare();
 */
czx.baiduShare = function (size) {
    /*<div class="bdsharebuttonbox">
     <a href="#" class="bds_more" data-cmd="more"></a>
     <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
     <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
     <a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a>
     <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
     <a href="#" class="bds_mail" data-cmd="mail" title="分享到邮件分享"></a>
     <a href="#" class="bds_copy" data-cmd="copy" title="分享到复制网址"></a>
     </div>*/
    var data = {}, $img = $('img[data-tag=share]');
    //data.url = window.location.href;
    data.title = $('meta[name=title]').attr('content') || document.title;
    data.desc = $('meta[name=description]').attr('content') || '';
    data.pic = $img.size() > 0 ? $img[0].src : '';
    window._bd_share_config = {
        "common": {
            "bdSnsKey": {
                "tsina": "3921674306",
                "tqq": "729f40c568d74376a7bebe561e732fb3"
            },
            //"bdUrl": data.url,
            "bdText": data.title,
            "bdDesc": data.desc,
            "bdPic": data.pic,
            "bdMini": "1",
            "bdMiniList": false,
            "bdStyle": "0",
            "bdSize": (size || 32) + '',
        },
        "image": {
            "tag": "for-bds",
            "viewList": ["weixin", "tsina", "sqq", "qzone", "mail", "copy"],
            "viewSize": "16"
        },
        "share": {}
    };
    with (document)0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'https://hmsecret.com/bd-share/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];
};

/**
 * czx.quickLogin();
 */
czx.quickLogin = function () {
    var $body = $(document.body);
    $body.on('click', '.popover-content a.auth-link', function (e) {
        e.preventDefault();
        var authChoicePopup = $body.data('authChoicePopup');
        if (authChoicePopup) {
            authChoicePopup.close();
        }
        var url = this.href;
        var popupOption = 'toolbar=no,menubar=no,scrollbars=no,status=no';
        var popupWidth = this.getAttribute('data-popup-width');
        var popupHeight = this.getAttribute('data-popup-height');
        if (popupWidth) {
            popupOption += ',width=' + popupWidth + ',left=' + parseInt((window.screen.width - popupWidth) / 2);
        }
        if (popupHeight) {
            popupOption += ',height=' + popupHeight + ',top=' + parseInt((window.screen.height - popupHeight) / 2);
        }
        authChoicePopup = window.open(url, 'yii_auth_choice', popupOption);
        authChoicePopup.focus();
        $body.data('authChoicePopup', authChoicePopup);
    });
};

/**
 * czx.userTip('content...');
 */
czx.userTip = function (content) {
    if (content === '') {
        return;
    }
    var $a = $('.nav-user > a');
    $a.popover({
        content: '<small>' + content + '</small>',
        placement: 'bottom',
        container: 'body',
        html: true
    }).popover('show');
    setTimeout(function () {
        $a.popover('destroy');
    }, 2500);
};

/**
 * czx.favLink();
 */
czx.favLink = function (opts) {
    var settings = $.extend({
        'selector': 'a.col-fav',
        'container': null
    }, opts || {}), fn = function () {
        var $this = $(this);
        $.post($this.attr('href'), function (data) {
            if (data.state) {
                $this.find('i').removeClass('glyphicon-heart-empty').addClass('glyphicon-heart');
            } else {
                $this.find('i').removeClass('glyphicon-heart').addClass('glyphicon-heart-empty');
            }
            $this.find('em').html(data.num);
        }, 'json');
        return false;
    };
    if (settings.container === null) {
        $(settings.selector).on('click', fn);
    } else {
        $(settings.container).on('click', settings.selector, fn);
    }
};

/**
 * czx.evalLink();
 */
czx.evalLink = function (opts) {
    var settings = $.extend({
        'selector': 'a.col-eval',
        'container': null
    }, opts || {}), fn = function () {
        var $this = $(this);
        if (!$this.hasClass('has-evaluated')) {
            $.post($this.attr('href'), function (data) {
                $this.addClass('has-evaluated').removeAttr('href');
                $this.find('em').html(data.good);
            }, 'json');
        }
        return false;
    };
    if (settings.container === null) {
        $(settings.selector).on('click', fn);
    } else {
        $(settings.container).on('click', settings.selector, fn);
    }
};

/**
 * czx.removeLink();
 */
czx.removeLink = function (opts) {
    var settings = $.extend({
        'selector': 'a.remove',
        'parentSelector': '.item',
        'container': null
    }, opts || {}), fn = function () {
        var $this = $(this);
        if (confirm('确定要删除这条数据吗？')) {
            $.post($this.attr('href'), function () {
                $this.closest(settings.parentSelector).remove();
            });
        }
        return false;
    };
    if (settings.container === null) {
        $(settings.selector).on('click', fn);
    } else {
        $(settings.container).on('click', settings.selector, fn);
    }
};

/**
 * czx.bindInput()
 */
czx.bindInput = function (opts) {
    var settings = $.extend({
        'parentSelector': '.col-sm-10'
    }, opts || {});
    $('a.bind-cancel').on('click', function () {
        var $c = $(this).closest(settings.parentSelector);
        $c.children().addClass('hidden');
        $c.children('p').removeClass('hidden');
        $c.find('input:first').val('');
        return false;
    });
    $('a.bind-edit').on('click', function () {
        var $c = $(this).closest(settings.parentSelector);
        $c.children().removeClass('hidden');
        $c.children('p').addClass('hidden');
        $c.find('input:first').focus();
        return false;
    });
};

/**
 * czx.bindPhoneCode()
 */
czx.bindPhoneCode = function (opts) {
    var settings = $.extend({
        'selector': 'button.btn-phone-code',
        'delay': 60,
        'url': null
    }, opts || {});
    $(settings.selector).on('click', function () {
        var $btn = $(this), $c = $btn.closest('.form-group'),
            nLeft = settings.delay,
            oText = $btn.html(),
            timer = false,
            fnResume = function () {
                if (timer != false) {
                    clearInterval(timer);
                }
                $btn.attr('disabled', false).html(oText);
                $c.find('input:first').focus();
            };
        timer = setInterval(function () {
            nLeft--;
            if (nLeft <= 0) {
                fnResume();
            } else {
                $btn.html(nLeft + '秒后重发');
            }
        }, 1000);
        $btn.attr('disabled', true);
        $c.find('input:last').focus();
        $.getJSON(settings.url + $c.find('input:first').val()).done(function (data) {
            if (data.errmsg == 'ok') {
                $c.find('.help-block')
            } else if (data.errmsg == 'delay') {
                nLeft = data.delay;
            } else {
                var $form = $c.closest('form'), $input = $c.find('input:first');
                $form.yiiActiveForm('updateAttribute', $input.attr('id'), [data.errmsg]);
                fnResume();
            }
        }).fail(function (x) {
            alert(x.responseText);
            fnResume();
        });
    });
};

/**
 * czx.diyDemo();
 */
czx.diyDemo = function (opts) {
    var settings = $.extend({
        'imgId': 'demo-img',
        'txtId': 'ref-block',
        'collapseId': 'form-collapsed',
        'pType': 'small',
        'pItems': [],
        'scaleDataName': 'scale',
        'idTemplate': 'zdiyform-%'
    }, opts || {}), getEle = function (name) {
        return $('#' + settings.idTemplate.replace('%', name));
    }, getVal = function (name) {
        return getEle(name).val();
    };
    // global variables
    var isIE = navigator.userAgent.indexOf("MSIE") > 0, swapFlag = false;
    var $img = $('#' + settings.imgId), $ref = $('#' + settings.txtId).hide();
    // event handlers
    $img.on('init', function () {
        // restore img
        if ($ref.is(':hidden')) {
            var $in = getEle('image');
            //console.log($in.size(), $in.val());
            if ($in.size() > 0) {
                $img.attr('src', $in.val() + '?' + (new Date()).getTime());
            }
        }
        // init css
        var css = {};
        var _pos = $img.offset(), scale = $img.data(settings.scaleDataName) || 1, $span = $ref.children('span');
        css.left = parseInt(getVal('xpos') * scale + _pos.left);
        css.top = parseInt(getVal('ypos') * scale + _pos.top);
        var fonts = {
            'simsun.ttf': '宋体',
            'simhei.ttf': '黑体',
            'simli.ttf': '隶书',
            'tahoma.ttf': 'Tahoma',
            'sans.ttf': 'Sans'
        };
        css.fontFamily = fonts[getVal('font')] || '';
        css.fontSize = Math.round(getVal('size') * scale);
        // init text
        var text = getVal('text')
            .replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/ /g, '&nbsp;').replace(/\n/g, '<br>');
        if (text === '') {
            $ref.hide();
        } else {
            $ref.show();
            $span.html(text);
        }
        // update pattern
        var pName = getVal('pattern_name'), item = false;
        if (pName && settings.pItems[pName]) {
            var item = settings.pItems[pName];
            css.width = item.w;
            css.height = item.h;
        } else {
            css.width = 'auto';
            css.height = 'auto';
        }
        $ref.css(css);
        if (item != false) {
            var x = item.x, y = item.y;
            if (getEle('pattern_flip').is(':checked')) {
                y = 1 - y;
            }
            if (getEle('pattern_flop').is(':checked')) {
                x = 1 - x;
            }
            var left = Math.round(item.w * x - $span.width() / 2);
            var top = Math.round(item.h * y - $span.height() / 2);
            $span.css({'marginLeft': left, 'marginTop': top, 'opacity': 0.7});
        } else {
            $span.css({'marginLeft': 0, 'marginTop': 0, 'opacity': 1});
        }
        $img.trigger('init.after');
    }).on('update', function () {
        if ($ref.is(':hidden')) {
            return;
        }
        var $span = $ref.children('span'), scale = $img.data('scale') || 1,
            moveType = getVal('move_type'),
            repeatType = getVal('repeat_type'),
            css = {}, spanCss = {};
        // move, repeat
        if (moveType !== 'none') {
            var moveDistance = Math.round(getVal('move_distance') * scale);
            if ($ref.children('img').is(':hidden')) {
                css = $ref.offset();
                css[moveType === 'horizontal' ? 'left' : 'top'] += swapFlag ? moveDistance : 0 - moveDistance;
            } else if (moveType === 'horizontal') {
                spanCss.marginLeft = parseInt($span.css('margin-left')) + (swapFlag ? moveDistance : 0 - moveDistance);
            } else {
                spanCss.marginTop = parseInt($span.css('margin-top')) + (swapFlag ? moveDistance : 0 - moveDistance);
            }
        }
        var repeatCss = 'none';
        if (repeatType !== 'none') {
            var repeatSize = getVal('repeat_size'),
                repeatColor = getVal('repeat_color'),
                repeatColor2 = getVal('repeat_color2');
            if (swapFlag && repeatColor2 !== '') {
                repeatColor = repeatColor2;
            }
            if (repeatType === 'border') {
                if (isIE) {
                    repeatCss = 'glow(color=' + repeatColor + ', strength=' + repeatSize;
                } else {
                    repeatCss = repeatColor + ' ' + repeatSize + 'px ' + repeatSize + 'px ' + repeatSize + 'px, '
                        + repeatColor + ' -' + repeatSize + 'px ' + repeatSize + 'px ' + repeatSize + 'px, '
                        + repeatColor + ' ' + repeatSize + 'px -' + repeatSize + 'px ' + repeatSize + 'px, '
                        + repeatColor + ' -' + repeatSize + 'px -' + repeatSize + 'px ' + repeatSize + 'px';
                }
            } else {
                if (repeatType === 'shadow2') {
                    repeatSize = '-' + repeatSize;
                }
                if (isIE) {
                    repeatCss = 'dropshadow(color=' + repeatColor + ', offx=' + repeatSize + ', offy=' + repeatSize + ', positive=1)';
                } else {
                    repeatCss = repeatColor + ' ' + repeatSize + 'px ' + repeatSize + 'px 0';
                }
            }
        }
        spanCss[isIE ? 'filter' : 'textShadow'] = repeatCss;
        $span.css(spanCss);
        // font, color, size
        css.fontSize = Math.round(getVal('size') * scale);
        if (swapFlag) {
            var color2 = getVal('color2');
            if (color2 !== '') {
                css.color = color2;
            }
            css.fontSize += parseInt(getVal('size_zoom'));
        } else {
            css.color = getVal('color');
        }
        $ref.css(css);
        swapFlag = !swapFlag;
    }).each(function () {
        $img.one('load.diy', function () {
            // drag move
            $ref.dragMove({
                'container': $img,
                'onDragged': function () {
                    var pos = $ref.offset(), _pos = $img.offset(), scale = $img.data(settings.scaleDataName) || 1;
                    getEle('xpos').val(parseInt((pos.left - _pos.left) / scale));
                    getEle('ypos').val(parseInt((pos.top - _pos.top) / scale));
                }
            });
            // swap internal
            setInterval(function () {
                $img.trigger('update');
            }, 200);
            // image input
            var $in = getEle('image');
            if ($in.size() > 0) {
                //$in.imgInput('options', {'width': $img.width(), 'height': $img.height()});
            }
            // init demo
            $img.trigger('init');
        });
        if (this.complete) {
            return $img.trigger('load.diy');
        }
    });
    // form changes
    getEle('pattern_name').on('change', function () {
        var src = this.value, $color = getEle('color');
        if (getVal('pattern_type') === 'none') {
            return;
        } else if (src === '') {
            $ref.children('img').hide();
            if ($color.val() === '#ffffff') {
                $color.val('#000000');
            }
        } else {
            var mm = src.match(/([^\/]+)\.png$/);
            if (!mm) {
                return;
            }
            $(this).val(mm[1]);
            $ref.children('img').attr('src', src.replace('/sample/', '/' + settings.pType + '/')).show();
            if ($color.val() === '#000000') {
                $color.val('#ffffff');
            }
        }
        $img.trigger('init');
    });
    getEle('pattern_flip').on('click', function () {
        $ref.children('img').toggleClass('flip');
        $img.trigger('init');
    });
    getEle('pattern_flop').on('click', function () {
        $ref.children('img').toggleClass('flop');
        $img.trigger('init');
    });
    getEle('text').on('keyup', function () {
        $img.trigger('init');
    });
    var $form = getEle('text').closest('form');
    $form.find('select').on('change', function () {
        $img.trigger('init');
    });
    $form.find(':text').on('change', function () {
        $img.trigger('init');
    });
    $form.find(':reset').on('click', function () {
        setTimeout(function () {
            $img.trigger('init');
        }, 100);
    });
    // form others
    getEle('repeat_type').change(function () {
        var disabled = $(this).val() === 'none';
        getEle('repeat_size').attr('disabled', disabled);
        getEle('repeat_color').attr('disabled', disabled);
        getEle('repeat_color2').attr('disabled', disabled);
    }).change();
    getEle('move_type').change(function () {
        var disabled = $(this).val() === 'none';
        getEle('move_distance').attr('disabled', disabled);
    }).change();
    $('#' + settings.collapseId).on('hide.bs.collapse', function () {
        $(this).prev().find('a.btn').html('<i class="glyphicon glyphicon-plus" aria-hidden="true"></i> 显示更多选项');
    }).on('show.bs.collapse', function () {
        $(this).prev().find('a.btn').html('<i class="glyphicon glyphicon-minus" aria-hidden="true"></i> 隐去更多选项');
    });
    if (getEle('pattern_flip').is(':checked')) {
        $ref.children('img').addClass('flip');
    }
    if (getEle('pattern_flop').is(':checked')) {
        $ref.children('img').addClass('flop');
    }
};

/**
 * czx.luckyDemo('text')
 */
czx.luckyDemo = function (text) {
    var $form = $('#demo-form'), $input = $form.find('input[type=text], textarea');
    if ($input.size() > 0) {
        $input.eq(0).val(text);
        $form.submit();
    }
};

/**
 * czx.messageList();
 */
czx.messageList = function (opts) {
    var settings = $.extend({
        'container': '.message-list',
        'createForm': '#message-create',
        'replyForm': '#message-reply',
        'replyContent': '#message-content',
        'replyFlag': '#message-flag',
        'replyRcv': '#message-rcv_id',
        'flagReply': 8, // Message::FLAG_REPLY
        'flagPrivate': 1,   // Message::FLAG_PRIVATE
        'errorCssClass': 'has-error',
        'pageFirst': null
    }, opts || {});
    var $list = $(settings.container), $reply = $(settings.replyForm);
    var msgContainer = function () {
        var $c = $list.find('.tab-pane.active');
        return $c.size() > 0 ? $c : $list;
    }, hideReply = function () {
        $reply.hide().appendTo(document.body);
    };
    $(settings.createForm).on('submit', function () {
        var $form = $(this);
        $.ajax({
            'url': $form.attr('action'),
            'type': $form.attr('method'),
            'data': $form.serialize(),
            'success': function () {
                setTimeout(function () {
                    $form.find('textarea').val('');
                }, 50);
                if (settings.pageFirst !== null) {
                    msgContainer().load(settings.pageFirst);
                }
            },
            'error': function (x) {
                var err = x.responseText, $input = $form.find('textarea');
                $input.parent().addClass(settings.errorCssClass).closest('form').find('.help-block').html(err);
                $input.focus();
            }
        });
        return false;
    });
    // pagination
    $list.on('click', '.pagination a', function () {
        hideReply();
        msgContainer().load($(this).attr('href'));
        return false;
    });
    // delete
    $list.on('click', 'a.delete', function () {
        var $me = $(this);
        $.ajax({
            'url': $me.attr('href'),
            'type': 'POST',
            'success': function () {
                $me.closest('.item').remove();
            },
            'error': function (x) {
                alert(x.responseText);
            }
        });
        return false;
    });
    // reply
    $list.on('click', 'a.reply', function () {
        var $me = $(this);
        var quot = $me.closest('.content').children('.text').html().replace(/<[qaQA].+?<\/[qaAQ]>/g, '');
        $reply.data({
            'quot': $.trim(quot),
            'rcv_id': $me.attr('data-to')
        }).appendTo($me.closest('.content'));
        $reply.show().find(':text').focus();
        return false;
    });
    $reply.find(':text').on('blur', function () {
        if ($(this).val() === '') {
            hideReply();
        }
    });
    $reply.find('input.btn-default').click(hideReply);
    $reply.submit(function () {
        var $_text = $reply.find(':text');
        if ($_text.val() != '') {
            var $text = $(settings.replyContent),
                $flag = $(settings.replyFlag),
                $rcv = $(settings.replyRcv),
                oldFlag = $flag.is(':checked'), oldRcv = $rcv.val();
            $text.val($_text.val() + '\n[q]' + $reply.data('quot') + '[/q]');
            $flag.val(settings.flagReply).attr('checked', true);
            $rcv.val($reply.data('rcv_id'));
            $(settings.createForm).submit();
            $flag.val(settings.flagPrivate).attr('checked', oldFlag);
            $rcv.val(oldRcv);
            $_text.val('');
        }
        hideReply();
        return false;
    });
    // report
};
// inject into window
window.czx = czx;

// =============================
// ===== jQuery extensions =====
// =============================

/**
 * $('img').monScale();
 */
$.fn.monScale = function (opts) {
    var settings = $.extend({
        'dataName': 'scale',
        'initEvent': 'init',
        'updateEvent': 'update'
    }, opts || {});
    return this.each(function () {
        var $this = $(this);
        $this.one('load.ms', function () {
            $('<img>').on('load', function () {
                $this.attr('data-width', this.width);
                $(window).on('resize.ms', function () {
                    var scale = $this.outerWidth() / parseInt($this.attr('data-width'));
                    if (scale !== $this.data(settings.dataName)) {
                        $this.data(settings.dataName, scale).trigger(settings.initEvent).trigger(settings.updateEvent);
                    } else {
                        $this.trigger(settings.initEvent);
                    }
                }).trigger('resize.ms');
                $(this).off('load').remove();
            }).attr('src', $this.attr('src'));
        });
        if (this.complete) {
            $this.trigger('load.ms');
        }
    });
};

/**
 * $('textarea').autoGrow();
 */
$.fn.autoGrow = function (opts) {
    var settings = $.extend({
        'minHeight': 20
    }, opts || {});
    return this.each(function () {
        var $input = $(this), $shadow = $('<div></div>').css({
            'position': 'absolute',
            'top': -9999,
            'width': $input.width(),
            'fontSize': $input.css('fontSize'),
            'fontFamily': $input.css('fontFamily'),
            'lineHeight': $input.css('lineHeight'),
            'zIndex': -9999
        }).appendTo(document.body);
        $input.on('keyup keydown change', function () {
            var val = $input.val().replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/&/g, '&amp;')
                .replace(/ /g, '&nbsp;')
                .replace(/\n/g, '<br>');
            $shadow.html($.trim(val) + '&nbsp;');
            $input.height(Math.max($shadow.height(), settings.minHeight));
        });
    });
};

/**
 * $('div.item').zoomItem();
 */
$.fn.zoomItem = function (opts) {
    var settings = $.extend({
        'selector': 'div.item',
        'imgSelector': 'img',
        'isThumb': false,   // replace: '_s.' -> ''
        'zoomCssClass': 'zoom-hover'
    }, opts || {});
    return this.each(function () {
        var $container = $(this),
            $item = $container.find(settings.selector),
            offX = parseInt($item.css('marginLeft')) + parseInt($item.css('paddingLeft')),
            offY = parseInt($item.css('marginTop')) + parseInt($item.css('paddingTop')),
            outerW = $item.width() + offX + parseInt($item.css('marginRight')) + parseInt($item.css('paddingRight')),
            outerH = $item.height() + offY + parseInt($item.css('marginBottom')) + parseInt($item.css('paddingBottom'));
        $container.on('mouseover', settings.selector, function () {
            var $img = $(this).addClass(settings.zoomCssClass).find(settings.imgSelector),
                css = {
                    'left': '-' + offX + 'px',
                    'top': '-' + offY + 'px',
                    'width': outerW + 'px',
                    'height': outerH + 'px'
                };
            if (settings.isThumb) {
                $img.one('load', function () {
                    $('<img>').load(function () {
                        var w = this.width, h = this.height, rw = outerW / w, rh = outerH / h;
                        if (rw > rh) {
                            css.paddingLeft = css.paddingRight = parseInt((outerW - rh * w) / 2) + 'px';
                        } else {
                            css.paddingTop = css.paddingBottom = parseInt((outerH - rw * h) / 2) + 'px';
                        }
                        $img.css(css);
                        $(this).off('load').remove();
                    }).attr('src', this.src);
                }).attr('src', $img.attr('src').replace('_s.gif', '.gif'));
            } else {
                $img.css(css);
            }
        }).on('mouseout', settings.selector, function () {
            var $img = $(this).removeClass(settings.zoomCssClass).find(settings.imgSelector);
            $img.removeAttr('style');
            if (settings.isThumb && $img.attr('src').indexOf('_s.') < 0) {
                $img.attr('src', $img.attr('src').replace('.gif', '_s.gif'));
            }
        });
    });
};
