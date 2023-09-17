import * as CommentStore from '@store/comment';
import { MESSAGE_TYPE, MessageCallbacks, listenMessage } from '@utils/message';

const messageCallbacks: MessageCallbacks = {
  [MESSAGE_TYPE.ROUTING]: () => {
    CommentStore.clear();
  },
  [MESSAGE_TYPE.POST_INFO]: ({ payload }: { payload: { title: string; author: string } }) => {
    CommentStore.setPostInfo(payload);
  },
  [MESSAGE_TYPE.COMMENT]: ({ payload }) => {
    CommentStore.addCommentList(new Map(payload));
  },
  [MESSAGE_TYPE.GET_POST_INFO]: ({ sendResponse }) => {
    sendResponse(CommentStore.getPostInfo());
  },
  [MESSAGE_TYPE.GET_COMMENT_LIST]: ({ sendResponse }) => {
    const commentListMap = CommentStore.getCommentList();
    sendResponse(JSON.stringify(Object.fromEntries(commentListMap)));
  },
};

listenMessage(messageCallbacks);
