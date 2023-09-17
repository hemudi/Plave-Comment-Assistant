import '@styles/contentScript.css';

import { CATEGORY_ID, parseURL } from '@utils/path';
import { MESSAGE_TYPE, sendMessage } from '@utils/message';
import runCommentObserver from '@contexts/contentScript/commentObserver';

const observers = {
  [CATEGORY_ID.FROM_PLAVE]: runCommentObserver,
  [CATEGORY_ID.CAELUM_TALK]: () => {},
  default: runCommentObserver,
};

const runPostObserver = () => {
  const { postId, categoryId } = parseURL(window.location.href);
  if (postId) {
    (observers?.[categoryId] || observers.default)();
  }
};

const handleIframeLoad = () => {
  sendMessage({ type: MESSAGE_TYPE.ROUTING });
  runPostObserver();
};

const run = () => {
  const $iframe = document.querySelector('iframe');
  $iframe?.addEventListener('load', handleIframeLoad);
};

/* Main */
run();
