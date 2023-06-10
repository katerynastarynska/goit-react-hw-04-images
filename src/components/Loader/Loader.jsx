import { Audio } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loader}>
      <Audio height={250} width={100} color="#3f51b5" ariaLabel="Loading" />
    </div>
  );
};

export default Loader;
