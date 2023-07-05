import { useCallback, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import debounce from 'lodash.debounce'

import { setSearchValue } from '../../redux/filter/slice'
import styles from './search.module.scss'

const Search = () => {

	const dispatch = useDispatch();
	const [value, setValue] = useState<string>('');
	const inputRef = useRef<HTMLInputElement>(null);


	const onClickClearSearch = () => {
		setValue('');
		dispatch(setSearchValue(''));
		inputRef.current?.focus();
	};

	const updateInput = useCallback(
		debounce((str: string) => {
			dispatch(setSearchValue(str));
		}, 200),
		[],
	);

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		updateInput(e.target.value);
	};

	return (
		<div className={styles.root}>
			<input
				ref={inputRef}
				value={value}
				onChange={onChangeInput}
				className={styles.input}
				placeholder='Поиск пиццы...'
			/>
			{value && (
				<img
					onClick={onClickClearSearch}
					className={styles.clearIcon}
					src='img/close.svg'
					alt='clear'
				/>
			)}
		</div>
	);
};

export default Search;
