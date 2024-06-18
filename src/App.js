import './App.css'
import { useState } from 'react';
import Button from './Button';

function App() {
  const [result, setResult] = useState('')

  const handleClick = (e) => {
    setResult(result.concat(e.target.name))
  }

  const clear = () => {
    setResult('')
  }

  const handleBackspace = () => {
    setResult(result.slice(0, -1))
  }

  const calculate = () => {
    try {
      const evaluatedResult = evaluateExpression(result);
      setResult(evaluatedResult)
    } catch(err) {
      setResult('Error occurred')
    }
  }

  const evaluateExpression = (expr) => {
    const tokens = tokenize(expr);
    const rpn = infixToPostfix(tokens);
    return evaluatePostfix(rpn);
  }

  const tokenize = (expr) => {
    const tokens = [];
    let number = '';
    for (let i = 0; i < expr.length; i++) {
      const char = expr[i];
      if (!isNaN(char) || char === '.') {
        number += char;
      } else {
        if (number) {
          tokens.push(number);
          number = '';
        }
        tokens.push(char);
      }
    }
    if (number) tokens.push(number);
    return tokens;
  }

  const infixToPostfix = (tokens) => {
    const precedence = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2
    };
    const output = [];
    const operators = [];
    tokens.forEach(token => {
      if (!isNaN(token)) {
        output.push(token);
      } else if (token in precedence) {
        while (operators.length && precedence[operators[operators.length - 1]] >= precedence[token]) {
          output.push(operators.pop());
        }
        operators.push(token);
      }
    });
    while (operators.length) {
      output.push(operators.pop());
    }
    return output;
  }

  const evaluatePostfix = (tokens) => {
    const stack = [];
    tokens.forEach(token => {
      if (!isNaN(token)) {
        stack.push(parseFloat(token));
      } else {
        const b = stack.pop();
        const a = stack.pop();
        switch (token) {
          case '+':
            stack.push(a + b);
            break;
          case '-':
            stack.push(a - b);
            break;
          case '*':
            stack.push(a * b);
            break;
          case '/':
            stack.push(a / b);
            break;
          default:
            throw new Error('Invalid operator');
        }
      }
    });
    return stack[0].toString();
  }
  
  return (
    <div className='calc-container'>
      <div className='result-container'>
        <input type='text' value={result}/>
      </div>
      <div className='keys-container'>
        <Button id='clearAll' onClick={clear} btnName={'CE'} />
        <Button id='backspace' onClick={handleBackspace} btnName={'C'} />
        <Button id='operator' name='/' onClick={handleClick} btnName='&divide;' />
        <Button name='7' onClick={handleClick} btnName={7} />
        <Button name='8' onClick={handleClick} btnName={8} />
        <Button name='9' onClick={handleClick} btnName={9} />
        <Button id='operator' name='*' onClick={handleClick} btnName='&times;' />
        <Button name='4' onClick={handleClick} btnName={4} />
        <Button name='5' onClick={handleClick} btnName={5} />
        <Button name='6' onClick={handleClick} btnName={6} />
        <Button id='operator' name='-' onClick={handleClick} btnName='&ndash;' />
        <Button name='1' onClick={handleClick} btnName={1} />
        <Button name='2' onClick={handleClick} btnName={2} />
        <Button name='3' onClick={handleClick} btnName={3} />
        <Button id='operator' name='+' onClick={handleClick} btnName={'+'} />
        <Button name='0' onClick={handleClick} btnName={0} />
        <Button name='.' onClick={handleClick} btnName={'.'} />
        <Button id='result' onClick={calculate} btnName={'='} />
      </div>
    </div>
  );
}

export default App;
