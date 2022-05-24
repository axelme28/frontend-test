import React from "react";

export const CardSearch = (index = "", character = "") => {
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
};
