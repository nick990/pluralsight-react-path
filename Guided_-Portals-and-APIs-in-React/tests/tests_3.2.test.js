import { describe, it, expect } from 'vitest';
import fs from 'fs';
import * as babelParser from '@babel/parser';
import traverse from '@babel/traverse';

// Path to the MovieModal.jsx file
const filePath = './src/components/MovieModal.jsx';

// Read the source code from the file
const source = fs.readFileSync(filePath, 'utf8');

// Parse the source code to an AST (Abstract Syntax Tree)
let ast;
try {
  ast = babelParser.parse(source, {
    sourceType: 'module',
    plugins: ['jsx']
  });
} catch (e) {
  console.error('Error parsing the file:', e.message);
  throw e;
}

let modalDivExists = false;
let modalContentDivExists = false;

// Traverse the AST to find JSXElement with className 'modal' and 'modal-content'
traverse(ast, {
  JSXElement(path) {
    const openingElement = path.node.openingElement;
    if (
      openingElement.name.name === 'div' &&
      openingElement.attributes.some(attr => attr.name.name === 'className' && attr.value.value === 'modal')
    ) {
      modalDivExists = true;
    }

    if (
      openingElement.name.name === 'div' &&
      openingElement.attributes.some(attr => attr.name.name === 'className' && attr.value.value === 'modal-content')
    ) {
      modalContentDivExists = true;
    }
  }
});

// Define the test suite
describe('MovieModal Component Structure', () => {
  it('tests_3.2', () => {
    expect(modalDivExists, "There should be a <div> with the class name 'modal'.").toBe(true);
    expect(modalContentDivExists, "There should be a <div> with the class name 'modal-content'.").toBe(true);
  });
});
