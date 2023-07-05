import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PizzaItem, SearchPizzaParams } from './types';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
	'pizza/fetchPizzasStatus',
	async (params) => {
		const { sortBy, order, category, search, currentPage } = params;
		const { data } = await axios.get<PizzaItem[]>(
			`https://647b1d20d2e5b6101db0e0bc.mockapi.io/items`,
			{
				params: pickBy(
					{
						page: currentPage,
						limit: 4,
						category,
						sortBy,
						order,
						search,
					},
					identity
				),
			}
		);

		return data;
	}
);
