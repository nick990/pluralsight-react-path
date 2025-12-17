import { describe, it, expect } from 'vitest';
import fs from 'fs';
import * as babelParser from '@babel/parser';
import traverse from '@babel/traverse';

// Path to the MovieList.jsx file
const filePath = './src/components/MovieList.jsx';

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

let useStateCalled = false;
let useStateVariableName = '';
let useStateInitialValue = null;
let setMoviesExists = false;

// Traverse the AST to find the useState declaration
traverse(ast, {
  VariableDeclarator(path) {
    if (path.node.init && path.node.init.callee && path.node.init.callee.name === 'useState') {
      useStateCalled = true;
      useStateVariableName = path.node.id.elements[0].name; // Name of the state variable
      setMoviesExists = path.node.id.elements[1].name === 'setMovies'; // Check if setter function is named 'setMovies'
      useStateInitialValue = path.node.init.arguments[0].elements ? path.node.init.arguments[0].elements.length : null; // Check initial value
    }
  }
});

// Define the test suite
describe('MovieList Component useState Usage', () => {
  it('tests_2.1', () => {
    expect(useStateCalled, "The useState hook should be called to manage movies state.").toBe(true);
    expect(useStateVariableName, "The state variable should be named 'movies'.").toBe('movies');
    expect(useStateInitialValue, "The initial value of the movies state should be an empty array.").toBe(0);
    expect(setMoviesExists, "The setter function should be named 'setMovies'.").toBe(true);
  });
});
