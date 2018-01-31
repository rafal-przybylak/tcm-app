import { Component, ElementRef, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';

import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged';

import Quill from 'quill';

// add image resize module
import ImageResize from 'quill-image-resize-module';
Quill.register('modules/imageResize', ImageResize);

// override p with div tag
const Parchment = Quill.import('parchment');
let Block = Parchment.query('block');

Block.tagName = 'DIV';
// or class NewBlock extends Block {}; NewBlock.tagName = 'DIV';
Quill.register(Block /* or NewBlock */, true);

//import Counter from './counter';
//Quill.register('modules/counter', Counter)

// Add fonts to whitelist
var Font = Quill.import('formats/font');
// We do not add Aref Ruqaa since it is the default
Font.whitelist = ['mirza', 'aref', 'sans-serif', 'monospace', 'serif'];
Quill.register(Font, true);
@Component({
  selector: 'tcm-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RichTextEditorComponent implements OnInit {

  title = '<ul><li>I am example content</li><li><u>And this, too</u></li></ul>';
  isReadOnly = false;
  form: FormGroup;

hide :boolean;
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      editor: ['test']
    });
  }
  @ViewChild('editor') editor: QuillEditorComponent

  ngOnInit() {
    this.form
      .controls
      .editor
      .valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(data => {
        console.log('native fromControl value changes with debounce', data)
      });

    // this.editor
    //   .onContentChanged.debounceTime(400)
    //   .distinctUntilChanged()
    //   .subscribe(data => {
    //     console.log('view child + directly subscription', data)
    //   });
  }

  setFocus($event) {
    $event.focus();
  }

  patchValue() {
    this.form.controls['editor'].patchValue(`${this.form.controls['editor'].value} patched!`)
  }

  toggleReadOnly() {
    this.isReadOnly = !this.isReadOnly;
  }

  logChange($event: any) {
    console.log($event);
  }

  logSelection($event: any) {
    console.log($event);
  }

}
