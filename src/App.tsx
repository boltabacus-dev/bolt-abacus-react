import './App.css';

import axios from 'axios';
import reactLogo from './assets/react.svg';
import { useState } from 'react';
import viteLogo from '/vite.svg';

function App() {
	const [count, setCount] = useState(0);

	const fetchData = async () => {
		try {
			const response = await axios({
				method: 'get',
				headers: {
					'Content-Type': 'application/json',
					'AUTH-TOKEN':
						'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjEsImV4cGlyeVRpbWUiOiIyMDIzLTEwLTAzIDIwOjA5OjA5LjExMjkxMyIsImNyZWF0aW9uVGltZSI6IjIwMjMtMTAtMDMgMTk6MDk6MDkuMTEyOTEzIn0.gJhTMX2JikpvFayTE-1QctzC5lm1JyybadetFkQ39OM',
				},
				url: '/api/levels/',
			});

			console.log('data: ', response.data);
		} catch (error) {
			console.log('error', error);
		}
	};

	return (
		<>
			<div>
				<a href='https://vitejs.dev' target='_blank'>
					<img src={viteLogo} className='logo' alt='Vite logo' />
				</a>
				<a href='https://react.dev' target='_blank'>
					<img src={reactLogo} className='logo react' alt='React logo' />
				</a>
			</div>
			<h1>Vite + React + Typescript</h1>
			<div className='card'>
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<br />
				<br />
				<button onClick={() => fetchData()}>API Call</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className='read-the-docs'>
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default App;
