import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appJumper]'
})
export class JumperDirective {
  position = 'left';


  constructor(private el:ElementRef) { }

  @HostListener('mouseenter') onMouseEnter(){
    this.togglePosition();
  }

  private togglePosition(){
    if(this.position === 'left'){
      this.el.nativeElement.style.cssFloat='left';
      this.position = 'right';
    }else{
      this.el.nativeElement.style.cssFloat='right';
      this.position = 'left';
    }

  }


}
