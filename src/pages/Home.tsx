import qs from 'qs';
import { useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';

import Categories from '../components/ContentTop/Categories';
import Sort, { sortList } from '../components/ContentTop/Sort';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import {
	setCategoryId,
	setCurrentPage
} from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';

import { RootState } from '../redux/store';
//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------
const Home: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isMounted = useRef(false);

	const { items, status } = useSelector((state: RootState) => state.pizzas);
	const { categoryId, sort, currentPage, searchValue } = useSelector(
		(state: RootState) => state.filter
	);

	//----------------------------------------------------------------
	const onChangeCategory = useCallback((id: number) => {
		dispatch(setCategoryId(id));
	}, []);

	const onChangePage = (page: number) => {
		dispatch(setCurrentPage(page));
	};
	//----------------------------------------------------------------
	const sortType = sort.sortProperty;
	const getPizzas = async () => {
		const sortBy = sortType.replace('-', '');
		const order = sortType.includes('-') ? 'asc' : 'desc';
		const category = categoryId > 0 ? String(categoryId) : '';
		const search = searchValue;

		dispatch(
			fetchPizzas({
				sortBy,
				order,
				category,
				search,
				currentPage: String(currentPage),
			})
		);
		window.scrollTo(0, 0);
	};

	// Если изменили параметры и был первый рендер
	useEffect(() => {
		getPizzas();
	}, [categoryId, sortType, currentPage, searchValue]);

	//----------------------------------------------------------------
	const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
	const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
	//----------------------------------------------------------------
	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<Sort value={sort} />
			</div>
			<h2 className='content__title'>Все пиццы</h2>

			{status === 'error' ? (
				<div>
					<h2>Неудалось получичить данные</h2>
				</div>
			) : (
				<div className='content__items'>
					{status === 'loading' ? skeletons : pizzas}
				</div>
			)}
			<Pagination onChangePage={onChangePage} currentPage={currentPage} />
		</div>
	);
};

export default Home;
