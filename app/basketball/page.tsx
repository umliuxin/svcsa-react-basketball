import { asyncFetch } from "../utils/fetch";

export default async function Page() {
  const seasons = await asyncFetch("/basketball/season");

  return (
    <section>
      <h1>Hello, basketball league page!</h1>
      <section>Current Season: {seasons.data[4].name}</section>
    </section>
  );
}
