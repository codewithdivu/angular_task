import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
})
export class CalculatorComponent {
  expression: string = '';
  result: string = '';

  handleChangeExpression = (e: Event) => {
    const val = (e.target as HTMLInputElement).value;
    this.expression = val;
  };

  handleChangeResult = (e: Event) => {
    const val = (e.target as HTMLInputElement).value;
    this.result = val;
  };

  handleCalculate = (val: string) => {
    const isEmpty = this.expression == '';

    if (this.expression.includes('.') && val == '.') {
      return;
    }

    if (this.expression == '-') {
      if (!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(val)) {
        return;
      }
    }

    if (
      isEmpty &&
      !['-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(val)
    ) {
      return;
    }

    const isArithmetic = ['+', '-', '*', '/', '%'].includes(
      this.expression.slice(-1)
    );

    if (isArithmetic && ['+', '-', '*', '/', '%'].includes(val)) {
      this.expression = this.expression.slice(0, -1) + val;
      return;
    }

    this.expression = this.expression + val;
  };

  handleClearExpression = () => {
    this.expression = '';
  };
  handleClearAll = () => {
    this.expression = '';
    this.result = '';
  };

  handleBack = () => {
    this.expression = this.expression.slice(0, -1);
  };

  handleScientific = (val: string) => {
    try {
      if (val === 'square') {
        const lastResult = eval(this.expression);
        const squaredResult = Math.pow(lastResult, 2);
        this.result = squaredResult.toString();
      } else if (val === 'dividebyx') {
        const lastResult = eval(this.expression);
        const dividebyx = 1 / lastResult;
        this.result = dividebyx.toString();
      } else if (val === 'root') {
        const lastResult = eval(this.expression);

        const squareRoot = Math.sqrt(lastResult);

        this.result = squareRoot.toString();
      } else if (val === 'plusminus') {
        if (this.expression[0] === '-') {
          return;
        }

        this.expression = '-' + this.expression;
      }
    } catch (error) {
      this.expression = 'Errro';
    }
  };

  handleSolve = () => {
    try {
      this.result = eval(this.expression);
    } catch (error) {
      this.result = 'Error';
    }
  };
}
