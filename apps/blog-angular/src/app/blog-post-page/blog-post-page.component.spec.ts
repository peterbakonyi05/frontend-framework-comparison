import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostPageComponent } from './blog-post-page.component';

describe('BlogPostPageComponent', () => {
  let component: BlogPostPageComponent;
  let fixture: ComponentFixture<BlogPostPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogPostPageComponent]
    });
    fixture = TestBed.createComponent(BlogPostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
