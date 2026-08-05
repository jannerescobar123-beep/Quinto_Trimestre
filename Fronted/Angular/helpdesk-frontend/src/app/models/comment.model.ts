export interface CommentAuthor {

  id: string;

  name: string;

  role: string;

}

export interface Comment {

  id: string;

  ticketId: string;

  body: string;

  author: CommentAuthor;

  createdAt: string;

}

export interface CommentResponse {

  data: Comment[];

  total: number;

}

export interface CreateCommentRequest {

  body: string;

}