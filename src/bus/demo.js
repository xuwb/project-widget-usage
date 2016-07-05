'use strict'
define(function(require, exports, module) {
    var $ = require('$'),
        MyWidget = require('common/myWidget');

    var Demo = MyWidget.extend({
        //组件：类名
        clssName: 'Demo1',
        propsInAttrs: ['o'],
        //组件：属性
        attrs: {
            element: 'body',
            a: 'a2',
            o: {
                value: 'o1',
                getter: function(v){
                    return v + '-getter'
                }
            }
        },
        initProps: function(){
            this.b = 'b1'
        },
        events: {
            'click button': function(e) {
                console.log(this.o);
            }
        },
        setup: function(){
            var me = this;
            // me.element.html( HBS({a: 'a1'}) );
            console.log(me.element.data('options'));
        }
    });
    return Demo

})