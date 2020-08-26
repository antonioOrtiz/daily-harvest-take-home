import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'

import IngredientInput from '../components/IngredientInput.js'
import Products from '../components/Products.js'

async function fetchData() {
	var [products, indgredients] = await Promise.all([
		fetch(
			`https://raw.githubusercontent.com/daily-harvest/opportunities/master/web-1/data/products.json`
		).then((r) => r.json()),
		fetch(
			`https://raw.githubusercontent.com/daily-harvest/opportunities/master/web-1/data/ingredients.json`
		).then((r) => r.json()),
	])
	return { products, indgredients }
}

var Index = ({ indgredients, products }) => {
	var [text, setText] = useState('Daily Harvest Sample App')

	return (
		<React.Fragment>
			<TextField
				inputProps={{ min: 0, style: { textAlign: 'center' } }}
				fullWidth
				value={text}
				margin="normal"
			/>
			<IngredientInput indgredients={indgredients} products={products} />
			<Products products={products} />
		</React.Fragment>
	)
}

export var getStaticProps = async () => {
	var data = await fetchData()

	return { props: data }
}

export default Index
