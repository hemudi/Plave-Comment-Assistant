import { CommentList } from '@store/comment';
import { MESSAGE_TYPE } from '@utils/message';
import { useEffect, useState } from 'react';

const useCommentList = () => {
  const [commentList, setCommentList] = useState<CommentList>(new Map());

  const getCommentList = async () => {
    chrome.runtime.sendMessage({ type: MESSAGE_TYPE.GET_COMMENT_LIST }, (responseData) => {
      setCommentList(new Map(Object.entries(JSON.parse(responseData))));
    });
  };

  useEffect(() => {
    getCommentList();
  }, []);

  return commentList;
};

export default useCommentList;
