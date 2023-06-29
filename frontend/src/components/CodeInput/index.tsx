import React, {useEffect, useState} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import {esLint, javascript} from '@codemirror/lang-javascript';
import {ViewUpdate} from '@codemirror/view';
import {json, jsonParseLinter} from '@codemirror/lang-json';
import {Extension} from '@codemirror/state';
import {markdown} from '@codemirror/lang-markdown';
import styles from './index.module.less';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import mk_parser from 'prettier/parser-markdown';
// @ts-ignore
import * as eslint from 'eslint-linter-browserify';
import {linter, lintGutter} from '@codemirror/lint';


interface CodeInputProps {
  value?: string;
  height?: string;
  onChange?: (value: string) => void;
  language?: 'javascript' | 'json' | 'markdown';
  placeholder?: string;
  onError?: (error: Error) => void;
}

const CodeInput: React.FC<CodeInputProps> = ({
                                               value = '',
                                               height = '200px',
                                               onChange,
                                               language = 'javascript',
                                               placeholder = '',
                                               onError
                                             }) => {
  const [code, setCode] = useState('');
  const [extensions, setExtensions] = useState<Extension[]>([]);

  useEffect(() => {
    if (language === 'json') {
      try {
        value = JSON.stringify(JSON.parse(value), null, 2);
      } catch (e) {
        onError && onError(e as Error);
      }
    }
    setCode(value);
  }, [value]);

  useEffect(() => {
    const extensions: Extension[] = [];
    if (language === 'javascript') {
      extensions.push(javascript({jsx: false}))
      extensions.push(linter(esLint(new eslint.Linter(), config)))
    } else if (language === 'json') {
      extensions.push(json())
      extensions.push(linter(jsonParseLinter()))
    } else if (language === 'markdown') {
      extensions.push(markdown())
    }
    setExtensions(extensions)
  }, [language]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    if (language === 'json') {
      try {
        const parsedJson = JSON.parse(newCode);
        const compressedJson = JSON.stringify(parsedJson, null, 0); // Set space parameter to 0 for compression
        onChange && onChange(compressedJson);
      } catch (e) {
        onError && onError(e as Error);
      }
    } else {
      onChange && onChange(newCode);
    }
  };

  const handleFormat = () => {
    let formattedCode = '';
    if (language === 'json') {
      try {
        const parsedJson = JSON.parse(code);
        formattedCode = JSON.stringify(parsedJson, null, 2); // Set space parameter to 0 for compression
      } catch (e) {
        onError && onError(e as Error);
      }
    } else if (language === 'javascript') {
      try {
        formattedCode = prettier.format(code, {
          parser: 'babel',
          plugins: [parser],
          semi: false,
        });
      } catch (e) {
        onError && onError(e as Error);
      }
    } else if (language === 'markdown') {
      try {
        formattedCode = prettier.format(code, {
          parser: 'markdown',
          plugins: [mk_parser],
          semi: false,
        });
      } catch (e) {
        onError && onError(e as Error);
      }
    }
    handleCodeChange(formattedCode)
  }

  const config = {
    parserOptions: {
      ecmaVersion: 2019,
      sourceType: 'module',
    },
    env: {
      browser: false,
      node: true,
    },
    rules: {
      'no-undef': 'error',
      'no-use-before-define': 'error',
      'no-debugger': 'error',
      'no-dupe-args': 'error',
      'no-dupe-keys': 'error',
      'no-empty-function': 'error',
    },
  };

  return (
    <div className={styles.code_input}>
      <CodeMirror
        className={styles.code_input_editor}
        value={code}
        extensions={[
          ...extensions,
          lintGutter(),
        ]}
        theme="dark" // 设置主题
        placeholder={placeholder}
        width="100%"
        height={height}
        onChange={(value: string, viewUpdate: ViewUpdate) => {
          handleCodeChange(value);
        }}
      />
      <a className={styles.code_input_format} key="code_format" onClick={handleFormat}>格式化</a>
    </div>
  );
};

export default CodeInput;
