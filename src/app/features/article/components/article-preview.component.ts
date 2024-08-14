import { Component, Input } from "@angular/core";
import { Article } from "../models/article.model";
import { ArticleMetaComponent } from "./article-meta.component";
import { RouterLink } from "@angular/router";
import { NgForOf } from "@angular/common";

@Component({
  selector: "app-article-preview",
  template: `
    <div class="article-preview">
      <app-article-meta [article]="article">
      </app-article-meta>

      <a [routerLink]="['/article', article.slug]" class="preview-link">
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <span>Read more...</span>
      </a>
    </div>
  `,
  imports: [ArticleMetaComponent, RouterLink, NgForOf],
  standalone: true,
})
export class ArticlePreviewComponent {
  @Input() article!: Article;
}
