import { describe, it, expect, vi } from 'vitest';
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
    plugins: ['jsx']
  });
} catch (e) {
  console.error('Error parsing the file:', e.message);
  throw e;
}

let handleMovieClickFunctionExists = false;
let setSelectedMovieIdCalled = false;
let correctArgumentUsed = false;

// Traverse the AST to find the handleMovieClick function and validate setSelectedMovieId usage
traverse(ast, {
  VariableDeclarator(path) {
    if (path.node.id.name === 'handleMovieClick') {
      handleMovieClickFunctionExists = true;
      const functionBody = path.node.init.body.body;
      functionBody.forEach(statement => {
        if (
          statement.type === 'ExpressionStatement' &&
          statement.expression.type === 'CallExpression' &&
          statement.expression.callee.name === 'setSelectedMovieId'
        ) {
          setSelectedMovieIdCalled = true;
          if (
            statement.expression.arguments[0].type === 'Identifier' &&
            statement.expression.arguments[0].name === 'movieId'
          ) {
            correctArgumentUsed = true;
          }
        }
      });
    }
  }
});

// Define the test suite
describe('App Component handleMovieClick Function', () => {
  it('tests_2.6', () => {
    expect(handleMovieClickFunctionExists, "The handleMovieClick function should be defined in App.jsx.").toBe(true);
    expect(setSelectedMovieIdCalled, "The setSelectedMovieId should be called within handleMovieClick.").toBe(true);
    expect(correctArgumentUsed, "The setSelectedMovieId should be called with movieId.").toBe(true);
  });
});
