//code Description: This component is responsible for fetching and displaying a list of characters from the Rick and Morty API.
// It includes features such as pagination, name search, and status filtering. 
// The component uses the Character component to render individual character cards.
//Authors: Sridharshini
//Date: 05/05/2026
//File: CharacterList.jsx

import React, { useEffect, useState } from "react";
import Character from "./Character";
import { fetchCharacters } from "../services/api";
import "./CharacterList.scss";

const CharacterList = () => {
  //Stores the entire results of the API call
  const [list, setList] = useState([]);
  //Stores the current page number
  const [page, setPage] = useState(1);
  //Stores the total number of pages
  const [totalPages, setTotalPages] = useState(0);
  //Stores the search name
  const [name, setName] = useState("");
  //Stores the selected status
  const [status, setStatus] = useState("");

  useEffect(() => {
    const loadData = async () => {
      // Format the name by trimming and replacing multiple spaces with a single space
      const formattedName = name.trim().replace(/\s+/g, " ");
      const data = await fetchCharacters(page, formattedName, status);
      setList(data.results || []);
      setTotalPages(data.info?.pages || 0);
    };

    loadData();
  }, [page, name, status]);

  return (
    <div className="container">
      {/* Filters */}
      <div className="filters">
        <input
          placeholder="Search name"
          value={name}
          onChange={(e) => {
            setPage(1);
            setName(e.target.value);
          }}
        />

        <select
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
        >
          <option value="">All</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      {/* No Results */}
      {list.length === 0 && name && (
        <p className="no-data">No characters found</p>
      )}

      {/* List */}
      <div className="list">
        {list.map((c) => (
          <Character key={c.id} character={c} />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span>
          Page {page} / {totalPages}
        </span>

        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CharacterList;