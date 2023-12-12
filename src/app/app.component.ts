import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {IMessage} from "./interface/i-message";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chatbox';
  text: string = '';

  messageHistory: IMessage[] = []
  @ViewChild('textbox') content!: ElementRef;

  constructor(private ref: ChangeDetectorRef,) {
  }

  chat() {
    if (this.text.trim().length > 0) {
      this.messageHistory.push({
        id: this.messageHistory.length,
        user: 'You',
        message: this.text.trim(),
        date: new Date(),
      })

      let reply: string = '';
      let lowerCaseText = this.text.trim().toLowerCase();
      if (this.text === this.text.toUpperCase()) {
        reply = 'Please remain calm.';
        if ((lowerCaseText.includes(' how ') || lowerCaseText.includes(' what ') || lowerCaseText.includes(' why ') || lowerCaseText.includes(' who ') || lowerCaseText.includes(' which ') || lowerCaseText.includes(' ?'))) {
          reply = 'Please give me some time to resolve the issue.';
        }
      } else {
        if (lowerCaseText.includes(' how ') || lowerCaseText.includes(' what ') || lowerCaseText.includes(' why ') || lowerCaseText.includes(' who ') || lowerCaseText.includes(' which ') || lowerCaseText.includes(' ?')) {
          reply = 'Yes';
        } else if (lowerCaseText == 'jamie') {
          reply = 'Can I help you?';
        } else {
          reply = 'Sorry, I don’t understand';
        }
      }
      this.messageHistory.push({
        id: this.messageHistory.length,
        user: 'Jamie',
        message: reply,
        date: new Date(),
      })
      this.text = '';
      this.ref.detectChanges();
      this.ref.markForCheck();
      this.scrollToSection('bottom');
    } else {
      this.text = ''
    }

  }

  scrollToSection(sectionId: string) {
    const element = this.content.nativeElement.querySelector(`#${sectionId}`);
    console.log(sectionId)
    if (element) {
      element.scrollIntoView({behavior: 'smooth'});
    }
  }


}
