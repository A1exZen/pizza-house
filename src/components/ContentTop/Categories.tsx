import React from 'react';

import './_categories.scss';
type CategoriesProps = {
	value: number;
	onChangeCategory: (id: number) => void;
};

const categories = [
	'Все',
	'Мясные',
	'Вегетарианская',
	'Гриль',
	'Острые',
	'Закрытые',
];

const Categories: React.FC<CategoriesProps> = React.memo(
	({ value, onChangeCategory }) => {
		return (
			<div className='categories'>
				<ul>
					{categories.map((name, i) => (
						<li
							key={i}
							onClick={() => onChangeCategory(i)}
							className={value === i ? 'active' : ''}
						>
							{name}
						</li>
					))}
				</ul>
			</div>
		);
	}
);

export default Categories;
