import BasicLayout from "../layouts/BasicLayout";
import ListGames from "../components/ListGames";
import { Loader } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { getLastGameApi } from "../api/games";
import { size } from "lodash";

export default function Home() {
  const [games, setGames] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getLastGameApi(50);
      if (size(response) > 0) setGames(response);
      else setGames([]);
    })();
  }, []);

  return (
    <BasicLayout className="home">
      {!games && <Loader active>Cargando juegos...</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3>No hay juegos</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games} />}
    </BasicLayout>
  );
}
