/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-props-no-spreading */
import { useNavigate } from 'react-router-dom';

const withRouter = Component => {
  function Wrapper(props) {
    const navigate = useNavigate();

    return <Component navigate={navigate} {...props} />;
  }

  return Wrapper;
};

export default withRouter;
