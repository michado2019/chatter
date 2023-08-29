export type PostData = {
  id: string | number;
  img: string;
  userName: string;
  userImg: string;
  date: string;
  title: string;
  html: string;
  text: string;
  love: number;
  views: number;
  isLiked: boolean;
  bookMark: string[];
  allPosts: PostData[];
  uid: string;
  comment: Comment[];
  commentImg: string,
  commentName: string,
  commentDate: string,
  replies: Comment[]
  comments: Comment[]
};

export type Comment = {
  id: string;
  commentMsg: string;
  commentImg: string,
  commentName: string,
  commentDate: string,
  replies: Comment[],
  replyMsg: string,
  replyImg: string
};
