import React from "react";
import "./index.css";

/**
 * 全局底部栏页面
 * @constructor
 */
export default function GlobalFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <div className={"global-footer"}>
      <div>© {currentYear} 面试八股平台</div>
      <div>
        <a
          href="https://github.com/yanghengdaren/mianshibagu-frontend"
          target="_blank"
        >
          作者：Hy
        </a>
      </div>
    </div>
  );
}
