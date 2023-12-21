import styles from './Loader.module.css'; // Asegúrate de tener estilos CSS modulares

const Loader = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.spinner}></div>
        </div>
    );
};

export default Loader;
