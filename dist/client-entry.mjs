// src/client-entry.tsx
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
var activate = () => {
  const growiFacade = window.growiFacade;
  if (growiFacade == null || growiFacade.markdownRenderer == null) return;
  const { optionsGenerators } = growiFacade.markdownRenderer;
  const originalCustomViewOptions = optionsGenerators.customGenerateViewOptions;
  const originalCustomPreviewOptions = optionsGenerators.customGeneratePreviewOptions;
  optionsGenerators.customGenerateViewOptions = (...args) => {
    const options = originalCustomViewOptions ? originalCustomViewOptions(...args) : optionsGenerators.generateViewOptions(...args);
    options.remarkPlugins.push([remarkToc, { heading: "(table[ -]of[ -])?contents?|toc|\u76EE\u6B21|\u76EE\u5F55" }]);
    options.rehypePlugins.push(rehypeSlug);
    return options;
  };
  optionsGenerators.customGeneratePreviewOptions = (...args) => {
    const options = originalCustomPreviewOptions ? originalCustomPreviewOptions(...args) : optionsGenerators.generatePreviewOptions(...args);
    options.remarkPlugins.push([remarkToc, { heading: "(table[ -]of[ -])?contents?|toc|\u76EE\u6B21|\u76EE\u5F55" }]);
    options.rehypePlugins.push(rehypeSlug);
    return options;
  };
};
export {
  activate
};
