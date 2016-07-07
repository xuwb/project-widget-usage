'use strict'
define(function(require, exports, module) {
    var $ = require('$'),
        MyWidget = require('common/myWidget'),
        Ajax = require('model/ajax/main');

    var template = require('./demo-hbs');

    var Demo = MyWidget.extend({
        //组件：类名
        clssName: 'Demo1',
        propsInAttrs: ['element', 'container', 'data', 'events'],
        //组件：属性
        attrs: {
            // element: '.container',
            container: '#content',
            opts: '1',
            // data: {
            //     info:  [{id: 1, name: 'xuwb'},
            //             {id: 2, name: 'jack'},
            //             {id: 3, name: 'tom'},
            //             {id: 4, name: 'bean'}]
            // },
            triggerElem: {
                delBtn: '.JS_delBtn',
                addBtn: '.JS_addBtn',
                modBtn: '.JS_modBtn',
                input:  '#inputName'
            },
            o: {
                value: 'o1',
                getter: function(v){
                    return v + '-getter'
                }
            }
        },
        _onRenderData: function(val) {
            $(this.container).html(template(this.get('data')));
            this.reset();
        },
        initProps: function(){
            this.b = 'b1'
        },
        events: {
            'click {{attrs.triggerElem.delBtn}}': function(e) {
                var elem = $(e.target),
                    data = this.get('data').info,
                    id = elem.data('id');

                var index = this.getDataIndexById(data, id);
                index != -1 && data.splice(index, 1);

                this.set('data', {info: data});
                // console.log(this.get('data'), this.data)
                this.render();
                // this.element 返回jquery对象
            },
            'click {{attrs.triggerElem.addBtn}}': function(e) {
                var input = this.get('triggerElem').input,
                    addBtn = this.get('triggerElem').addBtn,
                    newId = randomStr(6),
                    modItem = this.element.data('modItem'),
                    data = this.get('data').info;

                var inputVal = $(input).val();
                if(!inputVal) return;

                if($(addBtn).html() == '修改' && modItem) {
                    data[modItem.i].name = inputVal;
                } else {
                    data.push({id: newId, name: inputVal});
                }
                
                this.set('data', {info: data});

                this.render();
            },
            'click {{attrs.triggerElem.modBtn}}': function(e) {
                var elem = $(e.target),
                    input = this.get('triggerElem').input,
                    addBtn = this.get('triggerElem').addBtn,
                    data = this.get('data').info,
                    id = elem.data('id');

                var index = this.getDataIndexById(data, id),
                    value = data[index].name;
                this.element.data('modItem', {i: index, val: value});

                $(input).val(value);
                $(addBtn).html('修改');
            }
        },
        reset: function() {
            var addBtn = this.get('triggerElem').addBtn,
                input = this.get('triggerElem').input;

            $(addBtn).html('添加');
            $(input).val('');
            delete this.element.data('modId');
        },
        getDataIndexById: function(arr, id) {
            var index = -1;
            $.each(arr, function(i, val) {
                if(val.id == id) {
                    index = i;
                    return false;
                }
            });
            return index;
        },
        setup: function(){
            console.log("opts", this.get('opts'));
            console.log(this);
            this.render();
        }
    }); 
    return Demo;

    function randomBy(max, mix) {
        var result = 0;
        switch(arguments.length) {
            case 1: 
                result = parseInt(Math.random() * max + 1);
                break;
            case 2: 
                result = parseInt(Math.random() * (max - mix + 1) + mix);
                break;
        }
        return result;
    }
    function randomStr(len) {
        var str = '';
        for(var i = 0; i < len; i++) {
            str += randomBy(10, 0);
        }
        return str;
    }
})