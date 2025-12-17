import { describe, it, expect } from 'vitest';
import fs from 'fs';
import * as babelParser from '@babel/parser';
import traverse from '@babel/traverse';

// Path to the MovieList.jsx file
const filePath = './src/components/MovieList.jsx'; // Update the file path if necessary

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

let clickHandlerExists = false;
let clickHandlerCorrect = false;

// Traverse the AST to find the JSX structure
traverse(ast, {
  JSXElement(path) {
    // Check if there are <li> elements
    if (path.node.openingElement.name.name === 'li') {
      // Check for onClick attribute
      path.node.openingElement.attributes.forEach(attribute => {
        if (attribute.name && attribute.name.name === 'onClick') {
          clickHandlerExists = true;

          // Check if onClick is an arrow function with correct parameter
          if (attribute.value && attribute.value.expression &&
              attribute.value.expression.type === 'ArrowFunctionExpression' &&
              attribute.value.expression.body.type === 'CallExpression' &&
              attribute.value.expression.body.callee.type === 'Identifier' &&
              attribute.value.expression.body.callee.name === 'onMovieClick' &&
              attribute.value.expression.body.arguments.length === 1 &&
              attribute.value.expression.body.arguments[0].type === 'MemberExpression' &&
              attribute.value.expression.body.arguments[0].object.name === 'movie' &&
              attribute.value.expression.body.arguments[0].property.name === 'id') {
            clickHandlerCorrect = true;
          }
        }
      });
    }
  }
});

describe('MovieList Component Click Handler', () => {
  it('tests_2.4', () => {
    expect(clickHandlerExists, "Each <li> element should have an onClick handler.").toBe(true);
    expect(clickHandlerCorrect, "The onClick handler should call onMovieClick with movie.id.").toBe(true);
  });
});
