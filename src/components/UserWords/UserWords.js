import React, { PropTypes, PureComponent } from 'react';
import TextField from 'material-ui/TextField';

export default class UserWords extends PureComponent {
	static propTypes = {
		onChange:PropTypes.func.isRequired,
		value: PropTypes.string
	}

	render() {
		const {
			onChange,
			value
		} = this.props;

		return (
			<TextField
				hintText={<span>example<br/>bear<br/>fire alarm</span>}
				floatingLabelText="Type some words, you want to learn"
				floatingLabelFixed={true}
				value={value}
				onChange={onChange}
				fullWidth
				multiLine
				rows={3}
				rowsMax={20}
			/>
		);
	}
}
