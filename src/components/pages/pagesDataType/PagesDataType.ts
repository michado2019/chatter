
export type PostData = {
    img: string;
    title: string;
    html: string;
    text: string;
    love: number;
    comment: number;
    views: number;
    bookMark: false,
    date: string;
    allPosts: PostData[];
    id: number | string;
    isLiked: boolean;
  };