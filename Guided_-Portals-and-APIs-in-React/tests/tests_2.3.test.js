import { describe, it, expect } from 'vitest';
import fs from 'fs';
import * as babelParser from '@babel/parser';
import traverse from '@babel/traverse';

// Path to the MovieList.jsx file
const filePath = './src/components/MovieList.jsx';  // Update the file path if necessary

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

let ulExists = false;
let liElementsCount = 0;
let keyPropCorrect = false;
let titleAndDirectorCorrect = false;

// Traverse the AST to find the JSX structure
traverse(ast, {
  JSXElement(path) {
    // Check if there's a <ul> element
    if (path.node.openingElement.name.name === 'ul') {
      ulExists = true;
    }

    // Check if there are <li> elements inside the <ul>
    if (path.node.openingElement.name.name === 'li') {
      liElementsCount += 1;

      // Check for key attribute
      path.node.openingElement.attributes.forEach(attribute => {
        if (attribute.name && attribute.name.name === 'key' &&
            attribute.value && attribute.value.expression &&
            attribute.value.expression.type === 'MemberExpression' &&
            attribute.value.expression.object.name === 'movie' &&
            attribute.value.expression.property.name === 'id') {
          keyPropCorrect = true;
        }
      });

      // Check if <li> contains the movie title and director
      const children = path.node.children;
      const titleNode = children.find(child => 
        child.type === 'JSXExpressionContainer' &&
        child.expression.type === 'MemberExpression' &&
        child.expression.property.name === 'title'
      );
      const directorNode = children.find(child => 
        child.type === 'JSXExpressionContainer' &&
        child.expression.type === 'MemberExpression' &&
        child.expression.property.name === 'director'
      );

      if (titleNode && directorNode) {
        titleAndDirectorCorrect = true;
      }
    }
  }
});

let clickHandlerExists = false;
let clickHandlerCorrect = false;

// Traverse the AST to find the JSX structure
traverse(ast, {
  JSXElement(path) {
    // Check if there are <li> elements
    if (path.node.openingElement.name.name === 'li') {
      // Check for onClick attribute
      path.node.openingElement.attributes.forEach(attribute => {
        if (attribute.name && attribute.name.name === 'onClick') {
          clickHandlerExists = true;

          // Check if onClick is an arrow function with correct parameter
          if (attribute.value && attribute.value.expression &&
              attribute.value.expression.type === 'ArrowFunctionExpression' &&
              attribute.value.expression.body.type === 'CallExpression' &&
              attribute.value.expression.body.callee.type === 'Identifier' &&
              attribute.value.expression.body.callee.name === 'onMovieClick' &&
              attribute.value.expression.body.arguments.length === 1 &&
              attribute.value.expression.body.arguments[0].type === 'MemberExpression' &&
              attribute.value.expression.body.arguments[0].object.name === 'movie' &&
              attribute.value.expression.body.arguments[0].property.name === 'id') {
            clickHandlerCorrect = true;
          }
        }
      });
    }
  }
});


describe('MovieList Component Rendering', () => {
  it('tests_2.3', () => {
    expect(ulExists, "The MovieList component should render a <ul> element.").toBe(true);
    expect(liElementsCount > 0, "The MovieList component should render <li> elements.").toBe(true);
    expect(keyPropCorrect, "Each <li> element should have a key prop with movie.id.").toBe(true);
    expect(titleAndDirectorCorrect, "Each <li> should display the movie title and director.").toBe(true);
    expect(clickHandlerExists, "Each <li> element should have an onClick handler.").toBe(true);
    expect(clickHandlerCorrect, "The onClick handler should call onMovieClick with movie.id.").toBe(true);
  });
});
