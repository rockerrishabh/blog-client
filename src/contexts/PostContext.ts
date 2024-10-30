import { createContext } from "react";

export type Post = {
  id: string;
  title: string;
  body: string;
  published: boolean;
  created_at: Date;
  updated_at: Date;
};

export type PostData = {
  title: string;
  body: string;
};

type PostState = {
  post: Post | undefined;
  posts: Post[] | undefined;
  success: string | undefined;
  error: string | undefined;
  loading: boolean;
  pending: boolean;
  fetchPost: (id: string) => Promise<void>;
  updatePost: (
    id: string,
    token: string,
    updatePostData: PostData,
  ) => Promise<void>;
};

const initialState: PostState = {
  post: undefined,
  posts: undefined,
  success: undefined,
  error: undefined,
  loading: false,
  pending: false,
  fetchPost: async () => {},
  updatePost: async () => {},
};

export const PostContext = createContext<PostState>(initialState);
