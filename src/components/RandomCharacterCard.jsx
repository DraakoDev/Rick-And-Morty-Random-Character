import { useState, useEffect } from "react";

export const RandomCharacterCard = () => {
  const [character, setCharacter] = useState({});
  const [randomId, setRandomId] = useState(Math.floor(Math.random() * 826) + 1);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://rickandmortyapi.com/api/character/${randomId}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => setCharacter(data));

    return () => controller.abort();
  }, [randomId]);

  return (
    <>
      <main className="bg-blue-50 min-h-dvh">
        <section className="flex items-center flex-col">
          <h1 className="text-4xl font-bold p-4">
            Rick And Morty Random Character
          </h1>
          <div className="flex justify-center items-start flex-row w-2/5 bg-gray-600 mt-12 mb-8 shadow-2xl rounded-md p-4">
            <img
              src={character.image}
              alt={character.name}
              className="w-3/5 aspect-square rounded-md p-4"
            />
            <div className="w-2/5 flex flex-col justify-start items-start h-[100%]">
              <h2 className="text-3xl font-bold mt-4 mb-8">{character.name}</h2>
              <span>
                <span className="font-bold">Status:</span>{" "}
                {character.status === "Alive"
                  ? "✅"
                  : character.status === "unknown"
                  ? "❔"
                  : "☠"}
                ({character.status})
              </span>
              <span>
                <span className="font-bold">Gender:</span> {character.gender}
              </span>
              <span>
                <span className="font-bold">Specie:</span> {character.species}
              </span>
            </div>
          </div>

          <div>
            <button
              onClick={() => {
                const randomIdCharacter = Math.floor(Math.random() * 826) + 1;
                setRandomId(randomIdCharacter);
              }}
              className="bg-blue-700 p-4 rounded-lg hover:bg-blue-900 transition text-white font-bold"
            >
              Bring another character
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default RandomCharacterCard;
