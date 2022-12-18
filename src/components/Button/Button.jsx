import PropTypes from 'prop-types';

import { ButtonWrapper, LoadMoreButton } from './Button.styled';

const Button = ({ clickHandler }) => {
  return (
    <ButtonWrapper>
      <LoadMoreButton type="button" onClick={clickHandler}>
        Load more
      </LoadMoreButton>
    </ButtonWrapper>
  );
};

Button.propTypes = {
  clickHandler: PropTypes.func.isRequired,
};

export default Button;
