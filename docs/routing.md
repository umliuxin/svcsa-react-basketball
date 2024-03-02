# Application Routing Principle


## How the URL is constructed

```
{ROOT_URL}/{SPORT}/{COMPETITION}/{SECTION}
```

- `ROOT_URL`: the root url of the application, like `svcsa.org`
- `SPORT`: Top level sport category. Basketball or trackfield
- `COMPETITION`: Check `How to represent competition in URL` below
- `SECTION`: details of the competition, like `teams`, `players`, `players/:palyerid`

## What Routes need Season

The application should by default take current season or recent season as default season. The current season should be a shared state across application, no need to explicitly exist in the urls.

For the following routes, we take `season` in query params to represent the `seasonId` to use in the data fetching

- /standing
- /teams
- /players
- /matches

For the following routes, no `season` info needed, as it is `id` driven

- Player page
- Match page
- Team page

## How to represent competition in URL

### Basketball

男篮公开组：/competition/men-open
女篮公开组：/competition/women-open
男篮壮年组：/competition/men-senior
