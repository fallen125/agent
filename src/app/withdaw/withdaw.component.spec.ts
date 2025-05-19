import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdawComponent } from './withdaw.component';

describe('WithdawComponent', () => {
  let component: WithdawComponent;
  let fixture: ComponentFixture<WithdawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithdawComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
