import { ParsedUrl, parseURL } from '@utils/path';
import { useLayoutEffect, useState } from 'react';

const useCurrentURL = () => {
  const [url, setUrl] = useState<ParsedUrl>();

  const getCurrentTab = async () => {
    const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const parsedURL = parseURL(currentTab?.url || '');
    setUrl(parsedURL);
  };

  useLayoutEffect(() => {
    getCurrentTab();
  }, []);

  return url;
};

export default useCurrentURL;
