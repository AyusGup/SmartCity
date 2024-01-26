// src/HTMLFileRenderer.js

import React, { useState, useEffect } from 'react';

const HTMLFileRenderer = () => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const fetchHTML = async () => {
      try {
        const response = await fetch('/index2.html'); // Update the path accordingly
        const html = await response.text();
        setHtmlContent(html);
        console.log(response)
      } catch (error) {
        console.error('Error fetching HTML:', error);
      }
    };

    fetchHTML();
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default HTMLFileRenderer;
