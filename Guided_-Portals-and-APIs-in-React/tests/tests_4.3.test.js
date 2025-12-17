import { describe, it, expect } from 'vitest';
import fs from 'fs';
import * as babelParser from '@babel/parser';
import traverse from '@babel/traverse';

// Path to the MovieModal.jsx file
const filePath = './src/components/MovieModal.jsx'; // Ensure this path is correct

// Read the source code from the file
const source = fs.readFileSync(filePath, 'utf8');

// Parse the source code to an AST (Abstract Syntax Tree)
let ast;
try {
  ast = babelParser.parse(source, {
    sourceType: 'module',
    plugins: ['jsx'],
  });
} catch (e) {
  console.error('Error parsing the file:', e.message);
  throw e;
}

let buttonRendered = false;
let onClickPropPassed = false;

// Traverse the AST to find the button element with onClick handler
traverse(ast, {
  JSXOpeningElement(path) {
    if (path.node.name.name === 'button') {
      buttonRendered = true;
      path.node.attributes.forEach((attribute) => {
        if (
          attribute.name &&
          attribute.name.name === 'onClick' &&
          attribute.value.expression &&
          attribute.value.expression.name === 'onClose'
        ) {
          onClickPropPassed = true;
        }
      });
    }
  },
});

// Define the test suite
describe('MovieModal Component Button Integration', () => {
  it('tests_4.3', () => {
    expect(buttonRendered, "The MovieModal component should render a button.").toBe(true);
    expect(onClickPropPassed, "The button should have an onClick prop set to onClose.").toBe(true);
  });
});
