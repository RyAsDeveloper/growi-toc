"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client-entry.tsx
var client_entry_exports = {};
__export(client_entry_exports, {
  activate: () => activate
});
module.exports = __toCommonJS(client_entry_exports);
var import_remark_toc = __toESM(require("remark-toc"));
var import_rehype_slug = __toESM(require("rehype-slug"));
var activate = () => {
  const growiFacade = window.growiFacade;
  if (growiFacade == null || growiFacade.markdownRenderer == null) return;
  const { optionsGenerators } = growiFacade.markdownRenderer;
  const originalCustomViewOptions = optionsGenerators.customGenerateViewOptions;
  const originalCustomPreviewOptions = optionsGenerators.customGeneratePreviewOptions;
  optionsGenerators.customGenerateViewOptions = (...args) => {
    const options = originalCustomViewOptions ? originalCustomViewOptions(...args) : optionsGenerators.generateViewOptions(...args);
    options.remarkPlugins.push([import_remark_toc.default, { heading: "(table[ -]of[ -])?contents?|toc|\u76EE\u6B21|\u76EE\u5F55" }]);
    options.rehypePlugins.push(import_rehype_slug.default);
    return options;
  };
  optionsGenerators.customGeneratePreviewOptions = (...args) => {
    const options = originalCustomPreviewOptions ? originalCustomPreviewOptions(...args) : optionsGenerators.generatePreviewOptions(...args);
    options.remarkPlugins.push([import_remark_toc.default, { heading: "(table[ -]of[ -])?contents?|toc|\u76EE\u6B21|\u76EE\u5F55" }]);
    options.rehypePlugins.push(import_rehype_slug.default);
    return options;
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate
});
