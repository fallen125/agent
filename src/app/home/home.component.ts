import {  NgClass, NgFor, NgIf } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { Router, RouterModule} from '@angular/router';
import { ChatComponent } from "../chat/chat.component";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, RouterModule, ChatComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('expandCollapse', [
      state('open', style({
        height: '*',
        opacity: 1,
        padding: '6px'
      })),
      state('closed', style({
        height: '0px',
        opacity: 0,
        padding: '0'
      })),
      transition('closed <=> open', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class HomeComponent implements OnInit{ 
  isLoggedIn = false

  isScrolled = false

  mobileMenuOpen = false;

  ngOnInit(): void {
    this.checkLoginStatus()
  }

 checkLoginStatus() {
  if (typeof window !== 'undefined' && window.localStorage) {
    this.isLoggedIn = !!localStorage.getItem('loggedInUser');
  }
}

  constructor(private router: Router){}
 

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50
  }

  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId)
    if(element) {
      element.scrollIntoView({ behavior: 'smooth'})
    }
  }

  questions = [
    {question: 'How does it work?', answer: 'The techniques we use to recover our clients’ accounts vary widely from case to case. In the event of a password recovery we will walk our clients through extracting an encrypted private key backup and building a comprehensive list of possible password guesses. We then transfer our client’s data to secure password cracking servers that use the data collected from the client to try billions or trillions of possible password combinations until the correct password is found.', open: false},
    {question: 'How long does the process take?', answer: 'The process of recovering lost crypto can vary in time from as short as 1 hour, to as long as 6+ months.While this may sound lengthy, this is because we typically exhaust our initial search within a week after initially onboarding a client. After this initial search has been exhausted, we hold on to the private key backup and password guesses to continue retesting as we discover new recovery vectors and expand our hardware capabilities (unless otherwise requested to delete client information).', open: false},
    {question: 'What types of crypto can you recover?', answer: 'The types of crypto that we support are expanding every day. At the moment we support seed phrase recovery for any type of bip-39 or erc-20 token including legacy mnemonics, 13th and 25th words.', open: false},
    {question: 'Do i need to tell you all my passwords?', answer: 'No. We will never ask our clients to divulge more information than they are comfortable sharing with us.', open: false}
  ]



  toggleAnswer(index: number) {
   
      this.questions[index].open = !this.questions[index].open;
    
  }

  toggleMobileMenu() {
  this.mobileMenuOpen = !this.mobileMenuOpen;
}

closeMobileMenu() {
  this.mobileMenuOpen = false;
}


navigateAndClose(section: string) {
  this.scrollTo(section);
  this.closeMobileMenu();
}

  logout() {
    localStorage.removeItem('loggedInUser');
    this.isLoggedIn = false;
    this.router.navigate(['/main']);
  }

}
