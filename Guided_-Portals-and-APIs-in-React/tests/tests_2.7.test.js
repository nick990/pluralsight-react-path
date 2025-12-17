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
    plugins: ['jsx']
  });
} catch (e) {
  console.error('Error parsing the file:', e.message);
  throw e;
}

let movieListImported = false;
let movieListRendered = false;
let onMovieClickPropPassed = false;

// Traverse the AST to find the MovieList component usage
traverse(ast, {
  ImportDeclaration(path) {
    if (path.node.source.value.includes('MovieList')) {
      movieListImported = true;
    }
  },
  JSXOpeningElement(path) {
    if (path.node.name.name === 'MovieList') {
      movieListRendered = true;
      path.node.attributes.forEach(attribute => {
        if (attribute.name && attribute.name.name === 'onMovieClick') {
          onMovieClickPropPassed = true;
        }
      });
    }
  }
});

// Define the test suite
describe('App Component MovieList Integration', () => {
  it('tests_2.7', () => {
    expect(movieListImported, "The MovieList component should be imported in App.jsx.").toBe(true);
    expect(movieListRendered, "The MovieList component should be rendered in App.jsx.").toBe(true);
    expect(onMovieClickPropPassed, "The MovieList component should receive the onMovieClick prop.").toBe(true);
  });
});
