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

let fetchCalled = false;
let fetchURL = '';
let responseJsonCalled = false;
let setMovieCalled = false;
let errorHandled = false;

// Traverse the AST to find the fetch call and error handling
traverse(ast, {
  CallExpression(path) {
    // Check if fetch is called
    if (path.node.callee.name === 'fetch') {
      fetchCalled = true;
      fetchURL = path.node.arguments[0].quasis
        ? path.node.arguments[0].quasis[0].value.raw // This handles template literals
        : path.node.arguments[0].value;
    }

    // Check if response.json() is called
    if (path.node.callee.property && path.node.callee.property.name === 'json') {
      responseJsonCalled = true;
    }

    // Check if setMovie is called
    if (path.node.callee.name === 'setMovie') {
      setMovieCalled = true;
    }

    // Check if catch block is present for error handling
    if (path.node.callee.property && path.node.callee.property.name === 'catch') {
      errorHandled = true;
    }
  }
});

// Define the test suite
describe('MovieModal Component Data Fetching', () => {
  it('tests_3.6', () => {
    expect(fetchCalled, "The MovieModal component should call fetch.").toBe(true);
    expect(fetchURL.includes('/api/movies/'), "Fetch should be called with the correct URL.").toBe(true);
    //expect(fetchURL, "Fetch should be called with the correct URL.").toBe('/api/movies/:movieId');
    expect(responseJsonCalled, "The response should be processed as JSON.").toBe(true);
    expect(setMovieCalled, "The movie state should be updated with fetched data.").toBe(true);
    expect(errorHandled, "The MovieModal component should handle errors in fetch call.").toBe(true);
  });
});
