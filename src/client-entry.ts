import remarkToc from "remark-toc";

type Options = { remarkPlugins: any[] };
type ViewOptions = Options;
type Func = any;

declare const growiFacade: {
  markdownRenderer?: {
    optionsGenerators: {
      customGenerateViewOptions: (
        path: string,
        options: Options,
        toc: Func,
      ) => ViewOptions;
      generateViewOptions: (
        path: string,
        options: Options,
        toc: Func,
      ) => ViewOptions;
      customGeneratePreviewOptions: (
        path: string,
        options: Options,
        toc: Func,
      ) => ViewOptions;
      generatePreviewOptions: (
        path: string,
        options: Options,
        toc: Func,
      ) => ViewOptions;
    };
  };
};

const activate = (): void => {
  if (growiFacade == null || growiFacade.markdownRenderer == null) {
    return;
  }

  const { optionsGenerators } = growiFacade.markdownRenderer;

  const tocPluginConfig = [
    remarkToc,
    {
      heading: "目次",
      maxDepth: 3,
      tight: true,
    },
  ];

  const originalCustomViewOptions = optionsGenerators.customGenerateViewOptions;
  optionsGenerators.customGenerateViewOptions = (...args) => {
    const options = originalCustomViewOptions
      ? originalCustomViewOptions(...args)
      : optionsGenerators.generateViewOptions(...args);

    console.log("★ TOC Plugin View フック通過！");
    options.remarkPlugins = [...(options.remarkPlugins || []), tocPluginConfig];
    return options;
  };

  const originalGeneratePreviewOptions =
    optionsGenerators.customGeneratePreviewOptions;
  optionsGenerators.customGeneratePreviewOptions = (...args) => {
    const preview = originalGeneratePreviewOptions
      ? originalGeneratePreviewOptions(...args)
      : optionsGenerators.generatePreviewOptions(...args);

    console.log("★ TOC Plugin Preview フック通過！");
    preview.remarkPlugins = [...(preview.remarkPlugins || []), tocPluginConfig];
    return preview;
  };
};

const deactivate = (): void => {};

if ((window as any).pluginActivators == null) {
  (window as any).pluginActivators = {};
}
(window as any).pluginActivators["growi-plugin-custom-toc"] = {
  activate,
  deactivate,
};
