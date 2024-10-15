import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkToc from 'remark-toc';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MarkdownRenderer = ({ content }) => {
    return (
        <div className="prose prose-sm max-w-none prose-invert bg-gray-800 text-gray-200 p-4 rounded-lg">
            <ReactMarkdown
                remarkPlugins={[remarkGfm, [remarkToc, { heading: "Contents" }]]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                            <SyntaxHighlighter
                                {...props}
                                children={String(children).replace(/\n$/, '')}
                                style={vscDarkPlus}
                                language={match[1]}
                                PreTag="div"
                            />
                        ) : (
                            <code {...props} className={`${className} text-gray-200 px-1 rounded`}>
                                {children}
                            </code>
                        )
                    },
                    a: ({ node, ...props }) => <a {...props} className="text-blue-400 hover:text-blue-300" />,
                    h1: ({ node, ...props }) => <h1 {...props} className="text-2xl font-bold text-gray-100 mt-6 mb-4" />,
                    h2: ({ node, ...props }) => <h2 {...props} className="text-xl font-bold text-gray-100 mt-5 mb-3" />,
                    h3: ({ node, ...props }) => <h3 {...props} className="text-lg font-bold text-gray-100 mt-4 mb-2" />,
                    p: ({ node, ...props }) => <p {...props} className="mb-4 text-gray-300" />,
                    ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-5 mb-4 text-gray-300" />,
                    ol: ({ node, ...props }) => <ol {...props} className="list-decimal pl-5 mb-4 text-gray-300" />,
                    li: ({ node, ...props }) => <li {...props} className="mb-1" />,
                    blockquote: ({ node, ...props }) => <blockquote {...props} className="border-l-4 border-gray-500 pl-4 italic text-gray-400" />,
                    table: ({ node, ...props }) => <table {...props} className="border-collapse table-auto w-full text-sm" />,
                    th: ({ node, ...props }) => <th {...props} className="border-b dark:border-gray-600 font-medium p-4 pl-8 pt-0 pb-3 text-gray-400 dark:text-gray-200 text-left" />,
                    td: ({ node, ...props }) => <td {...props} className="border-b border-gray-600 p-4 pl-8 text-gray-300" />,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;
