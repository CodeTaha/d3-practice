// run this command to compile
// watchify -t [ babelify --presets [ react ] ] script3.js -o bundle.js

// A simple Game using React

var $ = jQuery = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
window.$ = $;
var Bootstrap = require('bootstrap');

var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

var StarsFrame = React.createClass({
	render: function(){
		var stars = [];
		for (var i=0; i<this.props.numberOfStars; i++){
			stars.push(
				<span className="glyphicon glyphicon-star"></span>
			);
		}
		return(
			<div id="stars-frame">
				<div className="well">
					{stars}
				</div>
			</div>
		);
	}
});

var ButtonFrame = React.createClass({
	render: function(){
		var disabled, 
			button, 
			correct = this.props.correct, 
			acceptAnswer=this.props.acceptAnswer
			redrawCount=this.props.redrawCount;
		switch(correct){
			case true:
				button = (
					<button className="btn btn-success btn-lg" onClick={this.props.acceptAnswer}>
						<span className="glyphicon glyphicon-ok"></span>
					</button>
				);
				break;
			case false:
				button = (
					<button className="btn btn-danger btn-lg">
						<span className="glyphicon glyphicon-remove"></span>
					</button>
				);
				break;
			default:
				disabled = (this.props.selectedNumbers.length === 0);
				button = (
					<button className="btn btn-primary btn-lg" disabled={disabled} onClick={this.props.checkAnswer}>=</button>
				);
		}
		
		return(
			<div id='button-frame'>
				{button}
				<br/><br/>
				<button className="btn btn-warning btn-xs" onClick={this.props.redraw} disabled={!(redrawCount > 0)}>
					<span className="glyphicon glyphicon-refresh">{redrawCount}</span>
				</button>
			</div>
		);
	}
});

var AnswerFrame = React.createClass({
	
	render: function(){
		var numbers = [];
		unselectNumber = this.props.unselectNumber;
		for (var i=0; i<this.props.selectedNumbers.length; i++){
			numbers.push(
				<span onClick={unselectNumber.bind(null, this.props.selectedNumbers[i])}>{this.props.selectedNumbers[i]}</span>
			);
		}
		return(
			<div id='answer-frame'>
				<div className="well">
					{numbers}
				</div>
			</div>
		);
	}
});

var NumbersFrame = React.createClass({
	render: function(){
		var numbers = [], className,
			selectNumber = this.props.selectNumber,
			usedNumbers = this.props.usedNumbers;
		for (var i=1; i<=9; i++){
			
				className = "numbers selected-"+ (this.props.selectedNumbers.indexOf(i)>=0)
				className += " used-" + (usedNumbers.indexOf(i)>=0)
				numbers.push(
					// bind creates a copy of the function that remembers the value bound to it. If not used, the clickFunction will be called during initialization
					<div className={className} onClick={selectNumber.bind(null, i)}>{i}</div>
				);	
			
			
		}
		return(
			<div id='numbers-frame'>
				<div className="well">
					{numbers}
				</div>
			</div>
		);
	}
});

var DoneFrame = React.createClass({
	render: function(){
		return(
			<div className="well text-center">
				<h2>{this.props.doneStatus}</h2>
				<button className="btn btn-lg btn-success" onClick={this.props.resetGame}> Play Again</button>
			</div>
		);
	}
});
var Game = React.createClass({
	getInitialState: function(){
		return {
			selectedNumbers: [],
			numberOfStars: this.randomNumber(),
			correct: null,
			usedNumbers:[],
			redrawCount: 5,
			doneStatus: null
		};
	},
	selectNumber: function(clickedNumber){
		if(this.state.selectedNumbers.indexOf(clickedNumber)===-1 && this.state.usedNumbers.indexOf(clickedNumber)===-1){
			this.setState({
					selectedNumbers: this.state.selectedNumbers.concat(clickedNumber),
					correct:null
			});
			//console.log("Select",clickedNumber,this.state.selectedNumbers)
		}
		
	},
	unselectNumber: function(clickedNumber){
		var selectedNumbers = this.state.selectedNumbers;
		//console.log("unselect-1",clickedNumber,this.state.selectedNumbers, selectedNumbers)
		var index = selectedNumbers.indexOf(clickedNumber);
		selectedNumbers.splice(index,1)
		this.setState({
			selectedNumbers: selectedNumbers,
			correct: null
		});
		//console.log("unselect-2",clickedNumber,this.state.selectedNumbers, selectedNumbers)
	},
	sumOfSelectedNumbers: function(){
		return this.state.selectedNumbers.reduce(function(a,b){return a + b},0);
	},
	checkAnswer: function(){
		var correct = (this.state.numberOfStars === this.sumOfSelectedNumbers());
		this.setState({
			correct: correct
		});
	},
	acceptAnswer: function(){
		// usedNumbers
		var usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers);
		this.setState({
			selectedNumbers: [],
			correct: null,
			usedNumbers: usedNumbers,
			numberOfStars: this.randomNumber()
		}, function(){
			this.updateDoneStatus();
		});
	},
	redraw: function(){
		var redrawCount = this.state.redrawCount - 1;
		console.log(redrawCount)
		if(this.state.redrawCount > 0){
			this.setState({
				selectedNumbers: [],
				correct: null,
				numberOfStars: this.randomNumber(),
				redrawCount: this.state.redrawCount - 1
			}, function(){
				this.updateDoneStatus();
			});	
		}
			
	},
	randomNumber: function(){
		return Math.floor(Math.random()*9)+1;
	},
	updateDoneStatus: function(){
		console.log("updateDoneStatus",this.state.usedNumbers.length, this.state.redrawCount)
		if (this.state.usedNumbers.length === 9 ){
			this.setState({
				doneStatus: "Winner Winner! Chickin Dinner!!"
			});
			return
		} 
		if (this.state.redrawCount===0 && !this.possibleSolutions()) {
			this.setState({
				doneStatus: "Boo! Loser!!"
			});
		}
	},
	possibleSolutions: function(){
		console.log("possibleSolutions")
		var numberOfStars = this.state.numberOfStars,
			possibleNumbers = [],
			usedNumbers = this.state.usedNumbers;

		for (var i=1; i <=9; i++){
			if(usedNumbers.indexOf(i)<0){
				possibleNumbers.push(i);
			}
		}
		return possibleCombinationSum(possibleNumbers, numberOfStars);
	},
	resetGame: function(){
		this.replaceState(this.getInitialState());
	},
	render: function(){
		var selectedNumbers = this.state.selectedNumbers,
			numberOfStars = this.state.numberOfStars,
			correct = this.state.correct,
			usedNumbers = this.state.usedNumbers,
			redrawCount = this.state.redrawCount,
			doneStatus = this.state.doneStatus,
			bottomFrame;

		if (doneStatus){
			bottomFrame = <DoneFrame doneStatus={doneStatus} resetGame={this.resetGame}/>
		} else {
			bottomFrame = <NumbersFrame selectedNumbers={selectedNumbers} selectNumber={this.selectNumber} usedNumbers={usedNumbers}/>
		}
		return(
			<div id='game'>
				<h2>Play Nine9</h2>
				<hr/>
				<div className="clearfix">
					<StarsFrame numberOfStars={numberOfStars}/>
					<ButtonFrame selectedNumbers={selectedNumbers} correct = {correct} checkAnswer={this.checkAnswer} acceptAnswer={this.acceptAnswer} redraw={this.redraw} redrawCount={redrawCount}/>
					<AnswerFrame selectedNumbers={selectedNumbers} unselectNumber={this.unselectNumber}/>
				</div>
				{bottomFrame}
			</div>
		);
	}
});

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);