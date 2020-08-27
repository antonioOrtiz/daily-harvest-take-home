import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'

import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'

var Products = ({ products }) => {
	var [products, setProducts] = useState(products)

	var [loader, setLoader] = useState(null)
	var [productsFromSearch, setProductsFromSearch] = useState([])
	var { productContainsIngredientFromSearch, searchTerm, id } = queryData()

	function queryData() {
		return useSelector((state) => ({
			productContainsIngredientFromSearch:
				state.productContainsIngredientFromSearch,
			searchTerm: state.searchTerm,
			id: state.id,
		}))
	}

	function displayProductsfromQuery() {
		console.log(
			'productContainsIngredientFromSearch ',
			productContainsIngredientFromSearch
		)
		if (productContainsIngredientFromSearch) {
			products.filter((obj) => {
				obj.ingredientIds.filter((item) => {
					if (item === id) {
						setProductsFromSearch((productsFromSearch) => [
							...productsFromSearch,
							obj,
						])
					}
				})
			})
		} else {
			console.log('not found')
		}
	}

	useEffect(() => {
		displayProductsfromQuery()
	}, [productContainsIngredientFromSearch]) // This is be executed when "isinApi" or "wasAPICallMade" state changes

	var useStyles = makeStyles((theme) => ({
		root: {
			margin: theme.spacing(1),
			maxWidth: 345,
		},
		submit: {
			color: 'red',
		},
		media: {
			height: 0,

			paddingTop: '56.25%', // 16:9
		},
	}))
	var classes = useStyles()
	console.log(`productsFromSearch in useEffect `, productsFromSearch)

	return (
		<>
			<Grid container justify="center">
				{productContainsIngredientFromSearch &&
					productsFromSearch.map((product) => {
						console.log('product.image.url ', product.image.url)
						return (
							<Card className={classes.root}>
								<CardHeader title={product.name} />
								<CardMedia
									className={classes.media}
									image={product.image.url}
								/>
							</Card>
						)
					})}
			</Grid>
		</>
	)
}
export default Products
