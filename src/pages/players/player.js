import { useParams } from 'react-router-dom';

export default function PlayerPage() {
  let params = useParams();
  return (
    <main style={{ padding: '1rem' }}>
      <h2>Player ID: {params.playerId}</h2>
    </main>
  );
}
