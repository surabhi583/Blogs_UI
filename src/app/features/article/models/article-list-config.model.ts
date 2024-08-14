export interface ArticleListConfig {
  type: string;

  filters: {
    author?: string;
    limit?: number;
    offset?: number;
  };
}
