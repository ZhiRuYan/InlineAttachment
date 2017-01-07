/*jslint newcap: true */
/*global inlineAttachment: false */

import InlineAttachment from "../inline-attachment";

export default class CodeMirror3 {

  constructor(instance, options) {
    if (!instance.getWrapperElement) {
      throw "Invalid CodeMirror object given";
    }

    this.instance = instance;
    this.options = options;
    this.bind();
  }

  getValue() {
    return this.instance.getValue();
  }

  insertValue(value) {
    this.instance.replaceSelection(value);
  }

  setValue(value) {
    let cursor = this.instance.getCursor();
    this.instance.setValue(value);
    this.instance.setCursor(cursor);
  }

  bind() {

    let inlineAttachment = new InlineAttachment(this, this.options);
    let el = this.instance.getWrapperElement();

    el.addEventListener('paste', function(e) {
      inlineAttachment.onPaste(e);
    }, false);

    this.instance.setOption('onDragEvent', function(data, e) {
      if (e.type === "drop") {
        e.stopPropagation();
        e.preventDefault();
        return inlineAttachment.onDrop(e);
      }
    });
  }
}