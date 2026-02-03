export type BlogDetail = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  description: string;
  content: string;
  thumbnail: {
    url: string;
    height: number;
    width: number;
  };
  tags: string[];
  writer: null | string;
};
