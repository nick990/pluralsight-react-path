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

let h2Exists = false;
let h2ContainsMovieTitle = false;

// Traverse the AST to find the h2 element and its content
traverse(ast, {
  JSXElement(path) {
    const openingElement = path.node.openingElement;
    if (openingElement.name.name === 'h2') {
      h2Exists = true;
      path.traverse({
        JSXExpressionContainer(innerPath) {
          if (
            innerPath.node.expression.type === 'MemberExpression' &&
            innerPath.node.expression.object.name === 'movie' &&
            innerPath.node.expression.property.name === 'title'
          ) {
            h2ContainsMovieTitle = true;
          }
        }
      });
    }
  }
});

// Define the test suite
describe('MovieModal Component Title Rendering', () => {
  it('tests_3.3', () => {
    expect(h2Exists, "There should be an <h2> element for the movie title.").toBe(true);
    expect(h2ContainsMovieTitle, "The <h2> element should contain the movie's title.").toBe(true);
  });
});
