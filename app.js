const scaleNames = {
	c: 'Celsius',
	f: 'Fahrenheit'
};

function toCelsius (fahrenheit)
{
	return (fahrenheit -32) * 5 / 9;
}

function toFahrenheit (celsius)
{
	return (celsius * 9 / 5) + 32;
}

function BoilingVerdict ({celsius})
{
	if (celsius >= 100)
	{
		return <div className="alert alert-danger">L'eau bout</div>;
	}
	return <div className="alert alert-primary">L'eau ne bout pas</div>;
}

class TemperatureInput extends React.Component {

	constructor (props)
	{
		super(props);
		/* this.state = {
			temperature: ''
		}; */
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange (e)
	{
		// this.setState({
		// 	temperature: e.target.value
		// })
		this.props.onChangeTemperatureChange(e.target.value);
	}

	render ()
	{
		const {temperature} = this.props;
		const name = 'scale' + this.props.scale;
		const scaleName = scaleNames[this.props.scale];
		return <div className="form-group">
				<label htmlFor={name}>Température (en {scaleName})</label>
				<input type="number" id={name} value={temperature} className="form-control" onChange={this.handleChange}/>
		</div>
	}

}

class Calculator extends React.Component
{

	constructor (props)
	{
		super(props);
		this.state = {
			temperature: ''
		};
		this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
		this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
	}

	/* handleChange (e)
	{
		this.setState({
			temperature: e.target.value
		})
	} */

	handleCelsiusChange (temperature)
	{
		this.setState({
			scale: 'c',
			temperature
		});
	}

	handleFahrenheitChange (temperature)
	{
		this.setState({
			scale: 'f',
			temperature
		});
	}

	render ()
	{
		const {temperature, scale} = this.state;
		const celsius = scale === 'c' ? temperature : toCelsius(temperature);
		const fahrenheit = scale === 'f' ? temperature : toFahrenheit(celsius);

		return <div>
			<TemperatureInput scale="c" temperature={celsius} onChangeTemperatureChange={this.handleCelsiusChange} />
			<TemperatureInput scale="f" temperature={fahrenheit} onChangeTemperatureChange={this.handleFahrenheitChange} />
			<BoilingVerdict celsius={celsius} />
		</div>
	}

}

ReactDOM.render(<Calculator />, document.getElementById('app'));