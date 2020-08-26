import React, { useState, useEffect } from 'react'
import Alert from '@material-ui/lab/Alert'

import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'

var useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
		submit: {
			color: 'red',
		},
	},
}))

var IngredientInput = ({ indgredients }) => {
	var [indgredients, setIngredients] = useState(indgredients)
	var [text, setText] = useState('')
	var [isInAPI, setIsInAPI] = useState(false)
	var [wasAPICallMade, setWastAPICallMade] = useState(false)

	var dispatch = useDispatch()

	useEffect(() => {
		return () => setIsInAPI(false)
	}, []) // This is be executed when "isinApi" or "wasAPICallMade" state changes

	function CheckIngredients(input) {
		setWastAPICallMade(true)

		console.log('indgredients ', indgredients)
		var foo = indgredients.filter((e) => e.name === input)

		if (indgredients.filter((e) => e.name === input).length > 0) {
			var [{ id, name }] = indgredients.filter((e) => e.name === input)
			setIsInAPI(true)

			dispatch({
				type: 'PRODUCT_EXISTS_IN_STORE',
				productContainsIngredientFromSearch: true,
				searchTerm: text,
				id,
			})

			console.log('isInAPI ', isInAPI)
		} else {
			setIsInAPI(false)
		}
	}

	function handleTextChange(e) {
		console.log('e', e.target.value)
		setWastAPICallMade(false)
		setText(e.target.value)
	}

	function handleSubmit(e) {
		e.preventDefault()
		CheckIngredients(text)
	}

	var classes = useStyles()

	return (
		<>
			<Grid container justify="center">
				<form onSubmit={handleSubmit} className={classes.root}>
					<TextField
						value={text}
						onChange={handleTextChange}
						id="outlined-basic"
						label="Outlined"
						variant="outlined"
					/>
					<button type="submit" className={classes.submit}>
						{' '}
						Check Ingredient{' '}
					</button>
				</form>
				{wasAPICallMade ? (
					isInAPI ? (
						<Alert severity="success">
							{`We have found ${text}('s) in your search, below we'll load the products which contain them!`}
						</Alert>
					) : (
						<Alert severity="error">
							{`We couldn't find that item in your search.`}
						</Alert>
					)
				) : null}
			</Grid>
		</>
	)
}
export default IngredientInput
