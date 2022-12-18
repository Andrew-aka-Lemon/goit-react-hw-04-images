import { Dna } from 'react-loader-spinner';

import { DnaWrapper } from './Loader.styled';

const Loader = () => {
  return (
    <DnaWrapper>
      <Dna
        visible={true}
        height="180"
        width="180"
        ariaLabel="dna-loading"
        wrapperClass="dna-wrapper"
      />
    </DnaWrapper>
  );
};

export default Loader;
