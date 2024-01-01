import styles from './PokemonInfo.module.css'

export const PokemonInfo = ({ pokemon, contentVisible, setContentVisible }) => {
    
    const handleContentToggle = () => {
        setContentVisible( false );
    };

    return (
        <>
            <h1 className={ styles.texto }>Dar click para ver detalle: </h1>
            <div className={ styles['anim-border'] }
                onClick={handleContentToggle} 
            >
                <img className={ styles.coverImage } 
                    style={{ visibility: contentVisible ? 'visible' : 'hidden', position: 'absolute' }}
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Pokemon_Trading_Card_Game_cardback.jpg/220px-Pokemon_Trading_Card_Game_cardback.jpg" 
                    alt="pokemon cover card" 
                />
                <h2>{ name }</h2>
                <img src={ pokemon?.url } alt={ name } />
                <p>Altura: { pokemon?.height }</p>
                <p>Peso: { pokemon?.weight }</p>
                <h3 className={ styles.habilidades }>Habilidades</h3>
                <ul>
                    { pokemon?.obj_abilities &&
                        Object.keys( pokemon?.obj_abilities ).map( ability => (
                            pokemon?.obj_abilities[ ability ]?.is_hidden 
                                ? 
                                <li className={ styles.habilidadOculta } 
                                    key={ pokemon?.obj_abilities[ ability ]?.name }
                                >
                                    { pokemon?.obj_abilities[ ability ]?.name }
                                </li>
                                : 
                                <li key={ pokemon?.obj_abilities[ ability ]?.name }>
                                    { pokemon?.obj_abilities[ ability ]?.name }
                                </li>
                        ))
                    }
                </ul>
            </div>
        </>
    );
}