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

let fetchCalled = false;
let fetchURL = '';
let responseJsonCalled = false;
let setMoviesCalled = false;
let errorHandled = false;

// Traverse the AST to find the fetch call and error handling
traverse(ast, {
  CallExpression(path) {
    // Check if fetch is called
    if (path.node.callee.name === 'fetch') {
      fetchCalled = true;
      fetchURL = path.node.arguments[0].value;
    }

    // Check if response.json() is called
    if (path.node.callee.property && path.node.callee.property.name === 'json') {
      responseJsonCalled = true;
    }

    // Check if setMovies is called
    if (path.node.callee.name === 'setMovies') {
      setMoviesCalled = true;
    }

    // Check if catch block is present for error handling
    if (path.node.callee.property && path.node.callee.property.name === 'catch') {
      errorHandled = true;
    }
  }
});

// Define the test suite
describe('MovieList Component Data Fetching', () => {
  it('tests_2.2', () => {
    expect(fetchCalled, "The MovieList component should call fetch.").toBe(true);
    expect(fetchURL, "Fetch should be called with the correct URL.").toBe('/api/movies');
    expect(responseJsonCalled, "The response should be processed as JSON.").toBe(true);
    expect(setMoviesCalled, "The movies state should be updated with fetched data.").toBe(true);
    expect(errorHandled, "The MovieList component should handle errors in fetch call.").toBe(true);
  });
});
