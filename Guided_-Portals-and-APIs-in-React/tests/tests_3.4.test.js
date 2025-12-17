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

let directorParagraphExists = false;
let directorFormatCorrect = false;

// Traverse the AST to find the <p> element and its content
traverse(ast, {
  JSXElement(path) {
    const openingElement = path.node.openingElement;
    if (openingElement.name.name === 'p') {
      path.traverse({
        JSXText(innerPath) {
          if (innerPath.node.value.trim() === 'Directed by:') {
            directorParagraphExists = true;
          }
        },
        JSXExpressionContainer(innerPath) {
          if (
            innerPath.node.expression.type === 'MemberExpression' &&
            innerPath.node.expression.object.name === 'movie' &&
            innerPath.node.expression.property.name === 'director'
          ) {
            directorFormatCorrect = true;
          }
        }
      });
    }
  }
});

// Define the test suite
describe('MovieModal Component Director Rendering', () => {
  it('tests_3.4', () => {
    expect(directorParagraphExists, "There should be a <p> element for the director's name.").toBe(true);
    expect(directorFormatCorrect, "The <p> element should display the director's name correctly.").toBe(true);
  });
});
