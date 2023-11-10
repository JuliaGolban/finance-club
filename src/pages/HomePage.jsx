import About from 'components/About/About';
import { SEO } from 'utils/SEO';

const HomePage = () => {
  return (
    <>
      <SEO
        title="Home"
        description="for a communication platform of a fundamentally new format between the financial and banking community, the expert environment, regulators and society"
      />
      <About/>
    </>
  );
};

export default HomePage;
