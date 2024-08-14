import { Profile } from "../../profile/models/profile.model";

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  author: Profile;
}
