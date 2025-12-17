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

let useStateCalled = false;
let useStateVariableName = '';
let useStateInitialValue = undefined;
let setSelectedMovieIdExists = false;

// Traverse the AST to find the useState declaration
traverse(ast, {
  VariableDeclarator(path) {
    if (path.node.init && path.node.init.callee && path.node.init.callee.name === 'useState') {
      useStateCalled = true;
      useStateVariableName = path.node.id.elements[0].name; // Name of the state variable
      setSelectedMovieIdExists = path.node.id.elements[1].name === 'setSelectedMovieId'; // Check if setter function is named 'setSelectedMovieId'
      
      // Use node.init.arguments[0] to check if the initial value is a literal null
      if (path.node.init.arguments[0].type === 'Literal') {
        useStateInitialValue = path.node.init.arguments[0].value;
      } else if (path.node.init.arguments[0].type === 'NullLiteral') {
        useStateInitialValue = null;
      }
    }
  }
});

// Define the test suite
describe('App Component useState Usage', () => {
  it('tests_2.5', () => {
    expect(useStateCalled, "The useState hook should be called to manage selectedMovieId state.").toBe(true);
    expect(useStateVariableName, "The state variable should be named 'selectedMovieId'.").toBe('selectedMovieId');
    expect(useStateInitialValue, "The initial value of the selectedMovieId state should be null.").toBe(null);
    expect(setSelectedMovieIdExists, "The setter function should be named 'setSelectedMovieId'.").toBe(true);
  });
});
