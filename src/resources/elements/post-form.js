import {inject, bindable} from 'aurelia-framework';
import {ValidationRules, ValidationControllerFactory, validationMessages} from 'aurelia-validation';
import {PostService} from '../../common/services/post-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import $ from 'jquery';
import * as textareaAutosize from 'textarea-autosize';
import {DialogService} from 'aurelia-dialog';
import {Prompt} from '../modal/prompt';
import {Router} from 'aurelia-router';

@inject(PostService, ValidationControllerFactory, EventAggregator, DialogService, Router)
export class PostForm{
  @bindable title;
  @bindable post;


  constructor(PostService, ValidationControllerFactory, EventAggregator, DialogService, Router){
    this.ea = EventAggregator;
    this.postService = PostService;
    this.controller = ValidationControllerFactory.createForCurrentScope();
    this.dialogService = DialogService;
    this.isCreate = false;
    this.router = Router;
  }

  attached(){
    this.postService.allTags().then(data => {
      this.allTags = data.tags;
    }).catch(error => {
      this.ea.publish('toast', {
        type: 'error',
        message: error.message
      })
    });

    $('textarea.js-auto-size').textareaAutoSize();

    $('.field-input, .field-textarea').focus(function(){
      $(this).parent().addClass('is-focused has-label');
    });

    $('.field-input, .field-textarea').blur(function(){
      if($(this).val() == ''){
        $(this).parent().removeClass('has-label');
        $(this).parent().children('span').addClass('line');
      }
      $(this).parent().removeClass('is-focused');
    });

    if(this.router.currentInstruction.config.name === 'create-post'){
      this.isCreate = true;
      $('input, textarea').removeAttr('placeholder')
    }else if (this.router.currentInstruction.config.name === 'post-edit') {
      setTimeout(() => {
        $("textarea").height($("textarea")[0].scrollHeight);
      }, 100)
    }
  }

  newTag = '';
  openModal(){
    // if (e.keyCode == 13) {
    //     var tb = document.getElementById("scriptBox");
    //     eval(tb.value);
    //     return false;
    // }
    this.dialogService.open({ viewModel: Prompt, model: this.newTag, lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
        if(response.output !== null && response.output !== ''){
          for (var i = 0; i < this.allTags.length; i++) {
            if (response.output === this.allTags[i]) {
              return console.log('tag already existe');
            }
          }
          console.log('good - ', response.output);
          this.allTags.push(response.output);
          this.post.tags.push(response.output);
        }else{
          console.log('Empty value');
        }
      } else {
        console.log('bad');
      }
      console.log(response.output);
    });
  }

  submit(){

  }

  postChanged(newValue, oldValue){

    validationMessages['required'] = `You must enter a \${$displayName}.`;

    if(this.post){
      ValidationRules
      .ensure('title').displayName('title')
        .required()
        .minLength(5)
        .maxLength(50)
      .ensure('body').displayName('body')
        .required()
        .minLength(5)
        .maxLength(650)
       .on(this.post);

      this.controller.validate();
    }
  }

}
