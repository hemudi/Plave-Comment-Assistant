import { PostInfo } from '@store/comment';
import { MESSAGE_TYPE } from '@utils/message';
import { useEffect, useState } from 'react';

const usePostInfo = () => {
  const [postInfo, setPostInfo] = useState<PostInfo>({ title: '', author: '' });

  const getCommentStore = async () => {
    chrome.runtime.sendMessage({ type: MESSAGE_TYPE.GET_POST_INFO }, (responseData) => {
      setPostInfo(responseData);
    });
  };

  useEffect(() => {
    getCommentStore();
  }, []);

  return postInfo;
};

export default usePostInfo;
