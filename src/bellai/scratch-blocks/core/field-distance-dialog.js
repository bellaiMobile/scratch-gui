export default function (Blockly) {
    Blockly.FieldDisanceDialog = function (defaultValue) {
        Blockly.FieldDisanceDialog.superClass_.constructor.call(this, defaultValue);
        this.setValue(defaultValue);
        this.innerData_ = defaultValue;
    }
    goog.inherits(Blockly.FieldDisanceDialog, Blockly.FieldTextInput);

    Blockly.FieldDisanceDialog.fromJson = function (element) {
        return new Blockly.FieldDisanceDialog(element.defaultValue);
    };
    // props
    Blockly.FieldDisanceDialog.prototype.sliderback = null;
    Blockly.FieldDisanceDialog.prototype.labels = null;
    Blockly.FieldDisanceDialog.MIN_VALUE = 6;
    Blockly.FieldDisanceDialog.MAX_VALUE = 20;

    Blockly.FieldDisanceDialog.prototype.showEditor_ = function () {
        // this.reloadUI(); //需调用，改变UI
        var color = '#b3b3b3';
        var div = goog.dom.createDom('div', {
            'class': 'bell-distance-dialog'
        });
        var container = goog.dom.createDom('div', {
            'class': 'bell-distance-dialog-top-container'
        });

        var num_0 = goog.dom.createDom('div', {
            'style': 'position:absolute;color:' + color + ';left:5px;'
        }, '' + Blockly.FieldDisanceDialog.MIN_VALUE);
        var num_10 = goog.dom.createDom('div', {
            'style': 'position:absolute;color: ' + color + ';left:33.3333%;width:33.3333%;text-align:center;'
        }, '' + (Blockly.FieldDisanceDialog.MIN_VALUE + Math.floor((Blockly.FieldDisanceDialog.MAX_VALUE - Blockly.FieldDisanceDialog.MIN_VALUE) / 2)));
        var num_20 = goog.dom.createDom('div', {
            'style': 'position:absolute;color: ' + color + ';right:5px;'
        }, '' + Blockly.FieldDisanceDialog.MAX_VALUE);
        var topTextContainer = goog.dom.createDom('div', {
            'style': 'position:relative;'
        }, [num_0, num_10, num_20]);

        var txtTop = 30;
        var txt_near = goog.dom.createDom('div', {
            'style': 'position:absolute;color: ' + color + ';' +
                'left:5px;' +
                'top:' + txtTop + 'px',
        }, '低');
        var txt_middle = goog.dom.createDom('div', {
            'style': 'position:absolute;color: ' + color + ';' +
                'left:33.3333%;width:33.3333%;text-align:center;' +
                'top:' + txtTop + 'px',
        }, '中');
        var txt_far = goog.dom.createDom('div', {
            'style': 'position:absolute;color: ' + color + ';' +
                'right:5px;' +
                'top:' + txtTop + 'px',
        }, '高');
        var bottomTextContainer = goog.dom.createDom('div', {
            'style': 'position:relative;'
        }, [txt_near, txt_middle, txt_far]);

        this.labels = [num_0, num_10, num_20, txt_near, txt_middle, txt_far];

        this.sliderback = goog.dom.createDom('div', {
            'style': 'background-color: #fcc92d;border-radius:10px;height:20px;width:0px;'
        });
        var thumb = goog.dom.createDom('div', {
            'class': 'bell-distance-slider-thumb'
        });
        var slider = goog.dom.createDom('div', {
            'class': 'bell-distance-dialog-slider'
        },
            [this.sliderback, thumb]
        );

        goog.dom.appendChild(div, container);
        goog.dom.appendChild(container, topTextContainer);
        goog.dom.appendChild(container, slider);
        goog.dom.appendChild(container, bottomTextContainer);

        this.slider_ = new goog.ui.Slider(new goog.dom.DomHelper());
        this.slider_.setStep(Math.floor((Blockly.FieldDisanceDialog.MAX_VALUE - Blockly.FieldDisanceDialog.MIN_VALUE) / 2));
        this.slider_.setMinimum(Blockly.FieldDisanceDialog.MIN_VALUE);
        this.slider_.setMaximum(Blockly.FieldDisanceDialog.MAX_VALUE);
        this.slider_.setMoveToPointEnabled(true);
        this.slider_.decorate(slider);
        goog.events.listen(this.slider_, goog.ui.Component.EventType.CHANGE, this.ChangeSilder, false, this);

        // 确认按钮
        var saveBtn = goog.dom.createDom('div', {
            'class': 'bell-field-dialog-btn'
        });
        goog.dom.appendChild(div, saveBtn);
        Blockly.bindEvent_(saveBtn, 'mousedown', null, (e) => {
            // 删除语句块时， 如果结果是int 会提示不是node类型， 需要将结果转换为string
            this.setText(this.slider_.getValue());
            Blockly.DialogDiv.hide(); // hide
        });

        var me = this;
        Blockly.DialogDiv.show(div, function () {
            Blockly.unbindEvent_(saveBtn);
            // 点击空白区域取消 恢复当前设置的值
            me.innerData_ = me.text_;
        });
        this.reloadUI(); //需调用，改变UI
    }

    Blockly.FieldDisanceDialog.prototype.ChangeSilder = function () {
        // console.log(this.slider_.valueThumb.style.left) // slider thumb
        this.innerData_ = this.slider_.getValue();
        this.sliderback.style.width = ((this.slider_.getValue() - Blockly.FieldDisanceDialog.MIN_VALUE) / (Blockly.FieldDisanceDialog.MAX_VALUE - Blockly.FieldDisanceDialog.MIN_VALUE) * 284) +
            0 + 'px'; //背景变色，写死的
        this.renderLabels();
    };

    Blockly.FieldDisanceDialog.prototype.renderLabels = function () {
        var pStart = Blockly.FieldDisanceDialog.MIN_VALUE;
        var pMid = Blockly.FieldDisanceDialog.MIN_VALUE + Math.floor((Blockly.FieldDisanceDialog.MAX_VALUE - Blockly.FieldDisanceDialog.MIN_VALUE) / 2);
        var pEnd = Blockly.FieldDisanceDialog.MAX_VALUE;
        var focusColor = '#fcc92d';
        var normalColor = '#b3b3b3';
        if (this.innerData_ < pMid) {
            for (var i = 0; i < this.labels.length; i++) {
                if (i % 3 === 0) {
                    this.labels[i].style.color = focusColor;
                } else {
                    this.labels[i].style.color = normalColor;
                }
            }
        } else if (this.innerData_ < pEnd) {
            for (var i = 0; i < this.labels.length; i++) {
                if (i % 3 <= 1) {
                    this.labels[i].style.color = focusColor;
                } else {
                    this.labels[i].style.color = normalColor;
                }
            }
        } else if (this.innerData_ === pEnd) {
            for (var i = 0; i < this.labels.length; i++) {
                this.labels[i].style.color = focusColor;
            }
        } else {
            for (var i = 0; i < this.labels.length; i++) {
                this.labels[i].style.color = normalColor;
            }
        }
    };

    Blockly.FieldDisanceDialog.prototype.reloadUI = function () {
        // left: 130px; top: -2px; = 13
        // left: 259px; top: -2px; = 20
        if (this.innerData_ == 13) {
            this.slider_.valueThumb.style.left = "130px";
        } else if (this.innerData_ == 20) {
            this.slider_.valueThumb.style.left = "259px";
        } else {
            this.slider_.valueThumb.style.left = "0px";
        }
        this.slider_.setValue(this.innerData_);
        this.renderLabels();
    };

    Blockly.FieldDisanceDialog.prototype.dispose = function () {
        this.sliderback = null;
        this.labels = null;
        this.slider_ = null;
        // Blockly.FieldDisanceDialog.prototype.dispose.call(this);
    };

    Blockly.Field.register('field_disanceDialog', Blockly.FieldDisanceDialog);
}