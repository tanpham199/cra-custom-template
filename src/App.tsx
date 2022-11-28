import styles from './App.module.scss';

const App = () => <div className={styles.app}>{process.env.REACT_APP_ENV}</div>;

export default App;
