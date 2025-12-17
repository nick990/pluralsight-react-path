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

let descriptionParagraphExists = false;
let descriptionCorrectlyRendered = false;

// Traverse the AST to find the <p> element and its content
traverse(ast, {
  JSXElement(path) {
    const openingElement = path.node.openingElement;
    if (openingElement.name.name === 'p') {
      path.traverse({
        JSXExpressionContainer(innerPath) {
          if (
            innerPath.node.expression.type === 'MemberExpression' &&
            innerPath.node.expression.object.name === 'movie' &&
            innerPath.node.expression.property.name === 'description'
          ) {
            descriptionParagraphExists = true;
            descriptionCorrectlyRendered = true;
          }
        }
      });
    }
  }
});

// Define the test suite
describe("MovieModal Component Movie's Description Rendering", () => {
  it('tests_3.5', () => {
    expect(descriptionParagraphExists, "There should be a <p> element for the movie's description.").toBe(true);
    expect(descriptionCorrectlyRendered, "The <p> element should display the movie's description correctly.").toBe(true);
  });
});
