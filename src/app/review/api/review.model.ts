export interface Review {
  email: string;
  rating: number;
  name: string;
  review: string;
}

export interface UpdatableReview extends Review {
  access_key: string;
}

export interface LoadedReview extends UpdatableReview {

  creation_date: string;
}
