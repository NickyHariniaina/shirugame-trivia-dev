import { Button } from "../button"

export const GameList = () => {

  // Mock.
  const games = [
    {
      name: "Chess",
      host: "Nicky",
    },
    {
      name: "Chess",
      host: "Nicky",
    },
    {
      name: "Checkers",
      host: "John",
    },
    {
      name: "Go",
      host: "Jane",
    },
    {
      name: "Dots and Boxes",
      host: "John",
    },
    {
      name: "Tic Tac Toe",
      host: "Jane",
    }
  ]
  return <div className="flex flex-col gap-2">
    <h3>List of avalaible game:</h3>
    <ul>
      {
        games.map((game, index) => {
          return <li key={index}>
            <p>{game.name}</p>
            <p>{game.host}</p>
            <Button>Join</Button>
          </li>
        })
      }
    </ul>
  </div>
}

