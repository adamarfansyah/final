import { FormattedMessage } from 'react-intl';

import badminton from '@static/images/badminton.svg';
import miniSoccer from '@static/images/mini-soccer.svg';
import football from '@static/images/football.svg';
import classes from './style.module.scss';
import Card from './Components/Card';

const SPORTS = [
  {
    id: 1,
    name: 'Badminton',
    icon: badminton,
  },
  {
    id: 2,
    name: 'Mini Soccer',
    icon: miniSoccer,
  },
  {
    id: 3,
    name: 'Football',
    icon: football,
  },
];

const Home = () => (
  <div>
    <div className={classes.bgWrapper}>
      <div className={classes.title}>
        <FormattedMessage id="welcome_greeting" />
      </div>
      <div className={classes.desc}>
        <FormattedMessage id="desc_greeting" />
      </div>
    </div>
    <div className={classes.content}>
      <div className={classes.title}>
        <FormattedMessage id="content_title_greeting" />
      </div>
      <div className={classes.titleContent}>
        <FormattedMessage id="slogan_content" />
      </div>
      <div className={classes.cardSports}>
        {SPORTS.map((sport) => (
          <Card key={sport.id} sport={sport} />
        ))}
      </div>
    </div>
  </div>
);

export default Home;
