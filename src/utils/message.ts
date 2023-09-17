export const MESSAGE_TYPE = {
  ROUTING: 'routing',
  COMMENT: 'comment',
  COMMENT_LIST: 'commentList',
  POST_INFO: 'postInfo',
  GET_POST_INFO: 'getPostInfo',
  GET_COMMENT_LIST: 'getCommentList',
} as const;

export type MessageKeyType = keyof typeof MESSAGE_TYPE;
export type MessageType = (typeof MESSAGE_TYPE)[MessageKeyType];

export type Message<T> = {
  type: MessageType;
  payload?: T;
};

export type MessageCallbacks = {
  [key in MessageType]?: (payload: any, sendResponse: any) => void;
};

export const sendMessage = <T = any>(message: Message<T>) => chrome.runtime?.sendMessage(message);

export const listenMessage = (callback: MessageCallbacks) =>
  chrome.runtime.onMessage.addListener((message, _, sendResponse) =>
    callback?.[message?.type]({ payload: message?.payload, sendResponse }),
  );
