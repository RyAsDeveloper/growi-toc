// src/client-entry.tsx
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';

export const activate = (): void => {
  // @ts-ignore: GROWIのグローバルオブジェクトにアクセス
  const growiFacade = window.growiFacade;
  
  if (growiFacade == null || growiFacade.markdownRenderer == null) return;

  const { optionsGenerators } = growiFacade.markdownRenderer;
  const originalCustomViewOptions = optionsGenerators.customGenerateViewOptions;
  const originalCustomPreviewOptions = optionsGenerators.customGeneratePreviewOptions;

  // 本文（View）用のオプション書き換え
  optionsGenerators.customGenerateViewOptions = (...args: any[]) => {
    const options = originalCustomViewOptions 
      ? originalCustomViewOptions(...args) 
      : optionsGenerators.generateViewOptions(...args);
    
    // 見出しのパターンを指定（英語・日本語対応）
    options.remarkPlugins.push([remarkToc, { heading: '(table[ -]of[ -])?contents?|toc|目次|目录' }]);
    options.rehypePlugins.push(rehypeSlug);
    
    return options;
  };

  // プレビュー用のオプション書き換え
  optionsGenerators.customGeneratePreviewOptions = (...args: any[]) => {
    const options = originalCustomPreviewOptions 
      ? originalCustomPreviewOptions(...args) 
      : optionsGenerators.generatePreviewOptions(...args);
    
    options.remarkPlugins.push([remarkToc, { heading: '(table[ -]of[ -])?contents?|toc|目次|目录' }]);
    options.rehypePlugins.push(rehypeSlug);
    
    return options;
  };
};
