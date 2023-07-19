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
  comment: Comment[]; // Update this line
};

export type Comment = {
  id: string;
  commentMsg: string;
};
