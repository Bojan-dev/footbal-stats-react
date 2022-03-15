import Card from '../components/UI/Card';
import StatsCard from '../components/homebody/StatsCard';

const HomeBody = () => {
  return (
    <>
      <main>
        <h1>
          A LARGE BASE OF FOOTBALL STATS AND DATA AT FIRST HAND <br />
          <span>ENJOY!</span>
        </h1>
      </main>
      <section className="container">
        <Card>
          <StatsCard />
        </Card>
      </section>
    </>
  );
};

export default HomeBody;
