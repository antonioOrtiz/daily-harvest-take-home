import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { CircularProgress } from '@material-ui/core'

import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'

var Products = ({ products }) => {
	var [products, setProducts] = useState(products)

	var [loader, setLoader] = useState(null)
	var { productContainsIngredientFromSearch, searchTerm } = queryData()

	console.log('products ', products)

	function queryData() {
		return useSelector((state) => ({
			productContainsIngredientFromSearch:
				state.productContainsIngredientFromSearch,
			searchTerm: state.searchTerm,
			id: state.id,
		}))
	}

	function displayProductsfromQuery() {
		// if (productContainsIngredientFromSearch) {
		// 	products.filter()
		// }
	}

	displayProductsfromQuery()

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
	var classes = useStyles()

	return (
		<>
			<Grid container justify="center">
				<h1>Products</h1>
				{loader}
			</Grid>
		</>
	)
}
export default Products
