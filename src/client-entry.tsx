import remarkToc from "remark-toc";

// GROWIから渡される Facade オブジェクトの型定義（簡略化）
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

/**
 * プラグイン有効化時の処理
 */
const activate = (): void => {
  if (growiFacade == null || growiFacade.markdownRenderer == null) {
    return;
  }

  const { optionsGenerators } = growiFacade.markdownRenderer;

  // remark-toc の設定（「# 目次」をターゲットにする）
  const tocPluginConfig = [
    remarkToc,
    {
      heading: "目次",
      maxDepth: 3,
      tight: true,
    },
  ];

  // --- 1. 閲覧時 (View) のオプションジェネレーターをフック ---
  const originalCustomViewOptions = optionsGenerators.customGenerateViewOptions;
  optionsGenerators.customGenerateViewOptions = (...args) => {
    // 既存のオプションを取得
    const options = originalCustomViewOptions
      ? originalCustomViewOptions(...args)
      : optionsGenerators.generateViewOptions(...args);

    // remarkPlugins に目次プラグインを追加
    options.remarkPlugins.push(tocPluginConfig);
    return options;
  };

  // --- 2. プレビュー時 (Preview) のオプションジェネレーターをフック ---
  const originalGeneratePreviewOptions =
    optionsGenerators.customGeneratePreviewOptions;
  optionsGenerators.customGeneratePreviewOptions = (...args) => {
    // 既存のプレビューオプションを取得
    const preview = originalGeneratePreviewOptions
      ? originalGeneratePreviewOptions(...args)
      : optionsGenerators.generatePreviewOptions(...args);

    // preview.remarkPlugins にも追加
    preview.remarkPlugins.push(tocPluginConfig);
    return preview;
  };
};

/**
 * プラグイン無効化時の処理
 */
const deactivate = (): void => {
  // 必要であればクリーンアップ処理を記述
};

// --- GROWIシステムへプラグインを登録 ---
if ((window as any).pluginActivators == null) {
  (window as any).pluginActivators = {};
}
// キー名はパッケージ名や一意のIDを指定
(window as any).pluginActivators["growi-plugin-custom-toc"] = {
  activate,
  deactivate,
};
