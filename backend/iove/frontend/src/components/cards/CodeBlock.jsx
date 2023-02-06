import React from "react";
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import c from 'react-syntax-highlighter/dist/esm/languages/prism/c';
import cpp from 'react-syntax-highlighter/dist/esm/languages/prism/cpp';
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';

SyntaxHighlighter.registerLanguage('c', c);
SyntaxHighlighter.registerLanguage('cpp', cpp);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('python', python);

const langDict = {
    'C':'c',
    'C++':'cpp',
    'Java':'java',
    'TypeScript':'typescript',
    'CSS':'css',
    'JavaScript':'javascript',
    'Python':'python'
}

export const fileExtensions = {
        'C':'.c',
        'C++':'.cpp',
        'Java':'.java',
        'TypeScript':'.ts',
        'CSS':'.css',
        'JavaScript':'.js',
        'Python':'.py'
    }

export default function CodeBlock (props) {
    return <SyntaxHighlighter language={langDict[props.language]} style={vscDarkPlus}>{props.code}</SyntaxHighlighter>
}