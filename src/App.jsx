import { useState, useEffect } from 'react';
import Header from './components/Header';
import SideBar from './components/SideBar';
import MainContent from './components/MainContent';

function App() {

  const [animeList, SetAnimeList] = useState([]);
	const [topAnime, SetTopAnime] = useState([]);
	const [search, SetSearch] = useState("");

	const GetTopAnime = async () => {
		const temp = await fetch(`https://api.jikan.moe/v3/top/anime/1/bypopularity`)
			.then(res => res.json());
      console.log(temp)

		SetTopAnime(temp.top.slice(0, 10));
	}

	const GetAllAnime = async () => {
		const temp = await fetch(`https://api.jikan.moe/v3/top/anime/1/bypopularity`)
			.then(res => res.json());
      console.log(temp)

		SetAnimeList(temp.top);
	}



	const HandleSearch = e => {
		e.preventDefault();

		FetchAnime(search);
	}

	const FetchAnime = async (query) => {
		const temp = await fetch(`https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc&limit=10`)
			.then(res => res.json());

		SetAnimeList(temp.results);
	}

	useEffect(() => {
		GetTopAnime();
    GetAllAnime();
	}, []);


  return (
    <div className="App">
      <Header />
			<div className="content-wrap">
				<SideBar 
					topAnime={topAnime} />
				<MainContent
					HandleSearch={HandleSearch}
					search={search}
					SetSearch={SetSearch}
					animeList={animeList} />
			</div>
    </div>
  );
}

export default App;
