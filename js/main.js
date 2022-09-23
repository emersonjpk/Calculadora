"use strict";

const limpar = document.getElementById("limpar");
const div = document.getElementById("/");
const mult = document.getElementById("*");
const backspace = document.getElementById("backspace");
const menos = document.getElementById("-");
const mais = document.getElementById("+");
const igual = document.getElementById("igual");
const parLeft = document.getElementById("dot");
const parRight = document.getElementById("sqrt");

const numberButtons = document.querySelectorAll(".btn-numero");
console.log(numberButtons);
const operatorButtons = document.querySelectorAll(".btn-operador");

const display = document.getElementById("display");

function Calculatora() {
  this.firstOperand = "";
  this.currentOperand = "";
  this.operation = "";

  // Atualizar ambos valores na tela
  this.updateDisplay = function () {
    displayFirst.textContent = this.firstOperand + this.operation;
    display.textContent = this.currentOperand;
  };

  // Adicionar números na tela
  this.appendNumber = function (number) {
    if (this.currentOperand.includes(".") && number === ".") return;
    this.currentOperand += number.toString();
    this.updateDisplay();
  };

  // Selecionar Operador
  this.chooseOperation = function (operator) {
    if (this.currentOperand === "") return;
    if (this.firstOperand !== "") {
      this.calc();
    }
    this.operation = operator;
    this.firstOperand = this.currentOperand;
    this.currentOperand = "";
    this.updateDisplay();
  };

  // Calcular resultado baseado no operador
  this.calc = function () {
    let result;
    let prev = parseFloat(this.firstOperand);
    let current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "×":
        result = prev * current;
        break;
      case "÷":
        result = prev / current;
        break;
      default:
        return;
    }
    this.firstOperand = "";
    this.currentOperand = result.toString();
    this.operation = "";
    this.updateDisplay();
  };

  this.sqrt = function () {
    this.currentOperand = Math.sqrt(this.currentOperand).toFixed(2);
    this.updateDisplay();
  };

  // Limpar tela
  this.limpar = function () {
    this.firstOperand = "";
    this.currentOperand = "";
    this.operation = "";
    this.updateDisplay();
  };

  // Deletar último input
  this.backspace = function () {
    this.currentOperand = this.currentOperand.slice(0, -1);
    this.updateDisplay();
  };
}

const calculadora = new Calculatora();

numberButtons.forEach((item) => {
  item.addEventListener("click", () => {
    calculadora.appendNumber(item.innerText);
  });
});

operatorButtons.forEach((item) => {
  item.addEventListener("click", () => {
    calculadora.chooseOperation(item.innerText);
  });
});

igual.addEventListener("click", () => {
  calculadora.calc();
});

limpar.addEventListener("click", () => {
  calculadora.limpar();
});

backspace.addEventListener("click", () => {
  calculadora.backspace();
});

sqrt.addEventListener("click", () => {
  calculadora.sqrt();
});
