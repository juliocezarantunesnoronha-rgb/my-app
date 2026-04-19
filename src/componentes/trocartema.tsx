import React, { useState, useEffect, use } from 'react';

 const TrocadorTema = () => {
    const [tema, mudarTema] = useState('light');

    useEffect(() => {
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }, [tema]);

    const alternarTema = () => {
        mudarTema((novoTema => novoTema === 'light' ? 'dark' : 'light'));
    };
    return(
        <button onClick={alternarTema}/>
    )
};
export default TrocadorTema;
