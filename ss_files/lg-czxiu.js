(function ($) {
    'use strict';
    var defaults = {
        glyCssPrefix: 'glyphicon glyphicon-',
        toolbars: [{
            icon: 'edit',
            title: '定制',
            click: null
        }]
    };

    var Czxiu = function (element) {
        // get lightGallery core plugin data
        this.core = $(element).data('lightGallery');
        this.$el = $(element);
        // extend module defalut settings with lightGallery core settings
        this.core.s = $.extend({}, defaults, this.core.s);
        this.init();
        return this;
    };

    Czxiu.prototype.init = function () {
        var _this = this;
        // add buttons
        $.each(_this.core.s.toolbars, function () {
            var $btn = $('<span/>').attr({
                class: 'lg-icon ' + _this.core.s.glyCssPrefix + this.icon,
                title: this.title
            }), _click = this.click, _icon = this.icon;
            $btn.on('click', function () {
                var $image = _this.core.$outer.find('.lg-current .lg-image');
                if (_click !== null) {
                    _click.apply($image[0]);
                }
                if (_icon === 'edit') {
                    var $item = _this.core.$items.eq(_this.core.index);
                    if ($item.attr('data-edit')) {
                        setTimeout(function () {
                            window.location.href = $item.attr('data-edit');
                        }, 0);
                    }
                }
                _this.$el.trigger('onToolbarClick.lg', [$image[0], _icon]);
            }).appendTo(_this.core.$outer.find('.lg-toolbar'));
        });
    };

    Czxiu.prototype.destroy = function () {
    };

    $.fn.lightGallery.modules.czxiu = Czxiu;

})(jQuery);
