import React, { useState } from "react";
import { Header } from "../ui/Header";
import searchIcon from "../../assets/search.png";
import { useForm } from "../../hooks/useForm";

export const MainView = () => {
    const [view, setView] = useState(false);
    const [error, setError] = useState(false);
    const [allCharacters, setAllCharacters] = useState([]);
    const [searchCharacters, setSearchCharacter] = useState([]);
    const { values, handleInputChange, reset } = useForm({
        search: "",
    });

    const handleSearch = async (e) => {
        e.preventDefault();
        setError(false);
        setSearchCharacter([]);
        const { search } = values;
        console.log(search);
        if (search.trim() === "") {
            setError(true);
            return;
        }
        if (search.length > 0) {
            const url = `https://rickandmortyapi.com/api/character/?name=${search}&status=alive`;
            const response = await fetch(url);
            const data = await response.json();
            if (data.results) {
                setSearchCharacter(data.results);
            } else {
                setError(true);
            }
        }
    };

    const handleViewAllCharacters = async (e) => {
        e.preventDefault();
        console.log("view all characters");

        const url = `https://rickandmortyapi.com/api/character`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            setAllCharacters(data.results);
            if (data.results) {
                setView(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Header />

            <h2 className='text-center mt-5 mx-3'>Search for your favorite characters</h2>
            <div className='d-flex justify-content-center mt-5'>
                <form onSubmit={handleSearch} className='w-50'>
                    <div className='p-1 bg-light rounded rounded-pill shadow mb-4'>
                        <div className='input-group'>
                            <input
                                type='search'
                                placeholder='Search your favorite characters'
                                aria-describedby='button-addon1'
                                className='form-control border-0 bg-light'
                                name='search'
                                onChange={handleInputChange}
                            />
                            <div className='input-group-append'>
                                <button
                                    id='button-addon1'
                                    type='submit'
                                    className='btn btn-link text-primary'
                                >
                                    <img src={searchIcon} alt='search' />
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {searchCharacters.length > 0 && (
                <div className='grid-responsive'>
                    {searchCharacters.map((character, index) => {
                        return (
                            <div className='d-flex justify-content-center mt-5' key={index}>
                                <div className='card mb-4 shadow' style={{ width: "18rem" }}>
                                    <img src={character.image} className='card-img-top' alt='...' />
                                    <div className='card-body'>
                                        <h5 className='card-title'>
                                            Name:
                                            {character.name}
                                        </h5>
                                        <p className='card-text'>
                                            Status:
                                            {character.status}
                                        </p>
                                        <p className='card-text'>
                                            Specie:
                                            {character.species}
                                        </p>
                                        <p className='card-text'>{character.type}</p>
                                        <p className='card-text'>
                                            Origin:
                                            {character.origin.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {error ? (
                <div className='alert alert-danger m-2' role='alert'>
                    <h4 className='alert-heading'>Oh snap! You got an error!</h4>
                    <p>
                        <strong>Sorry, we couldn't find your character.</strong>
                    </p>
                    <hr />
                    <p className='mb-0'>
                        <strong>Please try with another name.</strong>
                    </p>
                </div>
            ) : null}
            <div className='d-flex justify-content-cen align-items-end mt-5'>
                <button
                    className='btn btn-primary mt-5 btn-lg w-100'
                    onClick={handleViewAllCharacters}
                >
                    <a href='/characters' className='text-light'>
                        View all characters click here
                    </a>
                </button>
            </div>

            {view && (
                <div className='grid-responsive'>
                    {allCharacters.map((character, index) => {
                        return (
                            <div className='d-flex justify-content-center mt-5' key={index}>
                                <div className='card mb-4 shadow' style={{ width: "18rem" }}>
                                    <img src={character.image} className='card-img-top' alt='...' />
                                    <div className='card-body'>
                                        <h5 className='card-title'>
                                            Name:
                                            {character.name}
                                        </h5>
                                        <p className='card-text'>
                                            Status:
                                            {character.status}
                                        </p>
                                        <p className='card-text'>
                                            Specie:
                                            {character.species}
                                        </p>
                                        <p className='card-text'>{character.type}</p>
                                        <p className='card-text'>
                                            Origin:
                                            {character.origin.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
};
