import { MEMBER, MemberName, findMemberData } from '@constants/member';

export interface CommentData {
  seq: string;
  parseq: string;
  nickname: string;
  thumbnail: string;
  data: string;
  date: string;
  comment: string;
  attachImage: string;
  isReply: boolean;
  isMember: boolean;
  memberName?: (typeof MemberName)[number];
  replies: CommentData[];
}

export type PostInfo = Pick<CommentStore, 'title' | 'author'>;
export type CommentList = Map<string, CommentData>;

export interface CommentStore {
  title: string;
  author: string;
  allCommentList: CommentList;
  filteredCommentList: CommentList;
}

const commentStore: CommentStore = {
  title: '',
  author: '',
  allCommentList: new Map(),
  filteredCommentList: new Map(),
};

export const clear = () => {
  commentStore.title = '';
  commentStore.author = '';
  commentStore.allCommentList = new Map();
  commentStore.filteredCommentList = new Map();
};

export const setPostInfo = ({ title, author }: Pick<CommentStore, 'title' | 'author'>) => {
  commentStore.title = title;
  commentStore.author = author;
};

export const getPostInfo = () => ({ title: commentStore.title, author: commentStore.author });

export const filterCommentList = (commentMap: Map<string, CommentData>) => {
  const memberCommentMap: CommentList = new Map();
  commentMap.forEach((commentData, seq) => {
    const { isReply, nickname, parseq } = commentData;
    const memberData = findMemberData(nickname);

    if (!memberData || memberData.name === MEMBER.Plli.name) return;

    commentData.isMember = true;
    commentData.memberName = memberData.name;

    if (!isReply) {
      memberCommentMap.set(seq, commentData);
      return;
    }

    const preComment = memberCommentMap.has(parseq)
      ? memberCommentMap.get(parseq)
      : commentStore.allCommentList.get(parseq);

    if (!preComment) return;

    if (!preComment.replies) {
      preComment.replies = [];
    }

    preComment.replies.push(commentData);
    memberCommentMap.set(preComment.seq, preComment);
  });
  return memberCommentMap;
};

export const addCommentList = (commentMap: Map<string, CommentData>) => {
  commentStore.allCommentList = commentMap;
  commentStore.filteredCommentList = filterCommentList(commentMap);
};

export const getCommentList = () => commentStore.filteredCommentList;

export const getCommentStore = () => commentStore;
