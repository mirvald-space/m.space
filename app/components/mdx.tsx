import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { highlight } from "sugar-high";
import remarkGfm from "remark-gfm";

// Базовые компоненты
function CustomLink(props) {
  const href = props.href || "";
  if (href.startsWith("/")) {
    return <Link href={href} {...props} />;
  }
  if (href.startsWith("#")) {
    return <a {...props} />;
  }
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function Code({ node, inline, className, children, ...props }) {
  if (!inline) {
    try {
      const code = String(children).replace(/\n$/, "");
      const highlighted = highlight(code);
      return <code dangerouslySetInnerHTML={{ __html: highlighted }} {...props} />;
    } catch (error) {
      console.error("Highlight error:", error);
    }
  }
  return <code {...props}>{children}</code>;
}

// Простой slugify
function slugify(text) {
  return text.toString().toLowerCase().trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

// Упрощенная функция рендеринга
export function CustomMDX({ source }) {
  if (!source) {
    return <div>Нет контента</div>;
  }

  return (
    <div className="prose prose-quoteless prose-neutral dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: CustomLink,
          code: Code,
          h1: ({node, children}) => {
            const id = children && slugify(children);
            return <h1 id={id}>{children}</h1>;
          },
          h2: ({node, children}) => {
            const id = children && slugify(children);
            return <h2 id={id}>{children}</h2>;
          },
          h3: ({node, children}) => {
            const id = children && slugify(children);
            return <h3 id={id}>{children}</h3>;
          }
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}