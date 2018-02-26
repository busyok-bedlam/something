import passport      from 'koa-passport';
import localStrategy from './localStrategy';
import './serialize';

passport.use(localStrategy);

export default passport;
