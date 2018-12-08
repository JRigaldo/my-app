import {inject, bindable} from 'aurelia-framework';
import {ValidationRules, ValidationControllerFactory, validationMessages} from 'aurelia-validation';
import {PostService} from '../../common/services/post-service';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(PostService, ValidationControllerFactory, EventAggregator)
export class PostForm{
  @bindable title;
  @bindable post;

  constructor(PostService, ValidationControllerFactory, EventAggregator){
    this.ea = EventAggregator;
    this.postService = PostService;
    this.controller = ValidationControllerFactory.createForCurrentScope();
    console.log(this.controller);
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
  }

  submit(){

  }

  addTag(){
    this.allTags.push(this.newTag);
    this.post.tags.push(this.newTag);
    this.newTag = '';
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
        .maxLength(50)
       .on(this.post);

      this.controller.validate();
    }
  }

}
