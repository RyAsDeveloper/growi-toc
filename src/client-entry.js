import remarkToc from "remark-toc";
console.log("★ プラグインのスクリプトファイル自体はロードされました！");
const activate = () => {
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
    const originalGeneratePreviewOptions = optionsGenerators.customGeneratePreviewOptions;
    optionsGenerators.customGeneratePreviewOptions = (...args) => {
        const preview = originalGeneratePreviewOptions
            ? originalGeneratePreviewOptions(...args)
            : optionsGenerators.generatePreviewOptions(...args);
        console.log("★ TOC Plugin Preview フック通過！");
        preview.remarkPlugins = [...(preview.remarkPlugins || []), tocPluginConfig];
        return preview;
    };
};
const deactivate = () => { };
if (window.pluginActivators == null) {
    window.pluginActivators = {};
}
window.pluginActivators["growi-plugin-custom-toc"] = {
    activate,
    deactivate,
};
