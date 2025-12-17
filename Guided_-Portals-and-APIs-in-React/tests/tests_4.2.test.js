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

let movieModalRendered = false;
let selectedMovieIdCondition = false;
let movieIdPropPassedCorrectly = false;
let onClosePropPassedCorrectly = false;

// Traverse the AST to find the MovieModal component usage
traverse(ast, {
  JSXElement(path) {
    // Check if the MovieModal is rendered conditionally based on selectedMovieId
    const condition = path.parentPath.node;
    if (
      condition.type === 'LogicalExpression' &&
      condition.left.name === 'selectedMovieId'
    ) {
      selectedMovieIdCondition = true;
    }

    const openingElement = path.node.openingElement;
    if (openingElement.name.name === 'MovieModal') {
      movieModalRendered = true;
      openingElement.attributes.forEach((attribute) => {
        if (
          attribute.name &&
          attribute.name.name === 'movieId' &&
          attribute.value.expression &&
          attribute.value.expression.name === 'selectedMovieId'
        ) {
          movieIdPropPassedCorrectly = true;
        }
        if (
          attribute.name &&
          attribute.name.name === 'onClose' &&
          attribute.value.expression &&
          attribute.value.expression.name === 'handleCloseModal'
        ) {
          onClosePropPassedCorrectly = true;
        }
      });
    }
  },
});

// Define the test suite
describe('App Component MovieModal Integration', () => {
  it('tests_4.2', () => {
    expect(movieModalRendered, "The MovieModal component should be rendered in App.jsx.").toBe(true);
    expect(selectedMovieIdCondition, "The MovieModal component should be conditionally rendered based on selectedMovieId.").toBe(true);
    expect(movieIdPropPassedCorrectly, "The movieId prop should be passed to MovieModal and set to selectedMovieId.").toBe(true);
    expect(onClosePropPassedCorrectly, "The onClose prop should be passed to MovieModal and set to handleCloseModal.").toBe(true);
  });
});
