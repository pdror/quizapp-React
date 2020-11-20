import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerScore: 0,
      questions: [
        {
          question: 'Javascript é uma linguagem _________ ?',
          possibleAnswers: ['Compilada', 'Interpretada'],
          rightAnswer: 'Interpretada',
          playerChoice: null
        },
        {
          question: "Colocar seus scripts no fim do 'body' de uma página permite que o navegador carregue a página primeiro?",
          possibleAnswers: ['Verdadeiro', 'Falso'],
          rightAnswer: 'Verdadeiro',
          playerChoice: null
        },
        {
          question: 'Selecione a saída correta do código: console.log( Number("123z") );',
          possibleAnswers: ['z', 'NaN', '123z', '123'],
          rightAnswer: 'NaN',
          playerChoice: null
        },
        {
          question: 'Selecione a saída correta do código: console.log(2 + true);',
          possibleAnswers: ['2 + true', 'false', '2', '3'],
          rightAnswer: '3',
          playerChoice: null
        },
        {
          question: 'Qual dos seguintes NÃO é uma caixa pop-up disponível no Javascript?',
          possibleAnswers: ['Postbox', 'Prompt', 'Alert', 'Confirm'],
          rightAnswer: 'Postbox',
          playerChoice: null
        }
      ]
    }

    this.answerQuestion = this.answerQuestion.bind(this);
  }

  displayQuestion(index) {
    if(this.state.playerScore < index) { return; }

    const question = this.state.questions[index];
    return (
      <div className="question-display" key={`q-${index}`}>
        <h3 className="question">
          {question.question}
        </h3>
        <br />
        
        { question.possibleAnswers.map((answer, answerIndex) => (
          <button key={`q-${index}-a-${answerIndex}`} className="question-choice" onClick={() => this.answerQuestion(index, answer)}>
            {answer}
          </button>
        ))
        }
        
        
        <br />
        {this.displayResult(index)}
      </div>
    );
  }

  answerQuestion(index, choice) {
    const answeredQuestion = this.state.questions[index];
    answeredQuestion.playerChoice = choice;
    const allQuestions = this.state.questions;
    allQuestions[index] = answeredQuestion;

    this.setState({
      questions: allQuestions
    }, () => {
      this.updatePlayerScore();
    })
  }

  updatePlayerScore() {
    const playerScore = this.state.questions.filter(q => q.rightAnswer === q.playerChoice).length;
    this.setState({playerScore});
    console.log(`New player score: ${playerScore}`);
  }

  displayResult(index) {
    const question = this.state.questions[index];

    if(!question.playerChoice) { return; }

    if(question.playerChoice === question.rightAnswer) {
      return (
        <p className="result-correct">
          Resposta certa!
        </p>
      );
    } else {
      return (
        <p className="result-incorrect">
          Resposta errada!
        </p>
      );
    }
  }

  renderQuestions() {
    return this.state.questions.map((question, index) => this.displayQuestion(index));
  }

  render() {
    return (
      <div className="App">
        <h1 className="title" >Quiz Show!</h1>
        <hr/>
        <div className="answers">
          {this.renderQuestions()}
        </div>
      </div>
    );
  }
}

export default App;
