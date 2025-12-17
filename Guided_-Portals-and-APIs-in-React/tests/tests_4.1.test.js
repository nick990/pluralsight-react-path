import { describe, it, expect } from 'vitest';
import fs from 'fs';
import * as babelParser from '@babel/parser';
import traverse from '@babel/traverse';

// Path to the App.jsx file
const filePath = './src/components/App.jsx'; // Ensure this path is correct

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

let handleCloseModalExists = false;
let handleCloseModalSetsNull = false;

// Traverse the AST to find the handleCloseModal function
traverse(ast, {
  VariableDeclarator(path) {
    if (
      path.node.id.name === 'handleCloseModal' &&
      path.node.init.type === 'ArrowFunctionExpression'
    ) {
      handleCloseModalExists = true;

      // Check if handleCloseModal sets selectedMovieId to null
      path.traverse({
        CallExpression(innerPath) {
          if (
            innerPath.node.callee.name === 'setSelectedMovieId' &&
            innerPath.node.arguments.length === 1 &&
            innerPath.node.arguments[0].type === 'NullLiteral'
          ) {
            handleCloseModalSetsNull = true;
          }
        },
      });
    }
  },
});

// Define the test suite
describe('App Component handleCloseModal Function', () => {
  it('tests_4.1', () => {
    expect(handleCloseModalExists, "The handleCloseModal function should be defined in App.jsx.").toBe(true);
    expect(handleCloseModalSetsNull, "The handleCloseModal function should set selectedMovieId to null.").toBe(true);
  });
});
